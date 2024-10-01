module.exports = {
    moduleNameMapper: {
      "@react-three/fiber": "<rootDir>/__mocks__/reactThreeFiberMock.js",
      "@react-three/drei": "<rootDir>/__mocks__/reactThreeDreiMock.js",
      "three": "<rootDir>/__mocks__/threeMock.js"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    setupFiles: ['<rootDir>/src/jestSetup.js'],
  };