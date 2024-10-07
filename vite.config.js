import { defineConfig } from 'vite';
import { blogPlugin } from './plugins/vite-plugin-blog';

export default defineConfig({
    root: 'src',
    build: {
        manifest: true,
        outDir: '../dist',
        emptyOutDir: true,

        rollupOptions: {
            input: {
                html: '/index.html',
                post: '/assets/css/post.css',
                index: '/assets/js/index.js',
            },
        },
    },
    server: { open: true },
    plugins: [blogPlugin()],
});