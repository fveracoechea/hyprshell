import { Gtk } from "ags/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import Pango from "gi://Pango";
import GLib from "gi://GLib";

function fileExists(path: string) {
  return GLib.file_test(path, GLib.FileTest.EXISTS);
}

type NotificationCardProps = {
  data: AstalNotifd.Notification;
};

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

export function NotificationCard(props: NotificationCardProps) {
  const { data } = props;
  return (
    <box
      widthRequest={400}
      class="notification-card"
    >
      <box class="icon-content">
        <NotificationIcon notification={data} />
      </box>

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
            class="label"
            label={data.app_name}
            halign={Gtk.Align.START}
          />
          <label
            hexpand
            class="label"
            halign={Gtk.Align.END}
            label={String(data.time)}
          />
          <button
            class="icon-button close-button"
            onClicked={() => data.dismiss()}
          >
            {"󰅖"}
          </button>
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
          maxWidthChars={50}
          label={data.body}
          visible={Boolean(data.body)}
          halign={Gtk.Align.START}
          ellipsize={Pango.EllipsizeMode.END}
        />
      </box>
    </box>
  );
}
