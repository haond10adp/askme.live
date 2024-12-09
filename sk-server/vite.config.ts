import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	server: {
		https: {
			key: fs.readFileSync('../.cert/private.pem'),
			cert: fs.readFileSync('../.cert/certificate.pem')
		},
		port: 443
	},
	plugins: [sveltekit()]
});
