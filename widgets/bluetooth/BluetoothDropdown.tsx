import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import { Accessor, createBinding, createComputed, For, With } from "ags";

import AstalBluetooth from "gi://AstalBluetooth";
import { Dropdown } from "../../styles/components/Dropdown";

export function BluetoothDropdown() {
  const bluetooth = AstalBluetooth.get_default();
  const activeSignal = createBinding(bluetooth, "is_powered");
  const devicesSignal = createBinding(bluetooth, "devices").as(
    (devices: AstalBluetooth.Device[]) => devices.filter((d) => d.connected || d.paired),
  );

  return (
    <Dropdown
      icon="󰂯"
      name="Bluetooth"
      widthRequest={380}
      actions={(popover) => (
        <box spacing={8} valign={Gtk.Align.START} halign={Gtk.Align.END}>
          <box valign={Gtk.Align.START} halign={Gtk.Align.END}>
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
          <button
            class="icon-button"
            tooltipText="Open Bluetooth Settings"
            valign={Gtk.Align.START}
            onClicked={() => {
              popover.popdown();
              execAsync("blueberry");
            }}
          >
            <label label="󰒓" class="icon" />
          </button>
        </box>
      )}
    >
      {(popover) => (
        <box
          class="bluetooth-dropdown"
          hexpand
          spacing={8}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <With value={activeSignal}>
            {(active: boolean) => {
              if (!active) {
                return (
                  <label
                    class="disabled"
                    label="Bluetooth is disabled"
                    halign={Gtk.Align.CENTER}
                    valign={Gtk.Align.CENTER}
                  />
                );
              }

              return (
                <box hexpand spacing={8} orientation={Gtk.Orientation.VERTICAL}>
                  <For each={devicesSignal}>
                    {(device: AstalBluetooth.Device) => {
                      const connected = createBinding(device, "connected");
                      const paired = createBinding(device, "paired");

                      const status = createComputed([connected, paired], (c, p) => {
                        if (c) return "connected";
                        if (p) return "paired";
                        return "none";
                      });

                      const icon = createComputed([connected, paired], (c, p) => {
                        if (c) return "";
                        if (p) return "󱘖";
                        return "";
                      });

                      return (
                        <box spacing={16} hexpand class="bluetooth-device">
                          <image pixelSize={24} iconName={device.icon || ""} />
                          <label
                            hexpand
                            class={status((s) => `${s} name`)}
                            halign={Gtk.Align.START}
                            valign={Gtk.Align.CENTER}
                            label={device.name}
                            maxWidthChars={50}
                          />

                          <label
                            class={status((s) => `${s} icon`)}
                            label={icon}
                            valign={Gtk.Align.END}
                            tooltipText={status}
                          />
                        </box>
                      );
                    }}
                  </For>
                </box>
              );
            }}
          </With>
        </box>
      )}
    </Dropdown>
  );
}
