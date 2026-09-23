# Agent Skills — m3-expressive-web

One open-standard skill (`SKILL.md` + YAML frontmatter `name`/`description`) that teaches any AI agent to build Material 3 Expressive web UIs with **exact spec values**.

Repo: https://github.com/lobsterbs/m3-expressive-web

## Per-agent install

The SKILL.md format is universal (Agent Skills open standard, agentskills.io). Only the install location differs per agent:

| Agent | Personal location | Repo location (auto-detected) |
|---|---|---|
| **Claude Code** | `~/.claude/skills/m3-expressive-web/SKILL.md` | `.claude/skills/m3-expressive-web/SKILL.md` |
| **Codex CLI / IDE** | `~/.codex/skills/m3-expressive-web/SKILL.md` | `.agents/skills/m3-expressive-web/SKILL.md` (scanned from cwd up to repo root) |
| **ChatGPT** | skills ship as plugins via the ChatGPT/Codex plugin directory; type `@` to select a skill | — |
| **Cursor** | `~/.cursor/skills/m3-expressive-web/SKILL.md` | `.cursor/skills/` |
| **Gemini CLI** | `~/.gemini/skills/m3-expressive-web/SKILL.md` | — |
| **Copilot / Windsurf / others** | your agent's skills dir (see its docs) | — |

### Quick install (any agent)

```bash
git clone https://github.com/lobsterbs/m3-expressive-web.git
cp -r m3-expressive-web/skills/m3-expressive-web ~/.<your-agent>/skills/
```

## Claude Code specifics

- Skills go in `.claude/skills/<name>/` (project, committed to the repo) or `~/.claude/skills/` (personal). Claude Code auto-detects them.
- **Frontmatter is strictly validated** — allowed keys only: `name`, `description`, `allowed-tools`, `compatibility`, `license`, `metadata`. `name` must match the folder name (lowercase, hyphens).
- Validate with: `claude plugin validate .claude/skills`
- This repo already ships `.claude/skills/m3-expressive-web/SKILL.md` on `main`, so Claude Code picks it up the moment you clone.

## Codex CLI / ChatGPT specifics

- Codex reads skills from repository (`.agents/skills/`), user (`~/.codex/skills/`), admin, and system locations. It scans `.agents/skills` from your cwd up to the repo root — this repo ships one on `main`.
- Invoke with `/skills` or type `$` to mention a skill; in ChatGPT type `@`. Codex detects skill changes automatically (restart if an update doesn't appear).
- Source: learn.chatgpt.com/docs/build-skills

## Verification

- Frontmatter: `name: m3-expressive-web` matches the folder name; only `name` + `description` used — the two keys every agent accepts.
- All spec values inside are exact and sourced (MDC-Android motion tokens, m3.material.io); unverifiable values are marked `TODO(spec)`.
