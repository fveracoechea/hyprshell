import { Gtk } from "ags/gtk4";
import { createPoll } from "ags/time";

export function Calendar() {
  const time = createPoll("", 1000 * 10, `date +"%I:%M %p"`);
  const date = createPoll("", 1000 * 60 * 60, `date +"%A, %B %d"`);
  return (
    <menubutton class="button">
      <box spacing={12}>
        <label label={time} class="text-primary" />
        <label label={date} class="text-primary" />
      </box>
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}
