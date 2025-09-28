import app from "ags/gtk4/app";
import { Astal, Gdk } from "ags/gtk4";
import { Calendar } from "../calendar/Calendar";
import { onCleanup } from "ags";
import { SysTray } from "../systray/SysTray";
import { Volume } from "../volume/Volume";
import { Network } from "../network/Network";
import { Workspaces } from "../workspaces/Workspaces";
import { Notifications } from "../notifications/Notifications";
import { Bluetooth } from "../bluetooth/Bluetooth";
import { Performance } from "../performance/Performance";
import { Dashboard } from "../dashbaord/Dashboard";

type BarProps = { gdkmonitor: Gdk.Monitor };

export default function Bar(props: BarProps) {
  const { gdkmonitor } = props;
  const { TOP } = Astal.WindowAnchor;

  return (
    <window
      $={(self) => onCleanup(() => self.destroy())}
      visible
      name="bar"
      class="shell-bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.TOP}
      keymode={Astal.Keymode.NONE}
      anchor={TOP}
      application={app}
      margin={0}
    >
      <centerbox cssName="centerbox">
        <box $type="start" spacing={28}>
          <Dashboard />
          <Workspaces />
        </box>

        <box $type="center">
          <Calendar />
        </box>

        <box $type="end" spacing={28}>
          <box>
            <SysTray />
            <Notifications />
            <Volume />
            <Network />
            <Bluetooth />
            <Performance />
          </box>
        </box>
      </centerbox>
    </window>
  );
}
