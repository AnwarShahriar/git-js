
export interface DiffSummaryResult {
	files: {
		file: string;
		changes: number,
		insertions: number;
		deletions: number;
	}[];
	insertions: number;
	deletions: number;
}

export interface FetchResult {
	raw: string;
	remote: string | null;
	branches: string[];
	tags: string[];
}

export interface PullResult {
	files: string[];
	insertions: any;
	deletions: any;
	summary: {
		changes: number;
		insertions: number;
		deletions: number;
	};
}

export interface StatusResult {
	not_added: string[];
	conflicted: string[];
	created: string[];
	deleted: string[];
	modified: string[];
	renamed: string[];
	files: {
		path: string;
		index: string;
		working_dir: string;
	}[];
	ahead: number;
	behind: number;
	current: string;
	tracking: string;
}