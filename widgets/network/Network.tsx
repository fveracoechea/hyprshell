import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";

export function Network() {
  return (
    <box>
      <button
        class="icon-button"
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          execAsync("ghostty --class=Impala -e impala");
        }}
      >
        {"󰀂"}
      </button>
    </box>
  );
}
