import { prisma } from '$lib/server/prisma';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { UserInfoEditSchema } from '$lib/zodSchema';

export const load: PageServerLoad = async ({ params }) => {
	const pathUser = await prisma.user.findUnique({
		where: {
			// @ts-expect-error can't find username
			username: params.username
		},
		select: {
			username: true,
			profile: {
				select: {
					nickname: true,
					gender: true
				}
			},
			topics: true
		}
	});

	if (!pathUser) {
		error(404, {
			message: 'User not found'
		});
	}

	return { pathUser };
};

export const actions: Actions = {
	editUser: async ({ locals, request }) => {
		if (!locals.user) return redirect(302, '/');

		const data = await request.formData();
		const nickname = data.get('nickname') as string;
		const gender = data.get('gender') as string;

		const safeParse = UserInfoEditSchema.safeParse(Object.fromEntries(data));

		if (!safeParse.success) {
			return fail(400, { errors: safeParse.error.flatten().fieldErrors, nickname, gender });
		}

		const profile = await prisma.profile.update({
			where: {
				userId: locals.user.id
			},
			data: {
				nickname,
				gender
			},
			select: {
				nickname: true,
				gender: true
			}
		});

		return { profile };
	}
};
