# ultrashell

A modern desktop shell built with
[AGS (Astal GTK4)](https://aylur.github.io/ags-docs/) and TypeScript. Features a
clean, customizable status bar with time, calendar, and system information.

https://github.com/user-attachments/assets/a32c680e-a88d-4ef0-a5ff-d1897927f8d1

## Features

- **Modern UI**: Built with GTK4 and styled with TailwindCSS
- **Time & Date**: Live clock with popup calendar
- **User Info**: Displays current username
- **Wayland Ready**: Designed for modern Wayland compositors like Hyprland
- **TypeScript**: Fully typed with strict TypeScript configuration

## Prerequisites

- NixOS or Nix package manager
- Wayland compositor (tested with Hyprland)
- AGS (Astal GTK4)

## Installation

### Using Nix Flakes

1. Clone the repository:

```bash
git clone https://github.com/your-username/hyprshell.git
cd hyprshell
```

2. Build and install:

```bash
nix build
```

3. Run the shell:

```bash
./result/bin/my-shell
```

### Development Setup

1. Enter the development shell:

```bash
nix develop
```

2. Run in development mode:

```bash
ags run app.ts
```

## Configuration

The shell configuration is primarily in `app.ts`. The bar layout and styling can
be customized by modifying:

- `widget/Bar.tsx` - Main bar component and layout
- `widget/Calendar.tsx` - Time and calendar widgets
- `styles/` - TailwindCSS styling and themes

## Project Structure

```
├── app.ts              # Main application entry point
├── widget/             # UI components
│   ├── Bar.tsx         # Status bar component
│   └── Calendar.tsx    # Time and calendar widgets
├── styles/             # Styling and themes
│   ├── main.css        # TailwindCSS base styles
│   ├── theme.css       # Color theme definitions
│   └── custom.css      # Custom styling
├── flake.nix          # Nix build configuration
└── package.json       # Dependencies and Prettier config
```

## Development

### Code Style

- TypeScript with strict mode enabled
- Prettier formatting (no semicolons, 2-space indentation)
- AGS/GTK4 JSX components
- TailwindCSS for styling

### Building CSS

TailwindCSS is automatically processed during AGS startup, but you can manually
build it:

```bash
tailwindcss -i styles/main.css
```

### Adding Widgets

1. Create new widget components in the `widget/` directory
2. Import and use them in `Bar.tsx` or create new windows
3. Follow the existing naming conventions (PascalCase for components)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code style guidelines in `AGENTS.md`
4. Submit a pull request

## License

[Add your license here]
