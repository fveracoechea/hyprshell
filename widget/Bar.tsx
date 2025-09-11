import app from "ags/gtk4/app";
import { Astal, Gdk } from "ags/gtk4";
import { exec } from "ags/process";
import { Calendar } from "./Calendar";
import { onCleanup } from "ags";
import { SysTray } from "./SysTray";
import { Workspaces } from "./Workspaces";

type BarProps = { gdkmonitor: Gdk.Monitor };

export default function Bar(props: BarProps) {
  const { gdkmonitor } = props;

  let win: Astal.Window;
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  const username = exec("whoami").trim();

  onCleanup(() => {
    // Root components (windows) are not automatically destroyed.
    // When the monitor is disconnected from the system, this callback
    // is run from the parent <For> which allows us to destroy the window
    win.destroy();
  });

  return (
    <window
      $={(self) => (win = self)}
      visible
      name="bar"
      class="shell-bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start" spacing={30}>
          <box spacing={12}>
            <label label="󱄅" class="text-primary text-2xl" />
            <label
              label={username}
              class="text-secondary font-semibold uppercase"
            />
          </box>
          <SysTray />
        </box>

        <box $type="center">
          <Calendar />
        </box>

        <box $type="end">
          <Workspaces />
        </box>
      </centerbox>
    </window>
  );
}
