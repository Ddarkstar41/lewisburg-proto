// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change this to the real domain when the prototype graduates.
  site: 'https://lewisburg-proto.netlify.app',
  build: {
    format: 'directory',
  },
});
