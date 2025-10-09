AGENT QUICKSTART (≈20 lines)
1. Build (Nix): nix build .  (dev shell: nix develop)
2. Run bundled shell (after build): result/bin/hyprshell
3. Live dev (AGS): ags -b app.tsx  (ensure deps from nix develop)
4. Lint/format: npx prettier --check . | --write .  (respect .prettierrc over package.json inline config)
5. Type check: npx tsc --noEmit
6. Single file type isolate: npx tsc --noEmit widgets/bar/Bar.tsx
7. (No test framework yet) — add vitest/jest before writing tests; single test placeholder: npx vitest run path/to/test.ts once added.
8. Modules: ES2022, target ES2020, JSX via ags/gtk4 (react-jsx). Avoid default exports; prefer named exports.
9. Imports: group order = std libs, external (*), internal (widgets/, utils/, styles/), then relative; no deep relative climbs when root alias exists.
10. Formatting: Prettier printWidth 95, semi true, singleQuote true, trailingComma all, arrowParens avoid; do NOT add unchecked style overrides.
11. Types: strict TS; never use any unless casting boundary; prefer readonly, explicit return types on exported functions/components.
12. Components: PascalCase filenames; hooks (if added) camelCase useSomething; keep components pure and side-effects isolated.
13. State/data: derive rather than store duplicates; centralize utility logic in utils/; avoid hidden globals.
14. Errors: fail fast with thrown Error; wrap external/IO (file, network, bluetooth) with try/catch and log via utils/log.ts; never swallow silently.
15. Logging: use utils/log.ts (extend there if needed); strip debug noise before merging.
16. Styles: SCSS variables/mixins in _variables/_mixins; component-scoped .scss colocated; avoid inline style strings in TSX.
17. File adds: update README structure section if new top-level area introduced.
18. Commit messages: concise imperative, explain WHY + scope (e.g., bar: add workspace cycling).
19. Future tests: place under __tests__/ mirroring src tree; data-only modules easiest to start.
20. Keep AGENTS.md lines ~20; edit here when introducing tooling (eslint, vitest, etc.).
