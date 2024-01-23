const mock = jest.fn().mockImplementation(() => {
    return {
      FileSystem: {
        documentDirectory: 'mocked-document-directory/',
        getInfoAsync: jest.fn(),
        makeDirectoryAsync: jest.fn(),
        copyAsync: jest.fn(),
      },
    };
  });
  
  module.exports = mock();