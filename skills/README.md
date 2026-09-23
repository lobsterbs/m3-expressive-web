# agent-skills branch — AI agent skills for this repo

This branch packages the repository's knowledge as an **Agent Skills**
SKILL.md (the open standard published by Anthropic, readable by Claude Code,
OpenAI Codex CLI, Cursor, OpenCode, OpenClaw, and 20+ other agents).

## Install

**Claude Code**
```bash
git clone -b agent-skills https://github.com/lobsterbs/Material-You-3-Web.git
mkdir -p ~/.claude/skills
cp -r Material-You-3-Web/skills/m3-expressive-web ~/.claude/skills/
```
Or in a project: copy to `.claude/skills/m3-expressive-web/`.

**Codex CLI / Cursor / OpenCode / any SKILL.md-compatible agent**
Copy `skills/m3-expressive-web/` into your agent's skills directory
(e.g. `~/.codex/skills/`, `.cursor/skills/`). The format is the same open
standard; unrecognized frontmatter fields are ignored.

**Mistral (Vibe)**
The same content also lives as a first-party skill in the maintainer's
environment; the SKILL.md here is the portable form.

## What the skill encodes

- The exact-values contract (state layers, elevation, corner scale, canonical
  spring constants) with a "never approximate" rule
- Component usage and the InteractiveController extension pattern
- The research workflow for verifying spec values (m3.material.io interactive
  modules, MDC-Android tokens.xml, Compose source, existing ports)

Keep this branch in sync with AGENTS.md on main when contracts change.
