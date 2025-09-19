import { Dropdown } from "../../styles/components/Dropdown";

export function NotificationsDropdown() {
  return (
    <Dropdown icon="󰂚" name="Notifications">
      {() => (
        <box widthRequest={500}>
          <label label="Notifications content" />
        </box>
      )}
    </Dropdown>
  );
}
