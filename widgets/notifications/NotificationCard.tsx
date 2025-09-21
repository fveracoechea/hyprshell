import { Gtk } from "ags/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import Pango from "gi://Pango";
import GLib from "gi://GLib";
import { Accessor } from "ags";
import { formatTime, time } from "./utils";
import { logObject } from "../../utils/log";

function fileExists(path: string) {
  return GLib.file_test(path, GLib.FileTest.EXISTS);
}

function NotificationIcon(props: { notification: AstalNotifd.Notification }) {
  const { notification } = props;

  if (notification.image && fileExists(notification.image)) {
    return (
      <image
        file={notification.image}
        overflow={Gtk.Overflow.HIDDEN}
        valign={Gtk.Align.CENTER}
      />
    );
  }

  if (notification.appIcon || notification.desktopEntry) {
    return (
      <image
        iconName={notification.appIcon || notification.desktopEntry}
        valign={Gtk.Align.CENTER}
      />
    );
  }

  return <label class="no-image" label="󰂚" />;
}

export const NotificationCardWidth = 500;

type NotificationCardProps = {
  data: AstalNotifd.Notification;
};

export function NotificationCard(props: NotificationCardProps) {
  const { data } = props;
  return (
    <box class="notification-card">
      <box class="icon-content">
        <NotificationIcon notification={data} />
      </box>

      <box orientation={Gtk.Orientation.VERTICAL} hexpand>
        <box
          hexpand
          spacing={4}
          orientation={Gtk.Orientation.VERTICAL}
          class="card-content"
        >
          <box
            hexpand
            spacing={16}
          >
            <label
              hexpand
              class="app"
              label={data.app_name}
              halign={Gtk.Align.START}
            />
            <label
              hexpand
              class="time"
              halign={Gtk.Align.END}
              label={time(data.time)}
            />
          </box>
          <label
            hexpand
            class="title"
            maxWidthChars={50}
            label={data.summary}
            halign={Gtk.Align.START}
            tooltipMarkup={data.summary}
            ellipsize={Pango.EllipsizeMode.END}
          />
          <label
            wrap
            class="body"
            label={data.body}
            visible={Boolean(data.body)}
            halign={Gtk.Align.START}
          />
        </box>

        <box class="actions" visible={false}>
          <button
            visible={false}
            class="button close-button"
            onClicked={() => data.dismiss()}
          >
            <label class="label" label="Dismiss" />
            <label class="icon" label="" />
          </button>
        </box>
      </box>
    </box>
  );
}
