import { Gtk } from "ags/gtk4";
import AstalWp from "gi://AstalWp";
import { createBinding } from "gnim";

function logObject(o: any) {
  if (typeof o !== "object" || o === null) console.log("Not An Object");
  for (const v in o) {
    if (o[v]) {
      console.log(v, typeof o[v]);
    }
  }
}

const Wp = AstalWp.get_default();
const speaker = Wp.audio.defaultSpeaker;
export function VolumeSliders() {
  const mic = Wp.audio.default_microphone;

  logObject(speaker);

  return (
    <box spacing={10} orientation={Gtk.Orientation.VERTICAL}>
      <box>
        <slider
          hexpand
          value={createBinding(speaker, "volume")}
          onChangeValue={(self) => speaker.set_volume(self.value)}
        />
      </box>
    </box>
  );
}
