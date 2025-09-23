import AstalBluetooth from "gi://AstalBluetooth";
import { Accessor, createBinding, createComputed, createConnection, With } from "ags";
import { execAsync } from "ags/process";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { BluetoothDropdown } from "./BluetoothDropdown";

export function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const devicesSignal = createBinding(bluetooth, "devices");
  const isConnectedSignal = createBinding(bluetooth, "is_connected");
  const iconSignal = isConnectedSignal.as((v) => (v ? "󰂯" : "󰂲"));

  return (
    <box>
      <menubutton class="icon-button" halign={Gtk.Align.CENTER}>
        <With value={iconSignal}>{(icon) => <label label={icon} />}</With>
        <BluetoothDropdown />
      </menubutton>
    </box>
  );
}
