## HR Afterhours Testing API

### Contents:

- [Installation](#installation)
- [API Usage](#api-usage)
- [Credits](#credits)

### Installation

- #### Prerequisites:

   - This API uses redis for caching.  It relies on a connection to a redis server on the standard port(6379).

   - To get a quick instance of redis up and running on docker use the following command:
   - ```
     docker run --name redis-local -p 6379:6379 redis:latest
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
      
### API Usage

The api takes a username and assigns it a particular type of coffee as it's "favorite".  
 
#### The basic route is:
 
```
localhost:5000/javaApi?username={username}
```
 
 ##### Query Params
 
| Item:      | type    | description                                   |
|----------  |-------  |-------------------------------------------    |
| username   | string  | name the favorite coffee will be stored under |
 

The response from the random data coffee api will be stored in redis with the username provided as the key.  Subsequent calls with the same username will be served by the cache.
 
 
 ### Credits
 Random data provided by [Random Data API](https://random-data-api.com/)
 
 
