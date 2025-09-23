import { Gtk } from "ags/gtk4";
import { HardwareStatsDropdown } from "./HardwareStatsDropdown";

export function Performance() {
  return (
    <box>
      <menubutton class="icon-button" halign={Gtk.Align.CENTER}>
        {"󰓅"}
        <HardwareStatsDropdown />
      </menubutton>
    </box>
  );
}
