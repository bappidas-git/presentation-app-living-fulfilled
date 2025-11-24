module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(xlsx|xls)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  });
  return config;
};
