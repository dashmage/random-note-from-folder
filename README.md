# Random Note From Folder

An Obsidian plugin that opens a random note from a user-configured directory. Similar to Obsidian's core "Open random note" but provides an option to scope notes from a specific folder.

## Features
- Configure a directory in settings (random note is selected recursively from that folder and any subfolders).
- Randomly opens a markdown note from the configured directory via command palette.
- Toast notifications for errors (e.g., no notes found in directory).
- Minimal unit tests for core logic.

## Installation
1. Clone or download this repository.
2. Navigate to the plugin directory and install dependencies: `npm install`.
3. Build the plugin: `npm run build`.
4. Copy the `dist/main.js`, `dist/styles.css` (if present), and `manifest.json` to your Obsidian vault's `.obsidian/plugins/random-note-from-folder/` directory.
5. Restart Obsidian.
6. Enable the plugin in Settings > Community Plugins > Installed Plugins.

## Usage
1. Go to Settings > Plugin Options > Random Note From Folder.
2. Enter the directory path (relative to vault root, e.g., `Notes/Daily`).
3. Click the disk icon to save settings.
4. Open the command palette (`Ctrl/Cmd + P`).
5. Search for "Open random note from folder".
6. Execute to open a random note from the configured directory.

## Development
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm i` or `yarn` to install dependencies.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

### ESLint
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code.
- This project already has eslint preconfigured, you can invoke a check by running`npm run lint`
- Together with a custom eslint [plugin](https://github.com/obsidianmd/eslint-plugin) for Obsidan specific code guidelines.
- A GitHub action is preconfigured to automatically lint every commit on all branches.

## Manually installing the plugin
- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## License
MIT License.
