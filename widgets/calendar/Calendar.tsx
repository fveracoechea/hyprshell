import { Gtk } from "ags/gtk4";
import { createPoll } from "ags/time";
import { Dropdown } from "../../styles/components/Dropdown";

export function Calendar() {
  const time = createPoll("", 1000 * 10, `date +"%I:%M %p"`);
  const date = createPoll("", 1000 * 60 * 60, `date +"%A, %B %d"`);
  return (
    <menubutton class="button">
      <box spacing={12}>
        <label label={time} class="time-label" />
        <label label={date} class="date-label" />
      </box>
      <Dropdown>{() => <Gtk.Calendar hexpand />}</Dropdown>
    </menubutton>
  );
}
