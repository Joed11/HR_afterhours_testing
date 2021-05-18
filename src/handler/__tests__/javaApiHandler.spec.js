const favoriteHandler = require("../favoriteHandler");
const axios = require("axios");
const MockExpressResponse = require("../../__mocks__/MockExpressResponse");
const getFavoriteCoffeeResponse = require("../../__stubs__/getFavoriteCoffeeResponse.json");
const postFavoriteCoffeeResponse = require("../../__stubs__/postFavoriteCoffeeResponse.json");
jest.mock("util");

describe("javaApiHandler", () => {
  describe("setFavoriteCoffee", () => {
    describe("when a username is provided", () => {
      describe("when no coffee data is provided", () => {
        describe("when data is retrieved from the external service", () => {
          const req = {
            params: {
              username: "joed",
            },
            body: {},
          };
          const res = new MockExpressResponse();
          it("should make an axios call", async () => {
            axios.get = jest.fn().mockImplementationOnce(() => {
              const data = Promise.resolve({
                data: getFavoriteCoffeeResponse,
              });
              return data;
            });
            await favoriteHandler.setFavoriteCoffee(req, res);
            expect(axios.get).toHaveBeenCalled();
          });

          it("should put the data from the api in res.body", async () => {
            expect(res.body).toMatchObject(postFavoriteCoffeeResponse);
          });
        });
        describe("when data is NOT retrieved from the external service", () => {
          const req = {
            params: {
              username: "joed",
            },
            body: {},
          };
          const res = new MockExpressResponse();

          it("should throw the error", async () => {
            axios.get = jest.fn().mockImplementationOnce(() => {
              throw new Error("coffee api failed");
            });
            await favoriteHandler.setFavoriteCoffee(req, res);
            expect(res.body).toEqual("coffee api failed");
          });

          it("should thorw a 500 error", async () => {
            expect(res.code).toEqual(500);
          });
        });
      });

      describe("when coffee data is provided", () => {
        const req = {
          params: {
            username: "joed",
          },
          body: {
            coffee: getFavoriteCoffeeResponse,
          },
        };
        const res = new MockExpressResponse();
        it("should store the coffee data", async () => {
          await favoriteHandler.setFavoriteCoffee(req, res);
          expect(res.body).toMatchObject(postFavoriteCoffeeResponse);
        });
      });
    });

    describe("when a username is NOT provided", () => {
      const req = {
        params: {},
      };
      it("should send back an error", async () => {
        const res = new MockExpressResponse();
        await favoriteHandler.setFavoriteCoffee(req, res);
        expect(res.code).toEqual(400);
        expect(res.body).toEqual("Submit a Username");
      });
    });
  });
});
