import { App, Notice } from "obsidian";

import { getMarkdownFilesUnderFolder } from "../utils/fileSearch";

export async function openRandomNoteFromFolder(app: App, folderPath: string): Promise<void> {
	const notes = getMarkdownFilesUnderFolder(app, folderPath);
	if (!notes) return;

	if (notes.length === 0) {
		const baseLabel = folderPath.trim() ? folderPath.trim() : "<vault root>";
		new Notice(`No notes found under ${baseLabel}`);
		return;
	}

	const chosenIndex = Math.floor(Math.random() * notes.length);
	const chosen = notes[chosenIndex];
	if (!chosen) {
		new Notice("Failed to select a random note");
		return;
	}

	const leaf = app.workspace.getLeaf(true);
	await leaf.openFile(chosen, { active: true });
}
