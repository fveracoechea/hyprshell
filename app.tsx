import app from "ags/gtk4/app";
import Bar from "./widget/Bar";
import { createBinding, For, This } from "ags";
import { exec } from "ags/process";

const style = exec("tailwindcss -i styles/main.css")
  .replace(/::backdrop.*?}\n{2}/s, "") // remove backdrop pseudoclass
  .replace(", ::before, ::after", "") // remove before & after psudoclasses
  .replace(", :host", "");

app.start({
  css: style,
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
