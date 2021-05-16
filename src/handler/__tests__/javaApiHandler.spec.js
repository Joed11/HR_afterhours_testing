const handler = require("../javaApiHandler");
const mockCache = require("../../cache/redisClient");
const axios = require("axios");
const MockExpressResponse = require("../../../__mocks__/MockExpressResponse");
const mockApiResponse = require("../../__stubs__/coffeeApiResponse.json");
jest.mock("util");

describe("javaApiHandler", () => {
  describe("when a username is provided", () => {
    const req = {
      query: {
        username: "Joe",
      },
    };
    describe("when data is successfully retrieved from the external service", () => {
      const res = new MockExpressResponse();

      it("should make an axios call", async () => {
        axios.get = jest.fn().mockImplementationOnce(() => {
          const data = Promise.resolve({
            data: mockApiResponse,
          });
          return data;
        });
        await handler.getFavoriteCoffee(req, res);
        expect(axios.get).toHaveBeenCalled();
      });

      it("should put the data from the api in res.body", async () => {
        expect(res.body).toMatchObject(mockApiResponse);
      });
    });

    describe("when data is NOT retrieved from the external service", () => {
      const res = new MockExpressResponse();

      it("should throw the error", async () => {
        axios.get = jest.fn().mockImplementationOnce(() => {
          throw new Error("coffee api failed");
        });
        await handler.getFavoriteCoffee(req, res);
        expect(res.body.message).toEqual("coffee api failed");
      });

      it("should thorw a 500 error", async () => {
        expect(res.code).toEqual(500);
      });
    });
  });
  describe("when a username is NOT provided", () => {
    it("should send back an error", async () => {
      const req = {
        query: {},
      };
      const res = new MockExpressResponse();
      await handler.getFavoriteCoffee(req, res);
      expect(res.body).toBeInstanceOf(Error);
      expect(res.body.message).toEqual("Submit a Username");
    });
  });
});
