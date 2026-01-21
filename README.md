# Slack Hover-Delete Assistant

A browser helper script for Slack Web that allows you to delete messages **intentionally** by hovering over them. This is a **human-assisted tool**, designed to speed up message deletion while preventing accidental mass deletes.

> ⚠️ **Important:** This tool does **not bypass Slack security**. You must hover messages manually. The deletion flow is semi-automatic for safety.

## Features

- Detects Slack messages when you hover over them.
- Opens the **3-dot menu** automatically.
- Clicks the **Delete** menu item and the confirmation button.
- Deletes only messages you intentionally hover over (hover-duration detection).
- Highlights messages being deleted.
- Shows a dynamic status box while working.

## How to Use

1. Open Slack Web in your browser.
2. Press `F12` → open **Console**.
3. Copy and paste the contents of `slack-delete-helper.js`.
4. Hover over a message for ~1.2 seconds:
   - Menu opens automatically.
   - Delete is clicked.
   - Confirmation is clicked.
5. Move to the next message and repeat.

> Adjust the hover duration in the script if you want to be faster or slower.

## File Structure

- `scripts/slack-delete-helper.js` – main helper script.
- `README.md` – project documentation.
- `LICENSE` – MIT License (optional, can be added).

## Customization

- `HOVER_DELAY` – hover duration before deletion in milliseconds.
- `Outline color & duration` – for highlighting messages.
- Status box text styling.

## Safety

- Always use on **your own messages**.
- Slack may prevent mass deletion if attempted too quickly.
- Never use in a workspace you don’t have permission to manage.

## License

MIT License © NotNahid
