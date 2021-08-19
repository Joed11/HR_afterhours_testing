require("dotenv").config();
const PORT = process.env.PORT;
const javaApiUrl = `http://localhost:${PORT}`;
const axios = jest.requireActual("axios");
const getRandomCoffeeResponse = require("../__stubs__/getFavoriteCoffeeResponse.json");
const postFavoriteCoffeeResponse = require("../__stubs__/postFavoriteCoffeeResponse.json");
const deleteFavoriteCoffeeResponse = require("../__stubs__/deleteFavoriteCoffeeResponse.json");
const getFavortieCoffeeResponse = getRandomCoffeeResponse;
const coffeToPost = getRandomCoffeeResponse;

describe("javaApi", () => {
  describe("/javaApi/random", () => {
    describe("GET request", () => {
      describe("200 Response", () => {
        it("should respond with coffee data", async () => {
          const response = await axios.get(`${javaApiUrl}/javaApi/random`);
          expect(response.data).toMatchObject(getRandomCoffeeResponse);
        });
      });
    });
  });
  describe("/javaApifavorites", () => {
    describe("POST request", () => {
      describe("when coffee info is provided", () => {
        it("should respond with an object containg the username and the coffee data", async () => {
          const response = await axios.post(
            `${javaApiUrl}/javaApi/favorite/joed`,
            coffeToPost
          );
          expect(response.data).toMatchObject(postFavoriteCoffeeResponse);
        });
      });
    });
    describe("GET request", () => {
      describe("when the username is in the database", () => {
        describe("when coffee info exists in the database", () => {
          it("should respond the coffee data for that user", async () => {
            const response = await axios.get(
              `${javaApiUrl}/javaApi/favorite/joed`
            );
            expect(response.data).toMatchObject(getFavortieCoffeeResponse);
          });
        });
      });
      describe("when the username is NOT in the database", () => {
        it("should respond with a 404 error", async () => {
          await expect(
            axios.get(`${javaApiUrl}/javaApi/favorite/karen`)
          ).rejects.toThrow(new Error("Request failed with status code 404"));
        });
      });
    });
  });
  describe("DELETE request", () => {
    describe("when called", () => {
      it("should respond with a message indicating the record was removed", async () => {
        const response = await axios.delete(
          `${javaApiUrl}/javaApi/favorite/joed`
        );
        expect(response.data).toMatchObject(deleteFavoriteCoffeeResponse);
      });
    });
  });
});
