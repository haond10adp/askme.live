export interface Topic {
	name: string;
	isDouble: boolean;
	interviewQuestions: string[];
	speeches: {
		title: string;
		ideas: string[];
	}[];
	generalQuestions: string[];
}
