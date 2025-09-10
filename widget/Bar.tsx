import app from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { exec } from "ags/process";
import { Calendar, Time } from "./Calendar";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  const username = exec("whoami").trim();

  return (
    <window
      visible
      name="bar"
      class="bg-base pt-2 pb-2 pl-10 pr-10"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start" spacing={12}>
          <label label="󱄅" class="text-primary text-2xl" />
          <label label={username} class="text-secondary" />
        </box>

        <box $type="center" spacing={12}>
          <Time />
          <Calendar />
        </box>
      </centerbox>
    </window>
  );
}
