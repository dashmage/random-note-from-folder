# Implementation plan – Random Note From Folder

## Goals
- Add a command palette action to open a random markdown note.
- Recursively search within a user-configured folder.
- Default behavior: search the whole vault.
- Open the chosen note in a **new tab**.
- If configured folder is invalid: show error and abort.

## Steps
1. **Project cleanup / structure**
   - Keep `src/main.ts` minimal (plugin lifecycle + registrations only).
   - Create a small module structure:
     - `src/settings.ts` for settings interface, defaults, and settings tab.
     - `src/commands/openRandomNote.ts` for command implementation.
     - `src/utils/fileSearch.ts` for recursive collection logic.

2. **Define settings**
   - Replace sample settings with:
     - `folderPath: string` (relative to vault root, empty string = whole vault).
   - Settings tab:
     - Text input for folder path.
     - Copy clarifying that empty means “entire vault”.
     - Save via `this.plugin.saveSettings()`.

3. **Implement recursive search**
   - Input: `App`, `folderPath`.
   - Resolve base folder:
     - If empty: `app.vault.getRoot()`.
     - Else: `app.vault.getAbstractFileByPath(folderPath)` and validate it is a `TFolder`.
   - Traverse subfolders and collect `TFile`s where `extension === "md"`.

4. **Random selection and open behavior**
   - If no notes found: show `Notice` and abort.
   - Choose uniformly at random.
   - Open in a new tab:
     - `const leaf = app.workspace.getLeaf(true)`
     - `await leaf.openFile(file, { active: true })`

5. **Register command**
   - Add a stable command ID, e.g. `open-random-note-from-folder`.
   - Command name: `Open random note from folder`.
   - Command callback:
     - load/validate settings
     - call search + open
     - error handling via `Notice`

6. **Remove sample plugin code**
   - Remove ribbon icon, modal, status bar, demo commands, demo DOM events/intervals.

7. **Polish / consistency**
   - Ensure plugin class name is not `MyPlugin`.
   - Ensure settings tab name matches plugin name.
   - Sanity-check `manifest.json` fields (no duplicates, correct `minAppVersion`).

8. **Manual verification checklist**
   - Build (`npm run build`) and install in a vault.
   - Confirm command is visible in command palette.
   - Confirm empty folder path searches whole vault.
   - Confirm invalid folder path shows an error.
   - Confirm note opens in a new tab.
