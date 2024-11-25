import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import fs from 'fs';

export default defineConfig({
	// server: {
	// 	https: {
	// 		key: fs.readFileSync('../.cert/private.key'),
	// 		cert: fs.readFileSync('../.cert/certificate.crt')
	// 	}
	// },
	plugins: [sveltekit()]
});
