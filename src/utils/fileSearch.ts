import { App, Notice, TAbstractFile, TFile, TFolder } from "obsidian";

function isMarkdownFile(file: TAbstractFile): file is TFile {
	return file instanceof TFile && file.extension === "md";
}

function collectMarkdownFilesRecursively(folder: TFolder, out: TFile[]): void {
	for (const child of folder.children) {
		if (child instanceof TFolder) {
			collectMarkdownFilesRecursively(child, out);
			continue;
		}

		if (isMarkdownFile(child)) {
			out.push(child);
		}
	}
}

export function resolveBaseFolder(app: App, folderPath: string): TFolder | null {
	const trimmed = folderPath.trim();
	if (!trimmed) {
		return app.vault.getRoot();
	}

	const normalized = trimmed.replace(/\\/g, "/").replace(/^\/+/, "");
	const abstractFile = app.vault.getAbstractFileByPath(normalized);
	if (!abstractFile) {
		new Notice(`Folder not found: ${trimmed}`);
		return null;
	}

	if (!(abstractFile instanceof TFolder)) {
		new Notice(`Not a folder: ${trimmed}`);
		return null;
	}

	return abstractFile;
}

export function getMarkdownFilesUnderFolder(app: App, folderPath: string): TFile[] | null {
	const baseFolder = resolveBaseFolder(app, folderPath);
	if (!baseFolder) return null;

	const notes: TFile[] = [];
	collectMarkdownFilesRecursively(baseFolder, notes);
	return notes;
}
