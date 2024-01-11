module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": ["backend/**/*.js"], // Adjust the path according to your project structure
            "parserOptions": {
                "ecmaVersion": 12, // or the version you're using
                "sourceType": "script"
            },
            "rules": {
                // Ignore no-unused-vars for error handling middleware in Express (Node.js environment)
                "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
