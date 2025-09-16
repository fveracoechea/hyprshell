import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import { createBinding, For, With } from "ags";

import AstalBluetooth from "gi://AstalBluetooth";
import { Dropdown, DropdownContent } from "../../styles/components/Dropdown";

const width = 400;
const height = 250;

export function BluetoothDropdown() {
  const bluetooth = AstalBluetooth.get_default();
  const devicesSignal = createBinding(bluetooth, "devices");
  const activeSignal = createBinding(bluetooth, "is_powered");
  return (
    <Dropdown windowName="bluetooth-dropdown">
      <DropdownContent
        widthRequest={width}
        name="Bluetooth"
        icon="󰂯"
        actions={
          <box spacing={8}>
            <switch
              active={activeSignal}
              heightRequest={4}
              valign={Gtk.Align.CENTER}
              $={(self) => {
                self.connect("notify::active", () => {
                  bluetooth.adapter?.set_powered(self.active);
                });
              }}
            />
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
          <scrolledwindow widthRequest={width} heightRequest={height}>
            <With value={activeSignal}>
              {(active: boolean) =>
                active
                  ? (
                    <box
                      vexpand
                      spacing={8}
                      orientation={Gtk.Orientation.VERTICAL}
                    >
                      <For each={devicesSignal}>
                        {(device: AstalBluetooth.Device) => (
                          <box spacing={16} hexpand class="bluetooth-device">
                            <image
                              pixelSize={24}
                              iconName={device.icon || ""}
                            />
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
                  )
                  : (
                    <label
                      class="disabled"
                      label="Bluetooth is disabled"
                      halign={Gtk.Align.CENTER}
                      valign={Gtk.Align.CENTER}
                    />
                  )}
            </With>
          </scrolledwindow>

          <button
            class="button"
            marginTop={8}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.END}
            onClicked={() => {
              app.toggle_window("bluetooth-dropdown");
              execAsync("blueberry");
            }}
          >
            <box spacing={10}>
              <label label="󰒓" />
              <label label="Settings" />
            </box>
          </button>
        </box>
      </DropdownContent>
    </Dropdown>
  );
}
