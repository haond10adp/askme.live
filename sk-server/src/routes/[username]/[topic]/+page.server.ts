import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { InterviewEdit, SpeechEdit, GeneralEdit } from '$lib/zodSchema';

export const load: PageServerLoad = async ({ params }) => {
	const pathUser = await prisma.user.findUnique({
		where: {
			username: params.username
		}
	});

	let topic;
	if (pathUser) {
		topic = await prisma.topic.findUnique({
			where: {
				userId_name: {
					userId: pathUser.id,
					//@ts-expect-error expect param
					name: params.topic
				}
			},
			include: {
				interviewQuestions: {
					orderBy: {
						createdAt: 'asc'
					}
				},
				speeches: {
					orderBy: {
						createdAt: 'asc'
					}
				},
				generalQuestions: {
					orderBy: {
						createdAt: 'asc'
					}
				}
			}
		});
	} else {
		error(404, {
			message: 'User not found'
		});
	}

	if (!topic) {
		error(404, {
			message: 'Topic not found'
		});
	}

	return { topic, pathUser };
};

export const actions: Actions = {
	editInterview: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;
		const question = data.get('question') as string;
		const answer = data.get('answer') as string;
		const moreDetail = data.get('moreDetail') as string;

		const safeParse = InterviewEdit.safeParse(Object.fromEntries(data));
		if (!safeParse.success) {
			return fail(400, {
				interview: {
					errors: safeParse.error.flatten().fieldErrors,
					id,
					question,
					answer,
					moreDetail
				}
			});
		}

		await prisma.interviewQuestion.update({
			where: {
				id
			},
			data: {
				question,
				answer,
				moreDetail
			}
		});
	},
	removeInterview: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;

		await prisma.interviewQuestion.delete({
			where: {
				id
			}
		});
	},
	editSpeech: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;
		const note = data.get('note') as string;

		const safeParse = SpeechEdit.safeParse({ note });

		if (!safeParse.success) {
			return fail(400, {
				speech: {
					errors: safeParse.error.flatten().fieldErrors,
					id,
					note
				}
			});
		}

		await prisma.speech.update({
			where: {
				id
			},
			data: {
				note
			}
		});
	},
	removeSpeech: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;

		await prisma.speech.delete({
			where: {
				id
			}
		});
	},
	editGeneral: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;
		const question = data.get('question') as string;
		const answer = data.get('answer') as string;
		const moreDetail = data.get('moreDetail') as string;

		const safeParse = GeneralEdit.safeParse(Object.fromEntries(data));
		if (!safeParse.success) {
			return fail(400, {
				general: {
					errors: safeParse.error.flatten().fieldErrors,
					id,
					question,
					answer,
					moreDetail
				}
			});
		}

		await prisma.generalQuestion.update({
			where: {
				id
			},
			data: {
				question,
				answer,
				moreDetail
			}
		});
	},
	removeGeneral: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const id = data.get('id') as string;

		await prisma.generalQuestion.delete({
			where: {
				id
			}
		});
	}
};
