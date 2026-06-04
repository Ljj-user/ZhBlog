import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

const role = process.env.AGENT_ROLE || "generalist"
const goal = process.env.AGENT_GOAL || "Repository automation run"
const profile = process.env.AGENT_PROFILE || "maintenance"
const agentCommand = process.env.AGENT_COMMAND || ""
const dryRun = process.env.AGENT_DRY_RUN === "true"
const workspace = process.cwd()
const artifactsDir = join(workspace, ".artifacts", "agents")
const promptsDir = join(workspace, ".github", "agents")
const promptFile = join(promptsDir, `${role}.md`)
const outputFile = join(artifactsDir, `${role}.json`)
const shell = process.platform === "win32" ? "cmd" : "bash"
const shellArgs = (command) =>
  process.platform === "win32" ? ["/c", command] : ["-lc", command]

const defaultCommandsByRole = {
  planner: ["npm run lint", "npm run build"],
  nextjs: ["npm run lint", "npm run build"],
  content: ["npm run lint"],
  obsidian: ["npm run sync:obsidian"],
  refactor: ["npm run lint", "npm run build"],
  deps: ["npm ci", "npm run lint"],
  qa: ["npm run lint", "npm run build"],
}

async function maybeReadPrompt() {
  try {
    return await readFile(promptFile, "utf8")
  } catch {
    return ""
  }
}

async function gatherRepoSnapshot() {
  const entries = await readdir(workspace, { withFileTypes: true })
  return entries
    .filter((entry) => !entry.name.startsWith(".git"))
    .slice(0, 20)
    .map((entry) => ({
      name: entry.name,
      kind: entry.isDirectory() ? "directory" : "file",
    }))
}

async function runShellCommand(command) {
  try {
    const { stdout, stderr } = await execFileAsync(shell, shellArgs(command), {
      cwd: workspace,
      env: {
        ...process.env,
      },
      maxBuffer: 1024 * 1024 * 8,
    })

    return {
      command,
      ok: true,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    }
  } catch (error) {
    return {
      command,
      ok: false,
      stdout: error.stdout?.trim?.() || "",
      stderr: error.stderr?.trim?.() || error.message,
    }
  }
}

async function runBaselineChecks() {
  const commands = defaultCommandsByRole[role] || ["npm run lint"]
  const results = []

  for (const command of commands) {
    results.push(await runShellCommand(command))
  }

  return results
}

function buildFallbackFindings(baselineChecks) {
  const failedChecks = baselineChecks.filter((item) => !item.ok)

  if (failedChecks.length === 0) {
    return [
      `${role} baseline finished cleanly.`,
      "No external agent command was executed; this report can still be used as the handoff input for a later autonomous step.",
    ]
  }

  return failedChecks.map(
    (item) => `${item.command} failed. Review stderr before allowing this agent to modify the branch.`,
  )
}

async function runExternalAgent(prompt) {
  if (!agentCommand || dryRun) {
    return {
      executed: false,
      exitCode: 0,
      stdout: "",
      stderr: dryRun
        ? "External agent command skipped because dry_run=true."
        : "No MULTI_AGENT_COMMAND repository variable configured.",
    }
  }

  const serializedPrompt = JSON.stringify(prompt)
  const { stdout, stderr } = await execFileAsync(shell, shellArgs(agentCommand), {
    cwd: workspace,
    env: {
      ...process.env,
      AGENT_PROMPT: serializedPrompt,
      AGENT_ROLE: role,
      AGENT_GOAL: goal,
      AGENT_PROFILE: profile,
      AGENT_OUTPUT_FILE: outputFile,
    },
    maxBuffer: 1024 * 1024 * 8,
  })

  return {
    executed: true,
    exitCode: 0,
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  }
}

async function main() {
  await mkdir(artifactsDir, { recursive: true })

  const [prompt, repoSnapshot, baselineChecks] = await Promise.all([
    maybeReadPrompt(),
    gatherRepoSnapshot(),
    runBaselineChecks(),
  ])

  let agentExecution
  try {
    agentExecution = await runExternalAgent(prompt)
  } catch (error) {
    agentExecution = {
      executed: true,
      exitCode: 1,
      stdout: error.stdout?.trim?.() || "",
      stderr: error.stderr?.trim?.() || error.message,
    }
  }

  const report = {
    role,
    goal,
    profile,
    generatedAt: new Date().toISOString(),
    prompt,
    repoSnapshot,
    baselineChecks,
    externalAgent: agentExecution,
    findings: buildFallbackFindings(baselineChecks),
    nextActions: [
      "Review this role report alongside the consolidated summary artifact.",
      "Promote the role-specific command from dry-run to write mode after the baseline is stable.",
      "Wire branch creation or PR opening only after the command is producing deterministic output.",
    ],
  }

  await writeFile(outputFile, `${JSON.stringify(report, null, 2)}\n`, "utf8")
  console.log(`Agent report written to ${outputFile}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
