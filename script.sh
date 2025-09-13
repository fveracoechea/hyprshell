
#!/bin/bash

# Get the top 5 CPU consuming processes, excluding this script itself.
# We use `ps` as it's more straightforward for this specific use case than parsing `top`.
CPU_PROCS=$(ps ax -o %cpu,comm --sort=-%cpu | head -n 6 | tail -n 5)

# Get the top 5 memory consuming processes.
MEM_PROCS=$(ps ax -o %mem,comm --sort=-%mem | head -n 6 | tail -n 5)

# Create the tooltip content with Pango markup for rich text.
# <tt> uses a monospace font, <b> is bold, and we add line breaks with \n.
TOOLTIP_CONTENT="<big><b>CPU Top 5:</b></big>\n<tt>${CPU_PROCS}</tt>\n\n<big><b>Memory Top 5:</b></big>\n<tt>${MEM_PROCS}</tt>"

# Create the JSON output expected by Waybar.
# We escape any quotes within the tooltip content using `jq`.
# The `text` field is what appears on the bar itself. You can customize this.
TEXT="System Stats"
jq -n --arg text "$TEXT" --arg tooltip "$TOOLTIP_CONTENT" '{text: $text, tooltip: $tooltip}'
