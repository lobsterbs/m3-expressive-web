# Agent Skills — m3-expressive-web

A portable [Agent Skills](https://agentskills.io) open-standard skill that teaches any AI coding agent (Claude Code, Codex CLI, Cursor, Gemini CLI, OpenCode, Mistral, ChatGPT, and 20+ others) how to build **Material 3 Expressive** interfaces on the web with **exact spec values**.

Repo: **https://github.com/lobsterbs/m3-expressive-web**

## Why this skill

The official Material Web Components (`@material/web`) is in maintenance mode and never received the Material 3 Expressive update (new motion scheme, shape morphing, wavy progress, button groups, split buttons, FAB menus, loading indicators). This skill encodes the **exact canonical values** — spring constants sampled into CSS `linear()` curves, state-layer opacities, elevation scale, corner scale — sourced from the MDC-Android token files that share the canonical expressive motion scheme with Compose.

## What's in the skill

- `skills/m3-expressive-web/SKILL.md` — the skill itself:
  - Exact motion token table (six spring pairs, damping/stiffness) and how they map to CSS `linear()`
  - State-layer opacity rules (hover 8%, focus 10%, pressed 10%, dragged 16%)
  - Elevation scale (0–5 → 0/1/3/6/8/12dp) and corner scale (4/8/12/16/28/48/full)
  - Two-tier token architecture (`--md-sys-*` / `--md-comp-*`)
  - Component inventory and usage snippets
  - The **exact-values contract**: never invent spec values; mark unverifiable ones with `// TODO(spec): <url>`

## Installation

The skill is a single `SKILL.md` with YAML frontmatter (`name`, `description`) — the open standard works across agents.

### Claude Code

```bash
git clone https://github.com/lobsterbs/m3-expressive-web.git
mkdir -p ~/.claude/skills
cp -r m3-expressive-web/skills/m3-expressive-web ~/.claude/skills/
```

Or add the repo as a skill source:

```bash
claude skill add --url https://github.com/lobsterbs/m3-expressive-web/tree/agent-skills/skills/m3-expressive-web
```

### Codex CLI / OpenAI agents

```bash
git clone https://github.com/lobsterbs/m3-expressive-web.git
mkdir -p ~/.codex/skills
cp -r m3-expressive-web/skills/m3-expressive-web ~/.codex/skills/
```

### Cursor

```bash
git clone https://github.com/lobsterbs/m3-expressive-web.git
mkdir -p ~/.cursor/skills
cp -r m3-expressive-web/skills/m3-expressive-web ~/.cursor/skills/
```

### Gemini CLI

```bash
git clone https://github.com/lobsterbs/m3-expressive-web.git
mkdir -p ~/.gemini/skills
cp -r m3-expressive-web/skills/m3-expressive-web ~/.gemini/skills/
```

### OpenCode / Mistral / ChatGPT / any open-standard agent

Copy the skill folder into your agent's skills directory (see its docs), or point it directly at the raw file:

```
https://raw.githubusercontent.com/lobsterbs/m3-expressive-web/agent-skills/skills/m3-expressive-web/SKILL.md
```

## Using the skill

Once installed, just ask your agent things like:

- "Build a settings page using Material 3 Expressive"
- "Add a FAB menu with the correct expressive motion"
- "Morph this button between a pill and a clover shape on press"

The skill will use exact spring values, correct state-layer opacities, and the two-tier token system — no invented numbers.

## Spec sources

- Material 3 Expressive guidelines: https://m3.material.io
- MDC-Android motion tokens (canonical spring values): https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
- Material Web (architecture reference): https://github.com/material-components/material-web
