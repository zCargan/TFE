const path = require('path');

module.exports = {
  // ... autres configurations webpack ...

  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  }
};
