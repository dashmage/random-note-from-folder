import { App, PluginSettingTab, Setting } from "obsidian";

import RandomNoteFromFolderPlugin from "./main";
import { FolderSuggest } from "./ui/FolderSuggest";

export interface RandomNoteFromFolderSettings {
	/**
	 * Folder path relative to vault root. Empty means entire vault.
	 * Example: "Notes/Daily"
	 */
	folderPath: string;
}

export const DEFAULT_SETTINGS: RandomNoteFromFolderSettings = {
	folderPath: "",
};

export class RandomNoteFromFolderSettingTab extends PluginSettingTab {
	plugin: RandomNoteFromFolderPlugin;

	constructor(app: App, plugin: RandomNoteFromFolderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Folder to search")
			.setDesc(
				"Path relative to vault root. Leave empty to search the entire vault.",
			)
			.addText((text) => {
				text
					.setPlaceholder("Notes")
					.setValue(this.plugin.settings.folderPath)
					.onChange(async (value) => {
						this.plugin.settings.folderPath = value;
						await this.plugin.saveSettings();
					});

				new FolderSuggest(this.app, text.inputEl);
			});
	}
}
