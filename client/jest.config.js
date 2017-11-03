module.exports = {
    verbose: true,
    timers: 'fake',
    roots: ['src'],
    testMatch: ['**/?(*_)(spec|test).js?(x)'],
    setupFiles: [
        './jestsetup.js',
    ],
    setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
    collectCoverage: false,
    collectCoverageFrom: ['components/*.jsx'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    notify: true,
    transformIgnorePatterns: ["node_modules/(?!react-native|native-base|react-navigation|react-native-fabric)"],

};
