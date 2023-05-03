import type { StorybookConfig } from 'storybook-framework-qwik';
import { qwikVite } from '@builder.io/qwik/optimizer';

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: 'storybook-framework-qwik',
  },
  core: {
    renderer: 'storybook-framework-qwik',
  },
  stories: [
    // ...rootMain.stories,
    '../packages/hooks/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(qwikVite({
      srcDir: './playground/src',
    }))
    return config;
  },
};

export default config;
