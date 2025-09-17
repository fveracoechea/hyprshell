import { Gtk } from "ags/gtk4";
import { HardwareStatsDropdown } from "./HardwareStatsDropdown";

export function Performance() {
  return (
    <box>
      <menubutton
        class="icon-button"
        tooltipText="Performance Stats"
        halign={Gtk.Align.CENTER}
        // onClicked={() => {
        //   execAsync("ghostty --class=Btop -e btop");
        // }}
      >
        {"󰓅"}
        <HardwareStatsDropdown />
      </menubutton>
    </box>
  );
}
