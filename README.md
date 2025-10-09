# ultrashell

A modern desktop shell built with
[AGS (Astal GTK4)](https://aylur.github.io/ags-docs/), GTK4, TypeScript, and
SCSS. Features a clean status bar with time, notifications, workspaces,
calendar, and comprehensive system information.

https://github.com/user-attachments/assets/a32c680e-a88d-4ef0-a5ff-d1897927f8d1

## Features

- **Modern UI**: Clean and distraction-free design, optimized for ultrawide
  monitors
- **Batteries included**: Out of the box notificaitons, bluetooth, audio
  settings, and more
- **Hyprland**: Native support for Hyprland
- **Nix/NixOS**: Fully packaged with Nix flakes for reproducible builds

## Development

### Setup (requires nix flakes)

```bash
git clone https://github.com/user/ultrashell.git
cd ultrashell
nix develop
ags init -d . -f
ags run app.tsx
```

### Code Style

- Follow guidelines in `AGENTS.md`
- Uses Prettier with no semicolons, 2-space indentation
- TypeScript strict mode enabled

### Project Structure

```
├── app.tsx             # Main application entry point
├── widgets/            # UI widget components
│   ├── bar/           # Status bar and layout
│   ├── calendar/      # Time and calendar widgets
│   ├── notifications/ # Notification system
│   ├── bluetooth/     # Bluetooth controls
│   ├── volume/        # Audio and media controls
│   ├── network/       # Network status and controls
│   ├── performance/   # System performance monitoring
│   └── workspaces/    # Workspace management
├── styles/            # SCSS styling
│   ├── components/    # Reusable component styles
│   └── main.scss      # Main stylesheet
├── utils/             # Utility functions
├── flake.nix          # Nix build configuration
└── package.json       # Dependencies and Prettier config
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code style guidelines in `AGENTS.md`
4. Test with your Hyprland setup
5. Submit a pull request
