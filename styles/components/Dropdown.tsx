import { createState } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import Graphene from "gi://Graphene";
import app from "ags/gtk4/app";

type DropdownContentProps = {
  name: string;
  icon: string;
  children?: JSX.Element;
  widthRequest?: number;
  heightRequest?: number;
  actions?: JSX.Element;
};

export function Dropdown(props: DropdownContentProps) {
  const {
    actions,
    children,
    name,
    icon,
    widthRequest,
    heightRequest,
  } = props;
  return (
    <box
      name={name}
      class="dropdown"
      orientation={Gtk.Orientation.VERTICAL}
      widthRequest={widthRequest}
      heightRequest={heightRequest}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box spacing={8} class="dropdown-header" hexpand>
          <box spacing={12} hexpand>
            <label class="dropdown-icon" label={icon} />
            <label class="dropdown-title" label={name} />
          </box>

          {actions}
        </box>

        <box
          class="dropdown-content"
          widthRequest={widthRequest}
          heightRequest={heightRequest}
        >
          {children}
        </box>
      </box>
    </box>
  );
}
