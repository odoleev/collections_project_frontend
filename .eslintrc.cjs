module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        "no-nested-ternary": 0,
        "no-underscore-dangle": 0,
        "react/jsx-props-no-spreading": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "no-param-reassign": 0,
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
        "react/react-in-jsx-scope": 0
    }
}
