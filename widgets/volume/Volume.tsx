import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import AstalWp from "gi://AstalWp";
import { createBinding, createComputed, State } from "ags";
import { VolumeDropdown } from "./VolumeDropdown";

const step = 5;

export function Volume() {
  return (
    <box>
      <menubutton
        class="icon-button"
        halign={Gtk.Align.CENTER}
      >
        {""}
        <VolumeDropdown />
      </menubutton>
    </box>
  );
}
