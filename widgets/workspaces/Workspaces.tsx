import Hyprland from "gi://AstalHyprland";

import { createBinding, For, With } from "ags";

export function Workspaces() {
  const hyprland = Hyprland.get_default();
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");

  const workspaces = createBinding(hyprland, "workspaces").as((
    ws: Hyprland.Workspace[],
  ) => ws.sort((w) => w.id));

  return (
    <box>
      <With value={focusedWorkspace}>
        {(fw) => (
          <box class="workspaces">
            <For each={workspaces}>
              {(w: Hyprland.Workspace) => {
                const isActive = fw.id === w.id;

                let classNames = "workspace-button";
                if (isActive) classNames += " active-workspace";

                function onClick() {
                  hyprland.dispatch("workspace", w.id.toString());
                }

                return (
                  <button class={classNames} onClicked={onClick}>
                    {String(w.id)}
                  </button>
                );
              }}
            </For>
          </box>
        )}
      </With>
    </box>
  );
}
