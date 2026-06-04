import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const downloadedDir = join(process.cwd(), ".artifacts", "downloaded")
const summaryDir = join(process.cwd(), ".artifacts", "summary")
const goal = process.env.AGENT_GOAL || "Repository automation run"
const profile = process.env.AGENT_PROFILE || "maintenance"

function toBulletList(items) {
  if (!items.length) {
    return "- None"
  }

  return items.map((item) => `- ${item}`).join("\n")
}

async function loadReports() {
  const files = await readdir(downloadedDir)
  const reports = []

  for (const file of files.filter((name) => name.endsWith(".json"))) {
    const raw = await readFile(join(downloadedDir, file), "utf8")
    reports.push(JSON.parse(raw))
  }

  return reports.sort((left, right) => left.role.localeCompare(right.role))
}

async function main() {
  await mkdir(summaryDir, { recursive: true })

  const reports = await loadReports()
  const failingChecks = reports.flatMap((report) =>
    report.baselineChecks
      .filter((check) => !check.ok)
      .map((check) => `${report.role}: ${check.command}`),
  )

  const readyRoles = reports
    .filter((report) => report.baselineChecks.every((check) => check.ok))
    .map((report) => report.role)

  const markdown = `# Multi-Agent Summary

- Goal: ${goal}
- Profile: ${profile}
- Reports collected: ${reports.length}

## Ready Roles
${toBulletList(readyRoles)}

## Failing Checks
${toBulletList(failingChecks)}

## Role Findings
${reports
  .map(
    (report) => `### ${report.role}
${toBulletList(report.findings || [])}
`,
  )
  .join("\n")}
`

  const machineSummary = {
    goal,
    profile,
    reportsCollected: reports.length,
    readyRoles,
    failingChecks,
    reports,
  }

  await writeFile(join(summaryDir, "summary.md"), markdown, "utf8")
  await writeFile(join(summaryDir, "summary.json"), `${JSON.stringify(machineSummary, null, 2)}\n`, "utf8")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
