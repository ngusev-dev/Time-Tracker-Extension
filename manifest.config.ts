import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Time Tracker',
  version: '1.0.0',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['storage', 'unlimitedStorage'],
  background: {
    service_worker: 'background.js',
    persistent: false,
  },
});
