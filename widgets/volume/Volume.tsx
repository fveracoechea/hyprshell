import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";
import AstalWp from "gi://AstalWp";
import { createBinding, createComputed } from "ags";

const step = 5;

export function Volume() {
  const Wp = AstalWp.get_default();
  const speaker = Wp.defaultSpeaker;
  const volumeSignal = createBinding(speaker, "volume");

  const scrollController = new Gtk.EventControllerScroll({
    flags: Gtk.EventControllerScrollFlags.BOTH_AXES,
  });

  function buttonInit(self: Gtk.Button) {
    self.add_controller(scrollController);
    scrollController.connect("scroll", (c, dx, dy) => {
      const multp = dy < 0 ? 1 : -1;
      const newVolume = Math.min(speaker.volume + ((step / 100) * multp), 1);
      speaker.set_volume(newVolume);
    });
  }

  const tooltipText = createComputed((get) => {
    const vol = get(volumeSignal);
    return `Volume\n${Math.round(vol * 100)}%`;
  });

  return (
    <box>
      <button
        $={buttonInit}
        tooltipText={tooltipText}
        class="icon-button"
        halign={Gtk.Align.CENTER}
        // onClicked={() => {
        //   execAsync("ghostty --class=Wiremix -e wiremix");
        // }}
      >
        {""}
      </button>
    </box>
  );
}
