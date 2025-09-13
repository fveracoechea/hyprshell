import { Gtk } from "ags/gtk4";

export function Notifications() {
  return (
    <box>
      <button class="icon-button" halign={Gtk.Align.CENTER}>{"󰂚"}</button>
    </box>
  );
}
