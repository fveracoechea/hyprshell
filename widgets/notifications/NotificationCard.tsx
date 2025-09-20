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

  return <box class="no-image" />;
}

export function NotificationCard(props: NotificationCardProps) {
  const { data } = props;
  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
      class="notification-card"
    >
      <box>
        <NotificationIcon notification={data} />
      </box>

      <label label={data.app_name} />

      <label
        maxWidthChars={40}
        wrap
        halign={Gtk.Align.START}
        label={data.summary}
        tooltipMarkup={data.summary}
        ellipsize={Pango.EllipsizeMode.END}
      />

      {data.body && (
        <label
          wrap
          class="text-sm"
          maxWidthChars={30}
          label={data.body}
          halign={Gtk.Align.START}
          ellipsize={Pango.EllipsizeMode.END}
        />
      )}

      <button
        class="icon-button close-button"
        onClicked={() => data.dismiss()}
      >
        {"󰅖"}
      </button>
    </box>
  );
}
