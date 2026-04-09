const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@websocket-chess/shared$": "<rootDir>/../../packages/shared/src/index.ts",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@websocket/(.*)$": "<rootDir>/src/websocket/$1",
    "^@builders/(.*)$": "<rootDir>/src/builders/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@transport/(.*)$": "<rootDir>/src/transport/$1",
  },
};