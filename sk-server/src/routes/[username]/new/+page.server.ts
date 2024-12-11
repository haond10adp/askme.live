import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { InterviewQuestion, Speech, GeneralQuestion } from '$lib/zodSchema';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	newInterviewQuestion: async ({ request, locals }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const topicName = data.get('topicName') as string;
		const isDouble = Boolean(data.get('isDouble'));
		const question = data.get('question') as string;
		const answer = data.get('answer') as string;
		const moreDetail = data.get('moreDetail') as string;

		const safeParse = InterviewQuestion.safeParse({
			...Object.fromEntries(data),
			isDouble
		});

		if (!safeParse.success) {
			return fail(400, {
				interviewCreate: {
					errors: safeParse.error.flatten().fieldErrors,
					question,
					answer,
					moreDetail
				}
			});
		}

		await prisma.topic.upsert({
			where: {
				userId_name: {
					userId: locals.user.id,
					name: topicName
				}
			},
			create: {
				name: topicName,
				isDouble,
				userId: locals.user.id,
				interviewQuestions: {
					create: {
						question,
						answer,
						moreDetail
					}
				}
			},
			update: {
				interviewQuestions: {
					create: {
						question,
						answer,
						moreDetail
					}
				}
			}
		});

		return { success: true };
	},
	newSpeech: async ({ request, locals }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const topicName = data.get('topicName') as string;
		const isDouble = Boolean(data.get('isDouble'));
		const title = data.get('title') as string;
		const ideas: string[] = [];
		const items = [];
		for (let i = 0; i < 5; i++) {
			items[i] = data.get(`idea${i}`) as string;
			if (items[i] != null) ideas.push(items[i]);
		}
		const note = data.get('note') as string;

		const safeParse = Speech.safeParse({
			topicName,
			isDouble,
			title,
			ideas,
			note
		});

		if (!safeParse.success) {
			return fail(400, {
				speechCreate: {
					errors: safeParse.error.flatten().fieldErrors,
					title,
					ideas,
					note
				}
			});
		}

		await prisma.topic.upsert({
			where: {
				userId_name: {
					userId: locals.user.id,
					name: topicName
				}
			},
			create: {
				name: topicName,
				isDouble,
				userId: locals.user.id,
				speeches: {
					create: {
						title,
						ideas,
						note
					}
				}
			},
			update: {
				speeches: {
					create: {
						title,
						ideas,
						note
					}
				}
			}
		});
		return { success: true };
	},
	newGeneralQuestion: async ({ request, locals }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const topicName = data.get('topicName') as string;
		const isDouble = Boolean(data.get('isDouble'));
		const question = data.get('question') as string;
		const answer = data.get('answer') as string;
		const moreDetail = data.get('moreDetail') as string;

		const safeParse = GeneralQuestion.safeParse({
			...Object.fromEntries(data),
			isDouble
		});

		if (!safeParse.success) {
			return fail(400, {
				generalCreate: {
					errors: safeParse.error.flatten().fieldErrors,
					question,
					answer,
					moreDetail
				}
			});
		}

		await prisma.topic.upsert({
			where: {
				userId_name: {
					userId: locals.user.id,
					name: topicName
				}
			},
			create: {
				name: topicName,
				isDouble,
				userId: locals.user.id,
				generalQuestions: {
					create: {
						question,
						answer,
						moreDetail
					}
				}
			},
			update: {
				generalQuestions: {
					create: {
						question,
						answer,
						moreDetail
					}
				}
			}
		});

		return { success: true };
	}
};
