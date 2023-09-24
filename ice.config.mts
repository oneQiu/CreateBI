import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';
import request from '@ice/plugin-request';

// The project config, see https://v3.ice.work/docs/guide/basic/config
const minify = process.env.NODE_ENV === 'production' ? 'swc' : false;
export default defineConfig(() => ({
  minify,
  plugins: [store(), request()],
  server: {
    onDemand: true,
    format: 'esm',
  },
}));
