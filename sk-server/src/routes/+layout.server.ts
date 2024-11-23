import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) return {};
	const user = await prisma.user.findUnique({
		where: {
			id: event.locals.user?.id
		},
		select: {
			username: true,
			profile: {
				select: {
					nickname: true
				}
			}
		}
	});
	return {
		user
	};
};
