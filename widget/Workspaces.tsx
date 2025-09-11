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
        <box spacing={6} class="workspaces">
          <For each={workspaces}>
            {(w) => (
              <label
                label={String(w.id)}
                class={fw.id === w.id
                  ? "text-primary font-bold text-xl"
                  : "text-xl"}
              />
            )}
          </For>
        </box>
      )}
    </With>
  );
}
