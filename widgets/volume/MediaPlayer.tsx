import { Accessor, createBinding, createComputed, With } from "ags";
import { Gtk } from "ags/gtk4";

import { Dropdown } from "../../styles/components/Dropdown";

import Wp from "gi://AstalWp";
import Pango from "gi://Pango";
import Mpris from "gi://AstalMpris";

export function MediaPlayer({ player }: { player: Mpris.Player }) {
  const playbackStatus = createBinding(player, "playbackStatus");

  const playerName = createBinding(player, "identity");
  const available = createBinding(player, "available");
  const artist = createBinding(player, "artist");
  const title = createBinding(player, "title");
  const album = createBinding(player, "album");
  const loopStatus = createBinding(player, "loop_status");
  const shuffleStatus = createBinding(player, "shuffle_status");

  const loopStatusText = createComputed([loopStatus], (status) => {
    if (status === Mpris.Loop.NONE) return "Not Looping";
    if (status === Mpris.Loop.TRACK) return "Looping Track";
    if (status === Mpris.Loop.PLAYLIST) return "Looping Playlist";
    return "Unsupported";
  });

  const loopIcon = createComputed([loopStatus], (status) => {
    if (status === Mpris.Loop.NONE) return "󰑗";
    if (status === Mpris.Loop.TRACK) return "󰕇";
    if (status === Mpris.Loop.PLAYLIST) return "󰑘";
    return "";
  });

  const shuffleStatusText = createComputed([shuffleStatus], (status) => {
    if (status === Mpris.Shuffle.ON) return "Shuffling";
    if (status === Mpris.Shuffle.OFF) return "Not Shuffling";
    return "Unsupported";
  });

  const shuffleIcon = createComputed([shuffleStatus], (status) => {
    if (status === Mpris.Shuffle.ON) return "󰒟";
    if (status === Mpris.Shuffle.OFF) return "󰒞";
    return "";
  });

  const canDisplay = createComputed(
    [available, artist, title],
    (...args) => args.every(Boolean),
  );

  return (
    <box $type="named" name={playerName} class="media-player">
      <With value={canDisplay}>
        {(display) =>
          !display
            ? (
              <box
                hexpand
                class="placeholder"
                halign={Gtk.Align.CENTER}
                valign={Gtk.Align.CENTER}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={4}
              >
                <label label="󰝛" class="icon" />
                <label label="No media playing" />
              </box>
            )
            : (
              <box
                spacing={4}
                marginTop={2}
                orientation={Gtk.Orientation.VERTICAL}
              >
                <label
                  class="album"
                  halign={Gtk.Align.CENTER}
                  label={album}
                />

                <label
                  class="title"
                  label={title}
                  halign={Gtk.Align.CENTER}
                  ellipsize={Pango.EllipsizeMode.END}
                />

                <label
                  class="artist"
                  label={artist}
                  halign={Gtk.Align.CENTER}
                  ellipsize={Pango.EllipsizeMode.END}
                />

                <box
                  hexpand
                  spacing={8}
                  marginTop={4}
                  halign={Gtk.Align.CENTER}
                >
                  <button
                    class="icon-button-md"
                    tooltipText="Previous"
                    onClicked={() => player.previous()}
                    visible={createBinding(player, "can_go_previous")}
                  >
                    <label label="󰒮" />
                  </button>
                  <button
                    class="icon-button-md"
                    tooltipText={shuffleStatusText}
                    onClicked={() => player.shuffle()}
                    visible={shuffleStatusText.as((t) => t !== "Unsupported")}
                  >
                    <label label={shuffleIcon} />
                  </button>
                  <button
                    class="icon-button-md"
                    tooltipText="Play/Pause"
                    valign={Gtk.Align.CENTER}
                    onClicked={() => player.play_pause()}
                  >
                    <label
                      label={playbackStatus.as((status) =>
                        status === Mpris.PlaybackStatus.PLAYING ? "" : ""
                      )}
                    />
                  </button>
                  <button
                    class="icon-button-md"
                    tooltipText={loopStatusText}
                    onClicked={() => player.loop()}
                    visible={loopStatusText.as((t) => t !== "Unsupported")}
                  >
                    <label label={loopIcon} />
                  </button>
                  <button
                    class="icon-button-md"
                    tooltipText="Next"
                    onClicked={() => player.next()}
                    visible={createBinding(player, "can_go_next")}
                  >
                    <label label="󰒭" />
                  </button>
                </box>
              </box>
            )}
      </With>
    </box>
  );
}
