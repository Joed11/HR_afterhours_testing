require("dotenv").config();
const PORT = process.env.PORT;
const baseUrl = `http://127.0.0.1:${PORT}/javaApi`;
const axios = require("axios");
const http = require("http");
const coffeeApiResponse = require("../../src/__stubs__/getFavoriteCoffeeResponse.json");

describe("empty test", () => {
  it("should run a test", (done) => {
    axios.get = jest.fn().mockReturnValueOnce(coffeeApiResponse);
    http.get(baseUrl, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        data = JSON.parse(data);
        expect(data).toMatchObject(coffeeApiResponse);
        done();
      });
    });
  });
});
