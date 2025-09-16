import { Accessor, createBinding, createComputed, createState, For } from "ags";
import { Gtk } from "ags/gtk4";

import { Dropdown } from "../../styles/components/Dropdown";

import Wp from "gi://AstalWp";
import Pango from "gi://Pango";
import Mpris from "gi://AstalMpris";
import { MediaPlayer, Spotify } from "./MediaPlayer";
import { execAsync } from "ags/process";

const width = 420;
const height = 250;

export function VolumeDropdown() {
  const Media = Mpris.get_default();
  const players = createBinding(Media, "players");
  const [activePlayer, setActivePlayer] = createState(
    Media.players[0].identity,
  );

  const stackClassNames = createComputed(
    [activePlayer, players],
    (active, all) => {
      return all[0].identity === active ? "" : "rounded-top-left";
    },
  );

  return (
    <Dropdown
      icon=""
      name="Media"
      widthRequest={width}
      actions={
        <box spacing={8}>
        </box>
      }
    >
      {(popover) => (
        <box hexpand orientation={Gtk.Orientation.VERTICAL} spacing={10}>
          <box class="tabs" orientation={Gtk.Orientation.VERTICAL}>
            <box>
              <For each={players}>
                {(player: Mpris.Player) => (
                  <button
                    class={activePlayer.as((p) =>
                      p === player.identity ? "tab active" : "tab"
                    )}
                    onClicked={() => setActivePlayer(player.identity)}
                  >
                    {player.identity}
                  </button>
                )}
              </For>
            </box>
            <stack
              class={stackClassNames}
              visibleChildName={activePlayer}
              transitionDuration={250}
              transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
            >
              <For each={players}>
                {(player: Mpris.Player) => <MediaPlayer player={player} />}
              </For>
            </stack>
          </box>

          <button
            class="button-md"
            marginTop={8}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.END}
            onClicked={() => {
              popover.popdown();
              execAsync("ghostty --class=Wiremix -e wiremix");
            }}
          >
            <box spacing={10}>
              <label label="󰒓" class="icon" />
              <label label="Settings" />
            </box>
          </button>
        </box>
      )}
    </Dropdown>
  );
}
