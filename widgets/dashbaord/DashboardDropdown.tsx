import { Gtk } from "ags/gtk4";
import { Dropdown } from "../../styles/components/Dropdown";
import { fileExists, normalizeToAbsolutePath } from "../../utils/file";
import { Accessor } from "ags";
import { execAsync } from "ags/process";

type ActionButtonProps = {
  type: "Shutdown" | "Restart" | "Logout" | "Sleep";
  onClicked?: () => void;
};

const ButtonIcons: Record<ActionButtonProps["type"], string> = {
  Shutdown: "󰐥",
  Restart: "󰜉",
  Logout: "󰍃",
  Sleep: "󰤄",
};

const ButtonActions: Record<ActionButtonProps["type"], () => void> = {
  Shutdown() {
    execAsync("systemctl poweroff").catch((e) => console.log(e));
  },
  Restart() {
    execAsync("systemctl reboot").catch((e) => console.log(e));
  },
  Logout() {
    execAsync("hyprctl dispatch exit").catch((e) => console.log(e));
  },
  Sleep() {
    execAsync("systemctl suspend").catch((e) => console.log(e));
  },
};

function ActionButton(props: ActionButtonProps) {
  const { type, onClicked } = props;
  const action = ButtonActions[type];
  return (
    <button
      hexpand
      class={`${type} button`}
      onClicked={() => action()}
    >
      <box hexpand spacing={12}>
        <label
          class="icon"
          label={ButtonIcons[type]}
          halign={Gtk.Align.START}
        />
        <label
          hexpand
          class="label"
          label={type}
          halign={Gtk.Align.START}
          valign={Gtk.Align.CENTER}
        />
      </box>
    </button>
  );
}

export function DashboardDropdown() {
  const image = normalizeToAbsolutePath("~/.face.icon");
  return (
    <Dropdown>
      {() => {
        return (
          <box class="dashboard-dropdown" spacing={16} hexpand>
            {fileExists(image) && (
              <box class="profile">
                <box
                  class="face"
                  widthRequest={160}
                  heightRequest={160}
                  css={`background-image: url("file://${image}");`}
                />
              </box>
            )}
            <box
              hexpand
              spacing={8}
              class="system-actions"
              orientation={Gtk.Orientation.VERTICAL}
            >
              <ActionButton type="Shutdown" />
              <ActionButton type="Restart" />
              <ActionButton type="Logout" />
              <ActionButton type="Sleep" />
            </box>
          </box>
        );
      }}
    </Dropdown>
  );
}
