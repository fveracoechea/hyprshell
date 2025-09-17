import { Gtk } from "ags/gtk4";
import AstalNetwork from "gi://AstalNetwork";
import { execAsync } from "ags/process";
import { createBinding, createComputed } from "gnim";

const network = AstalNetwork.get_default();

export function Network() {
  const primarySignal = createBinding(network, "primary");
  const wiredSignal = createBinding(network, "wired");
  const wifiSignal = createBinding(network, "wifi");

  const tooltip = createComputed((get) => {
    const wifi = get(wifiSignal);
    const wired = get(wiredSignal);
    const primary = get(primarySignal);

    if (primary === AstalNetwork.Primary.WIRED && wired) {
      return ["Wired ethernet", `${wired.speed}Mbps`].join("\n");
    }

    if (wifi) {
      return [
        `WIFI`,
        `${wifi.ssid} (${Math.round(wifi.strength)}%)`,
      ].join("\n");
    }

    return "No network found";
  });

  return (
    <box>
      <button
        class="icon-button"
        halign={Gtk.Align.CENTER}
        tooltipText={tooltip}
        onClicked={() => {
          execAsync("ghostty --class=TUI.float -e impala");
        }}
      >
        {"󰀂"}
      </button>
    </box>
  );
}
