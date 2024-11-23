import { z } from 'zod';

export const UserSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(6, 'Username must be at least 6 characters')
		.max(32, 'Username must be less than 32 characters')
		.trim()
		.toLowerCase(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, 'Password must be at least 6 characters')
		.max(32, 'Password must be less than 32 characters')
		.trim(),
	nickname: z
		.string({ required_error: 'Nickname is required' })
		.min(2, 'Nick name must be at least 2 characters')
		.max(32, 'Nickname must be less than 32 characters')
		.trim(),
	gender: z.enum(['male', 'female', 'non-binary'], { message: 'Gender is required' })
});

export const LoginSchema = UserSchema.pick({ username: true, password: true });

export const UserInfoEditSchema = UserSchema.pick({ nickname: true, gender: true });

export const Topic = z.object({
	topicName: z
		.string({ required_error: 'Topic name is required' })
		.min(1, 'Topic name is required')
		.max(32, 'Topic name must be less than 32 character')
		.trim(),
	isDouble: z.boolean({ required_error: 'Is double is required' })
});

export const InterviewQuestion = Topic.extend({
	question: z
		.string({ required_error: 'Question is required' })
		.min(1, 'Question is required')
		.max(100, 'Question must be less than 100 characters')
		.trim(),
	answer: z
		.string({ required_error: 'Answer is required' })
		.min(1, 'Answer is required')
		.max(100, 'Answer must be less than 100 characters')
		.trim(),
	moreDetail: z
		.string({ required_error: 'More detail is required' })
		.min(1, 'More detail is required')
		.max(500, 'More detail must be less than 500 character')
		.trim()
});

export const InterviewEdit = InterviewQuestion.pick({
	question: true,
	answer: true,
	moreDetail: true
});

export const SpeechEdit = z.object({
	note: z
		.string({ required_error: 'Note is required' })
		.min(1, 'Note is required')
		.max(700, 'Note must be less than 700 characters')
		.trim()
});

export const Speech = Topic.extend({
	ideas: z.array(z.string()),
	note: z.string({ required_error: 'Note is required' }).min(1, 'Note is required').trim()
});

export const GeneralQuestion = InterviewQuestion;
export const GeneralEdit = GeneralQuestion.pick({
	question: true,
	answer: true,
	moreDetail: true
});
