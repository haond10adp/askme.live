import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async (event) => {
	const topicCount = await prisma.topic.count({
		where: { userId: event.locals.user?.id }
	});

	return { topicCount };
};
