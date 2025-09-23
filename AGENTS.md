# AGENTS.md - HyprShell Development Guide

## Build/Test Commands

- No build/test commands defined in package.json. This appears to be an AGS (Astal) TypeScript/JSX project.
- Code is likely compiled/bundled by the AGS runtime.

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled with ES2022 modules and ES2020 target
- JSX with `jsx: "react-jsx"` and `jsxImportSource: "ags/gtk4"`

### Formatting (Prettier)

- No semicolons (`"semi": false`)
- 2-space indentation (`"tabWidth": 2`)

### Import Style

- Default imports for components: `import Bar from "./widgets/bar/Bar"`
- Named imports from libraries: `import { Astal, Gdk } from "ags/gtk4"`
- CSS imports: `import css from "styles/main.scss"`

### File Organization

- Widgets in `/widgets/{name}/` with `.tsx` and `.scss` files
- SCSS uses `@use` imports, not `@import`
- Component files use PascalCase (e.g., `Bar.tsx`, `Volume.tsx`)

### Component Style

- Functional components with TypeScript props interfaces
- Use AGS JSX elements (`<window>`, `<box>`, `<button>`)
- Props use `class` for CSS classes, `$type` for box types
- Event handlers: `onClicked={() => ...}`
- Use `onCleanup()` for resource cleanup
