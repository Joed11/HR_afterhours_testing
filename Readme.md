## HR Afterhours Testing API

### Contents:

- [Installation](#installation)
- [API Usage](#api-usage)
- [Credits](#credits)

### Installation

- #### Prerequisites:

   - This API uses redis for caching and mongodb for storage.  It relies on a connection to both at their standard ports.

   - To get a quick instance of redis and mongodb up and running on docker use the following commands:
   - ```
     docker run --name redis-local -p 6379:6379 redis:latest
     ```
   - ```
     docker run --name mongo-local -p 27017:27017 mongodb:latest
     ```

1. #### Clone this repo to your local machine:

```
git clone https://github.com/Joed11/HR_afterhours_testing.git
```

2. #### Navigate to the root of the repository

3. #### Install Packages

```
npm install
```

4. #### Run the API (defaults to port 5000)
```
npm start
```

5. #### Dev and Testing
  - You can run the project via nodemon for development using the following command:
    - ```
      npm run start:dev
      ```
  - Unit tests can be run via the following command:
    - ```
      npm run test:unit
      ```
  - An integration test can be run via the following command:
    - ```
      npm run test:integration
      ```
      
### API Usage

##### Out of the box the api will be available at `localhost:5000`.
 
#### The routes are:
 
| Routes                      | Method | Description                                                          |
|-----------------------------|--------|----------------------------------------------------------------------|
| /javaApi                    | GET    | Get info about a random type of coffee                               |
| /javaApi/favorite/:username | GET    | Get the favorite coffee type for the given username                  |
| /javaApi/favorite/:username | POST   | Add favorite coffee details and store them under a provided username |
 
 
 #### GET: /javaApi
 
 ##### Possible Responses:
 
| Code | Type        | Description                           |
|------|-------------|---------------------------------------|
| 200  | OK          | Sends back data about a type of coffee|
| 500  | Internal    | Uh-oh. I need more coffee.            |

---

 #### GET: /javaApi/favorite/:username
 
 ##### Request params
 
| Item:      | type    | description                               |
|----------  |-------  |-------------------------------------------|
| username   | string  | name the favorite coffee is stored under  |
 
 ##### Possible Responses:
 
| Code | Type        | Description                                          |
|------|-------------|------------------------------------------------------|
| 200  | OK          | Sends back data about that usernames favorite coffee |
| 400  | Bad Request | Uh-oh. You need more coffee                          |
| 404  | Not Found   | Uh-oh. No coffee for you.                            |
| 500  | Internal    | Uh-oh. I need more coffee.                           |

---
 
 #### Post: /javaApi/favorite/:username
 
 ##### Request params
 
| Item:      | type    | description                               |
|----------  |-------  |-------------------------------------------|
| username   | string  | name the favorite coffee is stored under  |


##### Request Body:

Content Type: application/json

##### Example Request body:
```.json
{
   "coffee": {
     "id": 7331,
     "uid": "b4bbb427-0cab-43fb-9ead-46338abc2054",
     "blend_name": "The Volcano",
     "origin": "Kayanza, Burundi",
     "variety": "Liberica",
     "notes": "tart, round, concord grape, green pepper, tamarind",
     "intensifier": "delicate"
   }
}
```
 
 ##### Possible Responses:
 
| Code | Type        | Description                                          |
|------|-------------|------------------------------------------------------|
| 200  | OK          | Sends back data about that usernames favorite coffee |
| 400  | Bad Request | Uh-oh. You need more coffee                          |
| 500  | Internal    | Uh-oh. I need more coffee.                           |
 

When a favorite coffe is posted it will be cached for 10 seconds.  Any subsequent get requests for a stored favorite will start a new expiration timer regardless if they are served from the database or the cache.
 
 
 ### Credits
 Random data provided by [Random Data API](https://random-data-api.com/)
 
 
