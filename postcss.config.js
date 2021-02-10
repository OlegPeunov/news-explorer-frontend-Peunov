module.exports = {
  plugins: [
    // eslint-disable-next-line global-require
    require('autoprefixer'),
    // eslint-disable-next-line global-require
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
