module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links', '@storybook/addon-notes'],
  core: {
    builder: 'storybook-builder-vite',
  },
};
