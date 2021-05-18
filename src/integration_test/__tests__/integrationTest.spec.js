require("dotenv").config();
const PORT = process.env.PORT;
const javaApiUrl = `http://localhost:${PORT}`;
const axios = jest.requireActual("axios");
const coffeeApiResponse = require("../../__stubs__/getFavoriteCoffeeResponse.json");

describe("javaApi", () => {
  describe("/javaApi", () => {
    describe("GET request", () => {
      describe("200 Response", () => {
        it("should respond with coffee data", async () => {
          const response = await axios.get(`${javaApiUrl}/javaApi`);
          expect(response.data).toMatchObject(coffeeApiResponse);
        });
      });
    });
  });
});
