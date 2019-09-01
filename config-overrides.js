const { override, disableEsLint  } = require('customize-cra')


module.exports = override(
  disableEsLint()
);
