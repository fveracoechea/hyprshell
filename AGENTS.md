# Agent Guidelines for hyprshell

## Build/Lint/Test Commands

- No npm scripts defined - this is an AGS (Astal GTK4) project
- Use `ags` command to run the application
- CSS is built using TailwindCSS: `tailwindcss -i styles/main.css`
- No test framework configured

## Code Style Guidelines

### Imports

- Use `ags/gtk4` for AGS imports: `import app from "ags/gtk4/app"`
- Use destructured imports for multiple items:
  `import { Astal, Gdk, Gtk } from "ags/gtk4"`
- Import components from relative paths: `import Bar from "./widget/Bar"`

### Formatting (Prettier config)

- No semicolons (`"semi": false`)
- 2-space indentation (`"tabWidth": 2`)
- Use double quotes for strings consistently

### TypeScript/JSX

- Strict mode enabled in tsconfig.json
- Use JSX with `jsx: "react-jsx"` and `jsxImportSource: "ags/gtk4"`
- Target ES2020+ with ES2022 modules

### Naming Conventions

- PascalCase for components: `Bar`, `Calendar`, `Time`
- camelCase for variables and functions: `gdkmonitor`, `createPoll`
- Use descriptive names for CSS classes: `bg-bg`, `text-primary`

### File Structure

- Components in `/widget/` directory with `.tsx` extension
- Main app entry in `app.ts`
- Styles in `/styles/` directory

