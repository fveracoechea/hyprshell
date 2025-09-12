import app from "ags/gtk4/app";
import { Astal, Gdk } from "ags/gtk4";
import { exec } from "ags/process";
import { Calendar } from "../calendar/Calendar";
import { onCleanup } from "ags";
import { SysTray } from "../systray/SysTray";
import { Workspaces } from "../workspaces/Workspaces";
import { Notifications } from "../notifications/Notifications";

type BarProps = { gdkmonitor: Gdk.Monitor };

export default function Bar(props: BarProps) {
  const { gdkmonitor } = props;

  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  const username = exec("whoami").trim();

  return (
    <window
      $={(self) => onCleanup(() => self.destroy())}
      visible
      name="bar"
      class="shell-bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start" spacing={28}>
          <box spacing={12}>
            <label label="󱄅" class="logo-icon" />
            <label
              label={username}
              class="username"
            />
          </box>
          <Workspaces />
          <Notifications />
        </box>

        <box $type="center">
          <Calendar />
        </box>

        <box $type="end">
          <SysTray />
        </box>
      </centerbox>
    </window>
  );
}
