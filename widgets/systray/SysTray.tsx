import Tray from "gi://AstalTray";
import { Gtk } from "ags/gtk4";
import { createBinding, For } from "ags";

export function SysTray() {
  const tray = Tray.get_default();
  const items = createBinding(tray, "items");

  function init(btn: Gtk.MenuButton, item: Tray.TrayItem) {
    btn.menuModel = item.menuModel;
    btn.insert_action_group("dbusmenu", item.actionGroup);
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup);
    });
  }

  return (
    <box class="tray" spacing={4}>
      <For each={items}>
        {(item) => (
          <menubutton
            class="icon-button"
            $={(self) => init(self, item)}
          >
            <image gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
    </box>
  );
}

