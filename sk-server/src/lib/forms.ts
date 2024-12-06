//Interview
export interface InterviewCreate {
	errors?: InterviewError;
	question: string;
	answer: string;
	moreDetail: string;
	success: boolean;
}

export interface InterviewError {
	question: string[];
	answer: string[];
	moreDetail: string[];
}

export interface InterviewEdit extends InterviewCreate {
	id: string;
}

//Speech
export interface SpeechCreate {
	errors: SpeechCreateError;
	title: string;
	ideas: string[];
	note: string;
	success: boolean;
}

export interface SpeechCreateError {
	title: string[];
	ideas: string[];
	note: string[];
}

export interface SpeechEdit {
	errors: SpeechEditError;
	id: string;
	note: string;
}

export interface SpeechEditError {
	note: string[];
}

//General

export interface GeneralCreate {
	errors: GeneralError;
	question: string;
	answer: string;
	moreDetail: string;
	success: boolean;
}

export interface GeneralError {
	question: string[];
	answer: string[];
	moreDetail: string[];
}

export interface GeneralEdit extends GeneralCreate {
	id: string;
}
