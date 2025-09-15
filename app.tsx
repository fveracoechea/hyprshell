import app from "ags/gtk4/app";
import Bar from "./widgets/bar/Bar";
import { createBinding, For, This } from "ags";
import css from "styles/main.scss";
import { BluetoothDropdown } from "./widgets/bluetooth/BluetoothDropdown";

function main() {
  const monitors = createBinding(app, "monitors");
  return (
    <For each={monitors}>
      {(monitors) => (
        <This this={app}>
          <BluetoothDropdown />
          <Bar gdkmonitor={monitors} />
        </This>
      )}
    </For>
  );
}

app.start({ css, main });
