import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/postcss';
import postcssUtopia from 'postcss-utopia';

// https://astro.build/config
export default defineConfig({
  vite: {
        css: {
            postcss: {
                plugins: [
                    tailwindcss(),
                    postcssUtopia({
                        minViewport: 320,
                        maxViewport: 1440,
                        rootSize: 16
                    }),
                ]
            }
        }
    },
});
