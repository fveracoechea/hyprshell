import { type Accessor, createState, onCleanup, type Setter } from "ags";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import Graphene from "gi://Graphene";
import app from "ags/gtk4/app";
import Adw from "gi://Adw";

type DropdownContentProps = {
  name: string;
  icon: string;
  children?: JSX.Element;
  widthRequest?: number;
  heightRequest?: number;
  actions?: JSX.Element;
};

export function DropdownContent(props: DropdownContentProps) {
  const { actions, children, name, icon, ...scrollProps } = props;
  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <box spacing={8} class="dropdown-header" hexpand>
        <box spacing={8} hexpand>
          <label class="dropdown-icon" label={icon} />
          <label class="dropdown-title" label={name} />
        </box>

        {actions}
      </box>

      <box {...scrollProps}>
        {children}
      </box>
    </box>
  );
}

export function Dropdown(
  props: { windowName: string; children: JSX.Element },
) {
  const { windowName, children } = props;
  const [currentView, setCurrentView] = createState("main");
  const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;
  let windowRef: Astal.Window | null = null;
  let contentElement: Gtk.Widget | null = null;

  function onKey(
    event: Gtk.EventControllerKey,
    keyval: number,
    _: number,
    mod: number,
  ) {
    if (keyval === Gdk.KEY_Escape && windowRef) {
      windowRef.visible = false;
    }
  }

  function onClick(event: Gtk.GestureClick, _: number, x: number, y: number) {
    if (!contentElement || !windowRef) return;
    const [, rect] = contentElement.compute_bounds(windowRef);
    const position = new Graphene.Point({ x, y });
    if (!rect.contains_point(position)) {
      windowRef.visible = false;
      return true;
    }
  }

  return (
    <window
      anchor={TOP}
      visible={false}
      name={windowName}
      application={app}
      layer={Astal.Layer.OVERLAY}
      $={(ref) => (windowRef = ref)}
      keymode={Astal.Keymode.EXCLUSIVE}
    >
      <Gtk.EventControllerKey onKeyPressed={onKey} />
      <Gtk.GestureClick onPressed={onClick} />
      <box $={(ref) => (contentElement = ref)}>
        <box
          class="dropdown-container"
          orientation={Gtk.Orientation.VERTICAL}
          vexpandSet
        >
          {children}
        </box>
      </box>
    </window>
  );
}
