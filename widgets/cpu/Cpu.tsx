import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";

export function CPU() {
  return (
    <box>
      <button
        class="icon-button"
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          execAsync("ghostty --class=Btop -e btop");
        }}
      >
        {""}
      </button>
    </box>
  );
}
