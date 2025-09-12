import Hyprland from "gi://AstalHyprland";

import { createBinding, For, With } from "ags";

export function Workspaces() {
  const hyprland = Hyprland.get_default();
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");
  const workspaces = createBinding(hyprland, "workspaces")((ws) =>
    ws.sort((w) => w.id)
  );

  return (
    <With value={focusedWorkspace}>
      {(fw) => (
        <box class="workspaces" spacing={4}>
          <For each={workspaces}>
            {(w) => {
              const isActive = fw.id === w.id;
              return (
                <button class={`button sm ${isActive ? "active" : ""}`}>
                  <label
                    label={String(w.id)}
                    class={`workspace-label ${isActive ? "active" : ""}`}
                  />
                </button>
              );
            }}
          </For>
        </box>
      )}
    </With>
  );
}

