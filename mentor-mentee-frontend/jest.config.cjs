module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.[jt]sx?$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx', 'json'],
	setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
	testMatch: ['<rootDir>/test/**/*.test.jsx'],
	extensionsToTreatAsEsm: ['.jsx'],
};
