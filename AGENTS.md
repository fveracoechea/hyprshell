# AGENTS.md - UltraShell Development Guide

## Build Commands
- No specific build command in package.json (relies on AGS runtime)
- Code formatting: Uses Prettier with semicolons disabled and 2-space indentation

## Project Structure
- TypeScript/React-style components with `.tsx` extensions
- Utilities in `utils/` directory with `.ts` extensions
- Styling in `styles/` with SCSS files
- Widgets organized by feature in `widgets/` subdirectories

## Code Style Guidelines
- **Imports**: Group AGS imports first, then local imports with relative paths
- **Functions**: Use PascalCase for React components, camelCase for utilities
- **Types**: Define TypeScript types inline or import from `gi://` modules
- **Formatting**: Prettier config enforces no semicolons, 2-space tabs
- **JSX**: Use AGS's JSX implementation with `jsxImportSource: "ags/gtk4"`
- **File naming**: Components in PascalCase (e.g., `Bar.tsx`), utils in camelCase
- **Error handling**: Use console.log for debugging, handle GLib/GTK errors gracefully
- **State**: Use AGS's signals and reactive primitives (`createPoll`, `Accessor`, `Setter`)

## TypeScript Configuration
- Strict mode enabled with ES2022 modules and ES2020 target
- Module resolution set to "Bundler" for AGS compatibility