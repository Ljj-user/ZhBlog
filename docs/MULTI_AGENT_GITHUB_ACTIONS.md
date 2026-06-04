# GitHub Actions 多 Agent 协作说明

这个仓库新增了一条可手动触发、也可定时触发的工作流：

- 文件：`.github/workflows/multi-agent-orchestrator.yml`
- 目标：把一次开发任务拆成多个角色并行执行，再汇总为一个统一结论
- 默认角色：
  - `blog-feature`: `planner` / `nextjs` / `content` / `qa`
  - `content-refresh`: `planner` / `content` / `obsidian` / `qa`
  - `maintenance`: `planner` / `refactor` / `deps` / `qa`

## 运行方式

在 GitHub Actions 页面手动运行 `Multi-Agent Orchestrator`，填写：

- `goal`: 本次协作目标，例如“重构首页 Hero 并保持构建通过”
- `agent_profile`: 本次要启用的 agent 组合
- `target_branch`: 要执行的分支
- `dry_run`: 是否只跑基线检查和报告汇总

工作流也会每天自动跑一次，用于例行维护巡检。

## 当前工作机制

每个 agent job 会做三件事：

1. 安装依赖并执行该角色的基线命令
2. 读取 `.github/agents/<role>.md` 作为角色提示词
3. 生成 `.artifacts/agents/<role>.json` 报告并上传 artifact

最后 `summarize` job 会把所有报告合并成：

- `.artifacts/summary/summary.md`
- `.artifacts/summary/summary.json`

同时写入 GitHub Actions 的 Step Summary，方便直接在网页查看。

## 如何接入真正的 Agent 命令

当前实现默认就能跑通，但默认不会修改仓库代码。要接入真正的智能体执行器，在仓库 `Settings -> Secrets and variables -> Actions -> Variables` 中增加：

- 变量名：`MULTI_AGENT_COMMAND`
- 变量值：你希望每个 agent job 执行的命令

这个命令在运行时会自动拿到以下环境变量：

- `AGENT_ROLE`
- `AGENT_GOAL`
- `AGENT_PROFILE`
- `AGENT_PROMPT`
- `AGENT_OUTPUT_FILE`

如果你的 agent 需要模型密钥，再在 `Secrets` 中添加对应密钥，例如：

- `OPENAI_API_KEY`

一个典型接法是让这个命令读取 `AGENT_PROMPT` 和 `AGENT_GOAL`，执行分析或代码生成，然后把结果写回 `AGENT_OUTPUT_FILE`。

## 建议的接入节奏

建议按下面顺序推进，避免一开始就让自动化直接写代码：

1. 先保持 `dry_run=true`，验证矩阵调度、artifact 汇总、角色分工是否符合预期
2. 再让 `MULTI_AGENT_COMMAND` 只输出建议，不直接改代码
3. 稳定后再加入分支写入、提交、PR 创建等能力
4. 最后再考虑增加自动合并门禁

## 扩展角色

如果要新增 agent：

1. 在 `.github/agents/` 下新增对应的 `<role>.md`
2. 在 `scripts/multi-agent/agent-runner.mjs` 的 `defaultCommandsByRole` 中补充该角色的基线命令
3. 在 workflow 的 `prepare` job 里把该角色加进某个 profile 的矩阵

## 适合这个博客仓库的分工建议

- `planner`: 拆任务和排依赖
- `nextjs`: 负责 App Router、页面、组件与交互
- `content`: 负责 `content/` 下的 JSON 和文章
- `obsidian`: 负责 Obsidian 发布链路
- `refactor`: 负责结构清理
- `deps`: 负责依赖维护
- `qa`: 负责最终验收和回归风险

## 注意事项

- 这套流程当前是“编排层”，重点是调度和汇总，不会默认替你提交代码
- 如果后续要让 agent 自动推分支或开 PR，建议单独加最小权限 token
- `content-refresh` 里的 `obsidian` 角色会跑 `npm run sync:obsidian`，如果没有本地配置文件，在 CI 里通常会失败，所以更适合先保持 `dry_run=true` 或把该角色基线命令改成只做静态检查
