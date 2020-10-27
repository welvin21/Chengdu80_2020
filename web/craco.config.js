const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#4E2286",
              "@input-color": "#fff"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
