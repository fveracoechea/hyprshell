import AstalTray from "gi://AstalTray";
import { Gtk } from "ags/gtk4";
import { createBinding, createState, For } from "ags";

export function SysTray() {
  const tray = AstalTray.get_default();
  const items = createBinding(tray, "items");

  const [open, setOpen] = createState(false);

  function init(btn: Gtk.MenuButton, item: AstalTray.TrayItem) {
    btn.menuModel = item.menuModel;
    btn.insert_action_group("dbusmenu", item.actionGroup);
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup);
    });
  }

  return (
    <box
      spacing={8}
      visible={items((i) => i.length > 0)}
      class={open((o) => (o ? "open tray" : "tray"))}
    >
      <revealer
        revealChild={open}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        transitionDuration={250}
      >
        <box class="tray-items">
          <For each={items}>
            {(item: AstalTray.TrayItem) => (
              <menubutton
                class="tray-button"
                $={(self) => init(self, item)}
                valign={Gtk.Align.CENTER}
                halign={Gtk.Align.CENTER}
              >
                <image gicon={createBinding(item, "gicon")} />
              </menubutton>
            )}
          </For>
        </box>
      </revealer>
      <button
        class="icon-button"
        tooltipText={open((
          o,
        ) => (o ? "Close System Tray" : "Open System Tray"))}
        onClicked={() => setOpen((v) => !v)}
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}
      >
        <label
          class="icon"
          label="󰮫"
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
        />
      </button>
    </box>
  );
}
