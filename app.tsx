import app from "ags/gtk4/app";
import Bar from "./widgets/bar/Bar";
import { createBinding, For, This } from "ags";
import css from "./styles/main.scss";

app.start({
  css,
  main() {
    const monitors = createBinding(app, "monitors");
    return (
      <For each={monitors}>
        {(monitors) => (
          <This this={app}>
            <Bar gdkmonitor={monitors} />
          </This>
        )}
      </For>
    );
  },
});
