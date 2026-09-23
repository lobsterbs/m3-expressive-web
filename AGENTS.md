# AGENTS.md — contributor & AI agent guide

Rules of engagement for humans and AI agents working on this repository.

## Project context

This is a **port**, not a fork: Material Web Components is in maintenance mode
and does not implement M3 Expressive. We implement the expressive design
language on the web with Lit + CSS custom-property design tokens, following
the official spec pages on <https://m3.material.io> and the architecture of
`material-components/material-web` (token names, primitive decomposition).

## Non-negotiables

1. **Tokens over hard-coded values.** No raw hex/px in component styles except
   as token *defaults*. Styles read `--md-sys-*` / `--md-comp-*` variables.
2. **Reduced motion is mandatory.** Every animated component must handle
   `prefers-reduced-motion: reduce` (see existing components for the pattern).
3. **Keyboard accessibility is not optional.** Every interactive component
   wires `<md-focus-ring>`, focus/blur handling, and sensible ARIA roles.
4. **Strict TypeScript.** `strict` + `noUncheckedIndexedAccess`; no `any`
   in new code; exported functions declare return types.
5. **Follow M3 spec values.** State layer opacities, elevation levels, corner
   scale, and motion values come from the spec — don't invent them. If unsure,
   check the linked spec page in the file header.

## Architecture map

```
src/
  tokens/m3-tokens.css          # all design tokens (CSS custom properties)
  internal/                     # primitives (state layer, ripple, elevation,
                                #   focus ring) + InteractiveController
  motion/springs.ts             # spring physics -> linear() easing
  shape/shapes.ts               # expressive shape library + morph helper
  components/<name>/            # one folder per component; base classes for variants
  index.ts                      # public entry; keep exports curated
demo/index.html                 # manual smoke test; update when adding components
```

## Component checklist (new components)

1. Create `src/components/<name>/md-<name>.ts`; use `@customElement('md-<name>')`.
2. Compose `<md-state-layer>`, `<md-ripple>`, `<md-elevation>`, `<md-focus-ring>` via `InteractiveController`.
3. All styles from tokens; states (hover/focus/pressed/disabled) styled explicitly.
4. Reduced-motion branch + ARIA role/state + keyboard activation.
5. Add the component to `src/index.ts` and `demo/index.html`.
6. Commit format: `Checkpoint N: <area> — <summary>` for milestone pushes,
   conventional commits otherwise.

## Workflow for agents

- Read `src/internal/interactive.ts` and one existing component before writing
  a new one — the controller pattern is the contract.
- Never regenerate `src/tokens/m3-tokens.css` wholesale; extend it.
- When porting a spec value you can't verify, leave a `// TODO(spec)` comment
  with the spec URL instead of guessing silently.
- Big milestones are pushed as single commits ("checkpoints"); keep them
  cohesive (tokens | primitives | components | docs).
