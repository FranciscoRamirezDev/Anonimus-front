import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest configura el transform (SWC), alias y mocks de CSS/imágenes/next-font.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Alias "@/..." -> raíz del proyecto (igual que tsconfig paths).
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // Cobertura solo sobre la capa lógica (no las páginas UI de app/).
  collectCoverageFrom: [
    "lib/**/*.ts",
    "services/**/*.ts",
    "hooks/**/*.{ts,tsx}",
    "components/**/*.tsx",
    "!**/*.d.ts",
  ],
};

export default createJestConfig(config);
