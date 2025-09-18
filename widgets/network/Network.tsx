import { Gtk } from "ags/gtk4";
import AstalNetwork from "gi://AstalNetwork";
import { execAsync } from "ags/process";
import { createBinding, createComputed } from "gnim";
import { NetworkDropdown } from "./NetworkDropdown";

const network = AstalNetwork.get_default();

export function Network() {
  return (
    <box>
      <menubutton
        class="icon-button"
        halign={Gtk.Align.CENTER}
      >
        {"󰀂"}
        <NetworkDropdown />
      </menubutton>
    </box>
  );
}
