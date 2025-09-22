import AstalNotifd from "gi://AstalNotifd";
import { Dropdown } from "../../styles/components/Dropdown";
import { Gtk } from "ags/gtk4";
import { createBinding, createState, For, onCleanup } from "ags";
import { notificationHandler } from "./utils";
import { NotificationCard } from "./NotificationCard";
import { createPoll } from "ags/time";

const notifd = AstalNotifd.get_default();

const [notifications, setNotifications] = createState(
  [] as AstalNotifd.Notification[],
);

setNotifications(notifd.notifications);
onCleanup(notificationHandler(notifd, notifications, setNotifications));

export function NotificationsDropdown() {
  const notifd = AstalNotifd.get_default();
  return (
    <Dropdown
      icon="󰂚"
      name="Notifications"
      heightRequest={550}
      widthRequest={500}
      actions={(popover) => (
        <box spacing={8} valign={Gtk.Align.START} halign={Gtk.Align.END}>
          <box valign={Gtk.Align.START} halign={Gtk.Align.END}>
            <switch
              heightRequest={4}
              valign={Gtk.Align.CENTER}
              $={(self) => {
                self.connect("notify::active", () => {
                  // bluetooth.adapter?.set_powered(self.active);
                });
              }}
            />
          </box>
          <button
            class="icon-button"
            tooltipText="Clear All Notifications"
            valign={Gtk.Align.START}
            onClicked={() => {
              popover.popdown();
            }}
          >
            <label label="󰩹" class="icon" />
          </button>
        </box>
      )}
    >
      {() => (
        <box
          hexpand
          spacing={8}
          class="notifications-content"
          orientation={Gtk.Orientation.VERTICAL}
        >
          <For
            each={notifications((n) => [...n].sort((a, b) => b.time - b.time))}
          >
            {(n: AstalNotifd.Notification) => {
              return <NotificationCard data={n} />;
            }}
          </For>

          <box
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
