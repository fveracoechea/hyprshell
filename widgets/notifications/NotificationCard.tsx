import { Gtk } from "ags/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import Pango from "gi://Pango";
import GLib from "gi://GLib";
import { Accessor } from "ags";
import { time } from "./utils";
import { logObject } from "../../utils/log";

function fileExists(path: string) {
  return GLib.file_test(path, GLib.FileTest.EXISTS);
}

function NotificationIcon(props: { notification: AstalNotifd.Notification }) {
  const { notification } = props;

  if (notification.image && fileExists(notification.image)) {
    return (
      <box class="icon-content" valign={Gtk.Align.START}>
        <image
          class="app-icon"
          file={notification.image}
          overflow={Gtk.Overflow.HIDDEN}
        />
      </box>
    );
  }

  if (notification.appIcon || notification.desktopEntry) {
    return (
      <box class="icon-content" valign={Gtk.Align.START}>
        <image
          class="app-icon"
          iconName={notification.appIcon || notification.desktopEntry}
        />
      </box>
    );
  }

  return <label class="no-image" label="󰂜" valign={Gtk.Align.START} />;
}

type NotificationCardProps = {
  popover: Gtk.Popover;
  data: AstalNotifd.Notification;
};

export function NotificationCard(props: NotificationCardProps) {
  const { data, popover } = props;
  const action = data.actions?.at(0) as AstalNotifd.Action | undefined;

  let className = "notification-card";
  if (action) className += " clickable";
  if (data.urgency === AstalNotifd.Urgency.CRITICAL) className += " urgent";

  return (
    <box spacing={0}>
      <button
        class={className}
        onClicked={(source) => {
          if (!action) return;
          popover.popdown();
          data.invoke(action.id);
        }}
      >
        <box>
          <NotificationIcon notification={data} />
          <box
            hexpand
            spacing={4}
            orientation={Gtk.Orientation.VERTICAL}
            class="card-content"
          >
            <box
              hexpand
              spacing={8}
              class="header"
            >
              <label
                hexpand
                class="app"
                label={data.app_name}
                halign={Gtk.Align.START}
                valign={Gtk.Align.CENTER}
              />
              <label
                class="time"
                halign={Gtk.Align.END}
                valign={Gtk.Align.CENTER}
                label={time(data.time)}
              />
            </box>
            <label
              hexpand
              class="title"
              maxWidthChars={50}
              label={data.summary}
              halign={Gtk.Align.START}
              ellipsize={Pango.EllipsizeMode.END}
            />
            <label
              class="body"
              hexpand
              wrap
              lines={5}
              justify={Gtk.Justification.LEFT}
              maxWidthChars={50}
              ellipsize={Pango.EllipsizeMode.END}
              label={data.body}
              halign={Gtk.Align.START}
              visible={Boolean(data.body)}
            />
          </box>
        </box>
      </button>

      <button
        class="icon-button close-button"
        halign={Gtk.Align.END}
        valign={Gtk.Align.START}
        onClicked={() => console.log("dismiss")}
      >
        {""}
      </button>
    </box>
  );
}
