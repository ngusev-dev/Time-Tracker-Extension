import { defineManifest } from '@crxjs/vite-plugin';

export type TargetBrowser = 'chrome' | 'firefox';

export const createManifest = (apiUrl: string, browser: TargetBrowser) => {
  const { protocol, hostname } = new URL(apiUrl);
  const isFirefox = browser === 'firefox';

  return defineManifest({
    manifest_version: 3,
    name: 'Time Tracker',
    description:
      'Time Tracker is a tool designed to help users efficiently monitor the time they spend on various work tasks.',
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
      id: '{69f8a1af-4c1a-40d8-8a75-06bd171dcc4d}',
      strict_min_version: '140.0',
      data_collection_permissions: { required: ['none'] },
    },
    gecko_android: {
      strict_min_version: '142.0',
    },
  },
};
