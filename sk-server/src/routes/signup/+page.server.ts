import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { prisma } from '$lib/server/prisma';
import { UserSchema } from '$lib/zodSchema';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const nickname = data.get('nickname') as string;
		const gender = data.get('gender') as string;

		const safeParse = UserSchema.safeParse(Object.fromEntries(data));

		if (!safeParse.success) {
			return fail(400, {
				errors: safeParse.error.flatten().fieldErrors,
				username,
				nickname,
				gender
			});
		}
		// TODO: check if username is already used
		let user = await prisma.user.findUnique({
			where: {
				username
			}
		});
		if (user) {
			return fail(400, {
				userError: 'User already existed',
				username,
				nickname,
				gender
			});
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		user = await prisma.user.create({
			data: {
				username,
				passwordHash,
				profile: {
					create: {
						nickname,
						gender
					}
				}
			}
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
