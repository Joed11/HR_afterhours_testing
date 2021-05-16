const redis = {
  createClient: () => {
    return {
      on: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };
  },
};

module.exports = redis;
