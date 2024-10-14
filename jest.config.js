// jest.config.cjs
module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Asegúrate de incluir ts y tsx si usas TypeScript
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  