import { Dropdown } from "../../styles/components/Dropdown";

const width = 400;
const height = 250;

export function VolumeDropdown() {
  return (
    <Dropdown
      icon=""
      name="Volume"
      widthRequest={width}
      heightRequest={height}
      actions={
        <box spacing={8}>
        </box>
      }
    >
      <label label="Volume control content goes here" />
    </Dropdown>
  );
}
