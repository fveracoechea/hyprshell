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
        <box class="workspaces">
          <For each={workspaces}>
            {(w) => {
              const isActive = fw.id === w.id;
              return (
                <button class={`button sm ${isActive ? "active" : ""}`}>
                  <label
                    label={String(w.id)}
                    class={isActive
                      ? "text-crust font-bold text-lg"
                      : "text-lg text-text"}
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
