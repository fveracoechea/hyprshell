import AstalNotifd from "gi://AstalNotifd";
import { Dropdown } from "../../styles/components/Dropdown";
import { Gtk } from "ags/gtk4";
import { createBinding, createState, For, onCleanup } from "ags";
import { notificationHandler } from "./utils";
import { NotificationCard } from "./NotificationCard";

const notifd = AstalNotifd.get_default();

const [notifications, setNotifications] = createState(
  [] as AstalNotifd.Notification[],
);

setNotifications(notifd.notifications);

onCleanup(notificationHandler(notifd, notifications, setNotifications));

export function NotificationsDropdown() {
  const notifd = AstalNotifd.get_default();
  return (
    <Dropdown icon="󰂚" name="Notifications">
      {() => (
        <box
          spacing={8}
          class="notifications-content"
          orientation={Gtk.Orientation.VERTICAL}
        >
          <For each={notifications}>
            {(n: AstalNotifd.Notification) => {
              return <NotificationCard data={n} />;
            }}
          </For>

          <box
            widthRequest={400}
            class="no-notifications"
            visible={notifications((n) => n.length < 1)}
            orientation={Gtk.Orientation.VERTICAL}
          >
            <label class="icon" label="󰂜" />
            <label class="label" label="You're all caught up!" />
          </box>
        </box>
      )}
    </Dropdown>
  );
}
