import { createBinding, For, Setter } from "ags";
import { Gtk } from "ags/gtk4";
import AstalBluetooth from "gi://AstalBluetooth";
import { Dropdown, DropdownContent } from "../../styles/components/Dropdown";
import Adw from "gi://Adw?version=1";
import { execAsync } from "ags/process";
import app from "ags/gtk4/app";

const width = 600;
const height = 300;

export function BluetoothDropdown() {
  const bluetooth = AstalBluetooth.get_default();
  const devicesSignal = createBinding(bluetooth, "devices");
  return (
    <Dropdown windowName="bluetooth-dropdown">
      <DropdownContent
        widthRequest={width}
        name="Bluetooth"
        icon="󰂯"
        actions={
          <box spacing={8}>
            <button
              class="icon-button"
              tooltipText="Open Bluetooth settings"
              valign={Gtk.Align.CENTER}
              onClicked={() => {
                app.toggle_window("bluetooth-dropdown");
                execAsync("blueberry");
              }}
            >
              {"󰒓"}
            </button>
            <switch heightRequest={4} valign={Gtk.Align.CENTER} />
          </box>
        }
      >
        <box
          class="bluetooth-dropdown"
          hexpand
          spacing={8}
          valign={Gtk.Align.START}
          halign={Gtk.Align.START}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <scrolledwindow widthRequest={width} heightRequest={300}>
            <box vexpand spacing={8} orientation={Gtk.Orientation.VERTICAL}>
              <For each={devicesSignal}>
                {(device: AstalBluetooth.Device) => (
                  <box spacing={16} hexpand class="bluetooth-device">
                    <image pixelSize={24} iconName={device.icon || ""} />
                    <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                      <label
                        class={device.connected
                          ? "device-name connected"
                          : "device-name"}
                        label={device.name}
                        xalign={0}
                      />
                      <label
                        xalign={0}
                        class="status"
                        label={device.connected
                          ? "Connected"
                          : device.paired
                          ? "paired"
                          : ""}
                      />
                    </box>

                    {!device.connected && device.paired &&
                      (
                        <button
                          class="icon-button"
                          tooltipText="Coonnect Device"
                          valign={Gtk.Align.START}
                          halign={Gtk.Align.END}
                          onClicked={() => device.connect_device()}
                        >
                          {"󱘖"}
                        </button>
                      )}

                    {device.connected && device.paired && (
                      <button
                        class="icon-button"
                        tooltipText="Disconnect Device"
                        valign={Gtk.Align.START}
                        halign={Gtk.Align.END}
                        onClicked={() => device.disconnect_device()}
                      >
                        {"󰂲"}
                      </button>
                    )}
                  </box>
                )}
              </For>
            </box>
          </scrolledwindow>
        </box>
      </DropdownContent>
    </Dropdown>
  );
}
