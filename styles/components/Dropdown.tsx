import { createState, State, With } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import Graphene from "gi://Graphene";
import app from "ags/gtk4/app";

type DropdownContentProps = {
  name: string;
  icon: string;
  children: (popover: Gtk.Popover) => JSX.Element;
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

  const [popover, setPopover] = createState(null) as State<Gtk.Popover | null>;

  return (
    <popover $={(self) => setPopover(self)} class="dropdown">
      <box
        name={name}
        orientation={Gtk.Orientation.VERTICAL}
        widthRequest={widthRequest}
        heightRequest={heightRequest}
        class="dropdown-contents"
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
            widthRequest={widthRequest}
            heightRequest={heightRequest}
          >
            <With
              value={popover}
              children={(value) => {
                if (value) return children(value);
                return <box />;
              }}
            />
          </box>
        </box>
      </box>
    </popover>
  );
}
