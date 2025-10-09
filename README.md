# ultrashell

A modern desktop shell built with
[AGS (Astal GTK4)](https://aylur.github.io/ags-docs/), GTK4, Typescript, and
SASS. Features a clean, status bar with time, notifications, workspaces,
calendar, and system information.

https://github.com/user-attachments/assets/a32c680e-a88d-4ef0-a5ff-d1897927f8d1

## Features

- **Modern UI**: Clean and distraction free, works great on ultrawide monitors.
- **Hyprland**: Designed for Hyprland a modern Wayland compositors.
- **Batteries included**: Notificaitons, Bluetooth, Audiio settings, and more.
- **Nix/Nixos**: Packaged with Nix flakes.

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code style guidelines in `AGENTS.md`
4. Submit a pull request
