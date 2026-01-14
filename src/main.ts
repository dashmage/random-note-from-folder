import { Plugin } from "obsidian";

import { openRandomNoteFromFolder } from "./commands/openRandomNote";
import {
	DEFAULT_SETTINGS,
	RandomNoteFromFolderSettingTab,
	RandomNoteFromFolderSettings,
} from "./settings";

export default class RandomNoteFromFolderPlugin extends Plugin {
	settings: RandomNoteFromFolderSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "open-random-note",
			name: "Open folder-scoped random note",
			callback: async () => {
				await openRandomNoteFromFolder(this.app, this.settings.folderPath);
			},
		});

		this.addSettingTab(new RandomNoteFromFolderSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<RandomNoteFromFolderSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
