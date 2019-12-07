const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const productionGzipExtensions = ["js", "css", "ts", "json", "styl", "tsx"];
const isProduction = process.env.NODE_ENV === "production";

const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  productionSourceMap: false,
  outputDir: "dist",
  assetsDir: "static",
  css: {
    loaderOptions: {
      stylus: {
        import: [
          resolve("src/assets/stylus/color.styl"),
          resolve("src/assets/stylus/size.styl"),
          resolve("src/assets/stylus/common.styl")
        ]
      }
    }
  },
  devServer: {
    hot: true,
    disableHostCheck: true,
    proxy: {
      "/api-dev/api": {
        target: "http://qw.nghugh.com",
        pathRewrite: { "^/api-dev": "" }
      },
      "/api-pro": {
        target: "http://qw.nghugh.com",
        pathRewrite: { "^/api-pro": "" },
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      "@": resolve("src"),
      "@assets": resolve("src/assets"),
      "@api": resolve("src/api"),
      "@views": resolve("src/views"),
      "@components": resolve("src/components"),
      "@common": resolve("src/common"),
      "@utils": resolve("src/utils"),
      "@interface": resolve("src/interface"),
      "@services": resolve("src/services")
      // vue$: 'vue/dist/vue.esm.js'
    };

    // config.plugins.push(
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: "server",
    //     analyzerHost: "127.0.0.1",
    //     analyzerPort: 7778,
    //     openAnalyzer: true
    //   })
    // );

    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      "element-ui": "ELEMENT"
    };

    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 1024,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      );
    }
  }
};
