import { Accessor, createBinding, createComputed, createState, For } from "ags";
import { Gtk } from "ags/gtk4";

import { Dropdown } from "../../styles/components/Dropdown";

import Mpris from "gi://AstalMpris";
import { MediaPlayer } from "./MediaPlayer";
import { execAsync } from "ags/process";
import { VolumeSliders } from "./VolumeSliders";

const width = 420;
const height = 250;

function MediaTabs() {
  const Media = Mpris.get_default();
  const players = createBinding(Media, "players").as((p) => p ?? []);

  const hasPlayers = createComputed([players], (p) => p.length > 0);

  const [activePlayer, setActivePlayer] = createState(
    Media.players.at(0)?.identity ?? null,
  );

  const stackClassNames = createComputed(
    [activePlayer, players],
    (active, all) => {
      const first = all.at(0)?.identity ?? null;
      return first === active ? "" : "rounded-top-left";
    },
  );

  return (
    <box
      class="tabs"
      visible={hasPlayers}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <box>
        <For each={players}>
          {(player: Mpris.Player) => (
            <button
              onClicked={() => setActivePlayer(player.identity)}
              class={activePlayer.as((p) =>
                p === player.identity ? "tab active" : "tab"
              )}
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
  );
}

export function VolumeDropdown() {
  return (
    <Dropdown
      icon=""
      name="Media"
      widthRequest={width}
    >
      {(popover) => (
        <box hexpand orientation={Gtk.Orientation.VERTICAL} spacing={10}>
          <MediaTabs />
          <VolumeSliders />
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
