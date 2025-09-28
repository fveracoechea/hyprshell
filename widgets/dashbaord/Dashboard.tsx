import { exec } from "ags/process";
import { DashboardDropdown } from "./DashboardDropdown";

export function Dashboard() {
  const username = exec("whoami").trim();
  return (
    <menubutton>
      <box spacing={12}>
        <label label="󱄅" class="logo-icon" />
        <label label={username} class="username" />
      </box>
      <DashboardDropdown />
    </menubutton>
  );
}
