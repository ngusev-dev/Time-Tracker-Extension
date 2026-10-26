import { defineManifest } from '@crxjs/vite-plugin';

export type TargetBrowser = 'chrome' | 'firefox';

export const createManifest = (apiUrl: string, browser: TargetBrowser) => {
  const { protocol, hostname } = new URL(apiUrl);
  const isFirefox = browser === 'firefox';

  return defineManifest({
    manifest_version: 3,
    name: 'Time Tracker',
    description:
      'Time Tracker is a tool designed to help users efficiently monitor the time they spend on various work tasks. It provides detailed reports, real-time tracking, and customizable alerts to improve productivity and time management. The extension seamlessly integrates with popular work platforms and offers an intuitive interface for easy start, pause, and stop of time tracking. Ideal for freelancers, remote workers, and teams who want to optimize their workflow and accurately log work hours.',
    version: '1.0.0',
    action: {
      default_popup: 'index.html',
    },
    permissions: ['storage', 'unlimitedStorage', 'cookies'],
    host_permissions: [`${protocol}//${hostname}/*`],
    background: isFirefox ? { scripts: ['background.js'] } : { service_worker: 'background.js' },
    ...(isFirefox ? firefoxSettings : {}),
  });
};

const firefoxSettings = {
  browser_specific_settings: {
    gecko: {
      id: 'time-tracker@your-domain.com',
      strict_min_version: '121.0',
      data_collection_permissions: { required: ['none'] },
    },
  },
};
