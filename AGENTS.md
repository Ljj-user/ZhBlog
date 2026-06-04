# AGENTS.md

# ZH_Blog Agent Operating Manual

## Core Principle

The user controls the work switch.

Do not start, continue, or complete tasks from `docs/todo.md` unless the user explicitly asks for it.

Valid user commands include:

* "执行 todo 中的下一个任务"
* "完成 P1"
* "继续开发 P2"
* "修复当前报错"
* "检查这个模块"
* "执行 P12"
* "开始 P12"

If the user only asks a question, explain or suggest, but do not modify code.

---

## Project Context

Project: ZH_Blog

Type: Personal blog / portfolio / photography archive

Deployment: Vercel

Tech stack:

* Next.js App Router
* TypeScript
* Tailwind CSS

Design direction:

* 硬核技术流 × 胶片复古生活流
* 克制、安静、有呼吸感
* Modern Apple / Linear / Raycast feeling
* Content-first, not animation-first

---

## Required Reading

Before starting any coding task, read the relevant documents:

1. `docs/todo.md`
2. `docs/design.md`
3. `docs/vision.md`

Read extra docs only when needed:

* `docs/schema.md` for data structure changes
* `docs/decisions.md` for architecture decisions

If there is a conflict:

user instruction
> AGENTS.md
> docs/todo.md
> docs/design.md
> docs/vision.md

---

## Workflow

When the user explicitly asks to execute a task:

1. Read the relevant docs.
2. Identify the requested task scope.
3. Determine required specialists automatically.
4. Implement the smallest safe change.
5. Validate the result.
6. Update `docs/todo.md` only for the task that was actually completed.
7. Stop.

Do not automatically continue to the next task.

---


## Task Priority

When working on a requested task, handle blocking issues first:

1. Build errors
2. Runtime errors
3. Failed validation
4. Requested todo task
5. Enhancements

Never implement new features while known build/runtime errors block the project.
---
## User-Driven Task Execution

Task execution is user-driven.

When the user references a specific task ID
(e.g. P12, P13, P14):

1. Locate that task in docs/todo.md
2. Read its requirements
3. Determine required specialists
4. Execute only that task
5. Update its status
6. Stop

Do not automatically select the next task.
---
## Context Discipline

Read only the documents required for the current task.

- Task-specific work:
  read only the referenced P-task in todo.md

Do not load every file by default.

Examples:

- UI task:
  read design.md
  read todo.md

- Content task:
  read schema.md
  read content files

- Architecture task:
  read decisions.md

Prefer minimal context.
---

## Architecture Protection

Prefer minimal, targeted changes.

Do not:

* rewrite entire pages unless necessary
* replace the existing architecture
* introduce new frameworks without approval
* refactor unrelated code
* redesign data schema without checking `docs/schema.md`

If a task can be solved by changing 3 files, do not rewrite 30 files.
---
## Change Scope Protection

Before making changes:

1. Identify the smallest affected area.
2. Limit modifications to relevant files.
3. Avoid touching unrelated code.

Always prefer incremental changes over broad rewrites.

---
## Specialist Persona Files

Each specialist has a dedicated persona file under `/agents`.

Before using a specialist, the primary agent must read the matching file:

- Designer Agent → `agents/designer.md`
- Frontend Agent → `agents/frontend.md`
- Content Agent → `agents/content.md`
- Reviewer Agent → `agents/reviewer.md`

Specialists must follow their own persona file as the highest role-level guidance.

Specialists should not read other specialist persona files unless the primary agent explicitly asks them to collaborate across roles.

Persona files define role mindset, responsibilities, restrictions, and expected output style.

AGENTS.md remains the global operating manual.

---

## Automatic Delegation

The primary agent is responsible for task decomposition and specialist selection.

The user should not need to manually choose an agent.

Delegation map:

- UI / visual consistency / motion → Designer Agent → `agents/designer.md`
- React components / Tailwind / page implementation → Frontend Agent → `agents/frontend.md`
- posts / projects / photos / content files → Content Agent → `agents/content.md`
- lint / build / accessibility / regression review → Reviewer Agent → `agents/reviewer.md`

---

## Validation Checklist

Before marking a task complete:

* Run `npm run lint`
* Run `npm run build`

If tests exist, run tests.

Also verify:

* mobile layout
* desktop layout
* dark mode
* no console errors

If validation cannot be run, explain why.

---

## Definition of Done

A task is complete only if:

* the requested feature or fix works
* validation passes or failure is clearly explained
* `docs/todo.md` is updated for the completed task
* no obvious UI regression is introduced
* unrelated files are not modified unnecessarily

