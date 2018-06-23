const path = require("path");

module.exports = {
  entry: __dirname + "/src/index.jsx", // トランスパイル対象
  output: {
    path: __dirname + "/dist", // 出力先ディレクトリ
    filename: "bundle.js" // 入力されたファイルをまとめて出力するときのファイル名
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel-loader", // Babel を webpack で利用できるようにする
        options: {
          presets: ["react", "es2015"] // react と es2015 をトランスパイル対象とする
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"] // js ファイル、jsx ファイルを対象とする
  }
};
