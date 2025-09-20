import AstalNotifd from "gi://AstalNotifd";
import { Dropdown } from "../../styles/components/Dropdown";
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
        <box widthRequest={500}>
          <For each={notifications}>
            {(n: AstalNotifd.Notification) => {
              return <NotificationCard data={n} />;
            }}
          </For>
        </box>
      )}
    </Dropdown>
  );
}
