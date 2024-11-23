import type { Topic } from '$lib/Topic';
export const topics: Topic[] = [
	{
		name: 'Job & Study',
		isDouble: true,
		interviewQuestions: [
			'Are you a student or do you work?',
			'Why did you choose your job?',
			'What is the best thing about your job?',
			'What do you not like about your job?',
			'Why did you choose your major?',
			'What do you learn while studying your major?',
			'What are you going to do after graduation?',
			'Do you prefer to study in the morning or in the afternoon?'
		],
		speeches: [
			{
				title: 'Describe an interesting job you know',
				ideas: [
					'What the job is',
					'What kind of education or qualities are needed to get this job',
					'and explain why you think this job is interesting'
				]
			},
			{
				title: "Describe a company that you'd like to work for?",
				ideas: [
					'what this company is',
					'what this company is know for',
					'how you got to know this company',
					'and explain why you want to work for this company'
				]
			}
		],
		generalQuestions: [
			'What kinds of jobs make lots of money?',
			'What kinds of jobs make little money?',
			'What are the differences between big and small companies?',
			'Why do some people choose to work at small companies?'
		]
	},
	{
		name: 'Accommodation & Buildings',
		isDouble: true,
		interviewQuestions: [
			'Do you live in an apartment or a house?',
			'What do you like about your house or apartment?',
			'What do you not like about your house or apartment',
			'What room in your house or apartment do you prefer most?',
			'What can you see from the window of your house or apartment?',
			'How long have you been living there?',
			'Will you keep living there in the future?',
			'Do you want to live near your family when you get your own house?'
		],
		speeches: [
			{
				title: 'Describe an important building in your town',
				ideas: [
					'where the building is located',
					'what it looks like',
					'when you visited it',
					'and explain why this building is important'
				]
			},
			{
				title: 'Describe your ideal future home',
				ideas: [
					'what this house would look like',
					'where this house would be',
					'who you want to live with',
					'and explain why you want ot have this house'
				]
			}
		],
		generalQuestions: [
			'What are the differences between modern buildings and traditional buildings?',
			"Does a region's climate affect the way buildings are constructed?",
			'Do people prefer living in apartments or houses in your country? Why?',
			'Some people prefer living in a small house to living in a big house Why is that?'
		]
	}
];
