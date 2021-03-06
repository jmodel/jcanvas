const ENV = process.env.BABEL_ENV;
let config;

if (ENV === 'es') {
  config = {};
} else {
  config = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: 11,
            edge: 14,
            firefox: 45,
            chrome: 49,
            safari: 10,
            node: '6.11',
          },
          modules: ['modules', 'production-umd'].includes(ENV) ? false : 'commonjs',
        },
      ],
    ],
  };
}

module.exports = () => config;
