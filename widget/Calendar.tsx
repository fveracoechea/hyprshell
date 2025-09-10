import { Gtk } from "ags/gtk4";
import { createPoll } from "ags/time";

export function Time() {
  const time = createPoll("", 5000, `date +"%I:%M %p"`);
  return (
    <button class="bg-transparent text-text">
      <label label={time} />
    </button>
  );
}

export function Calendar() {
  const date = createPoll("", 1000 * 60, `date +"%A, %B %d"`);
  return (
    <menubutton class="">
      <label label={date} class="bg-transparent text-text" />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}
