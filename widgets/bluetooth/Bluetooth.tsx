import AstalBluetooth from "gi://AstalBluetooth";
import {
  Accessor,
  createBinding,
  createComputed,
  createConnection,
  createState,
  State,
  With,
} from "ags";
import { execAsync } from "ags/process";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { BluetoothDropdown } from "./BluetoothDropdown";

export function Bluetooth() {
  const [popover, setPopover] = createState(null) as State<Gtk.Popover | null>;
  const bluetooth = AstalBluetooth.get_default();

  const devicesSignal = createBinding(bluetooth, "devices");
  const isConnectedSignal = createBinding(bluetooth, "is_connected");
  const iconSignal = isConnectedSignal.as((v) => v ? "󰂯" : "󰂲");

  const tooltip = createComputed((get) => {
    const connected: boolean = get(isConnectedSignal);
    const devices: AstalBluetooth.Devices[] = get(devicesSignal);

    if (!connected) return "Bluetooth disconnected";

    let count = 0;
    for (const device of devices) {
      if (device.connected) count++;
    }
    return `Bluetooth\n${count} connected`;
  });

  return (
    <box>
      <menubutton
        class="icon-button"
        tooltipText={tooltip}
        halign={Gtk.Align.CENTER}
      >
        <With value={iconSignal}>
          {(icon) => <label label={icon} />}
        </With>
        <popover $={(self) => setPopover(self)} class="dropdown">
          <BluetoothDropdown popover={popover} />
        </popover>
      </menubutton>
    </box>
  );
}
