module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",  
    "env": {
        "browser": true,
        "jest/globals": true
      },
      "extends": ["airbnb", "prettier", "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"],
      "plugins": ["@typescript-eslint", "jest"],
      "parserOptions": {
        "ecmaVersion": 6
      },
      "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
          }
       ]
      },
      "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        },
      },
  };