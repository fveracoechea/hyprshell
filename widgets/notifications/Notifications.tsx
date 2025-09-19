import { Gtk } from "ags/gtk4";
import { NotificationsDropdown } from "./NotificationsDropdown";

export function Notifications() {
  return (
    <box>
      <menubutton class="icon-button" halign={Gtk.Align.CENTER}>
        {"󰂚"}
        <NotificationsDropdown />
      </menubutton>
    </box>
  );
}
