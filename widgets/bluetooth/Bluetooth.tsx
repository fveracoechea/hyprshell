import AstalBluetooth from "gi://AstalBluetooth";
import {
  Accessor,
  createBinding,
  createComputed,
  createConnection,
  With,
} from "ags";

export function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();

  const devicesSignal = createBinding(bluetooth, "devices");
  const isConnectedSignal = createBinding(bluetooth, "is_connected");
  const iconSignal = isConnectedSignal.as((v) => v ? "󰂯" : "󰂲");

  const tooltip = createComputed((get) => {
    const connected: boolean = get(isConnectedSignal);
    const devices: AstalBluetooth.Devices[] = get(devicesSignal);

    if (!connected) return "Bluetooth: Disconnected";

    let count = 0;
    for (const device of devices) {
      if (device.connected) count++;
    }
    return `Bluetooth: ${count} connected`;
  });

  return (
    <box>
      <With value={iconSignal}>
        {(icon) => (
          <button tooltipText={tooltip} class="icon-button">
            {icon}
          </button>
        )}
      </With>
    </box>
  );
}
