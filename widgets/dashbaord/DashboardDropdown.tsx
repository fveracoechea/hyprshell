import { Gtk } from "ags/gtk4";
import { Dropdown } from "../../styles/components/Dropdown";
import { fileExists, normalizeToAbsolutePath } from "../../utils/file";

export function DashboardDropdown() {
  return (
    <Dropdown>
      {() => {
        const image = fileExists(normalizeToAbsolutePath("~/.face.icon"))
          ? (
            <image
              class="face"
              file={normalizeToAbsolutePath("~/.face.icon")}
            />
          )
          : <image class="fallback" iconName="preferences-desktop" />;

        return (
          <box class="dashboard-dropdown" spacing={8} hexpand>
            <box class="profile">{image}</box>
            <box
              hexpand
              spacing={12}
              class="system-actions"
              orientation={Gtk.Orientation.VERTICAL}
            >
              <button hexpand class="shutdown button">
                <label valign={Gtk.Align.START} hexpand label="󰐥  Shutdown" />
              </button>
              <button hexpand class="restart button">
                <label valign={Gtk.Align.START} hexpand label="󰜉  Restart" />
              </button>
              <button hexpand class="logout button">
                <label valign={Gtk.Align.START} hexpand label="󰗽  Logout" />
              </button>
              <button hexpand class="sleep button">
                <label valign={Gtk.Align.START} hexpand label="󰤄  Sleep" />
              </button>
            </box>
          </box>
        );
      }}
    </Dropdown>
  );
}
