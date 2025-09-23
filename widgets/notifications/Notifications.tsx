import { Gtk } from "ags/gtk4";
import {
  notificationIcon,
  NotificationsDropdown,
} from "./NotificationsDropdown";

export function Notifications() {
  return (
    <box>
      <menubutton class="icon-button" halign={Gtk.Align.CENTER}>
        <label label={notificationIcon} />
        <NotificationsDropdown />
      </menubutton>
    </box>
  );
}
