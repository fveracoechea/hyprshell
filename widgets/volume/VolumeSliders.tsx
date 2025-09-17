import { Gtk } from "ags/gtk4";
import AstalWp from "gi://AstalWp";
import { createBinding, createComputed, createConnection } from "gnim";
import { logObject } from "../../utils/log";
import Pango from "gi://Pango";

type SliderProps = { device: AstalWp.Device; icon: string };

function Slider(props: SliderProps) {
  const { icon, device } = props;
  const volume = createBinding(device, "volume");
  const speakerName = createBinding(device, "description").as((d) =>
    d ?? "Unknown Speaker"
  );
  return (
    <box
      hexpand
      class="sliders"
      spacing={4}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label
        class="device-name"
        halign={Gtk.Align.START}
        label={speakerName}
        hexpand
        maxWidthChars={40}
        ellipsize={Pango.EllipsizeMode.END}
      />
      <box spacing={18} hexpand>
        <label class="icon" label={icon} />
        <slider
          hexpand
          step={5}
          value={volume}
          class="media-slider"
          valign={Gtk.Align.CENTER}
          onChangeValue={(self) => device.set_volume(self.value)}
        />
        <label
          class="label"
          label={volume.as((v) => `${(v * 100).toFixed(0)}%`)}
        />
      </box>
    </box>
  );
}

export function VolumeSliders() {
  const Wp = AstalWp.get_default();
  const speaker = Wp.audio.defaultSpeaker;
  const mic = Wp.audio.default_microphone;
  return (
    <box
      spacing={8}
      hexpand
      orientation={Gtk.Orientation.VERTICAL}
    >
      <Slider device={speaker} icon="" />
      <Slider device={mic} icon="" />
    </box>
  );
}
