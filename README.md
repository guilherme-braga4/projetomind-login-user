# Information management platform - PSEL 2021

This project is a information management plataform developed to the 2021 selection process, using NodeJS and React-Native.

## Getting Startted
Follow this instructions to get a copy of this project in your local env to develop and test.

###  Tools
To run the project you will need:
- [NodeJS](https://nodejs.org/en/download/)
- [React-Native](https://reactnative.dev/docs/0.63/getting-started)

### Installing Dependencies
Clone this repo:
```sh
git clone https://github.com/guilherme-braga4/projetomind-login-user.git
cd case
```

You can use npm to this task, but it is recommended to use [Yarn](https://yarnpkg.com/). To install it:
```sh
npm install -g yarn
```

Then, install projects dependencies:
```
yarn
```

## Running
After config, to run backend application:
```sh
yarn start
```
And, to run front-end application:
```sh
npx react-native run-android
```

### Routes
You can access the API by the following routes:
| Method | Route | Description |
| --- | --- | --- |
| GET | /users | Return a status code 200 and all users |
| GET | /user/:id | Get a specific user corresponding to the id |
| PUT | /user/:id | Changes the data of a specific user corresponding to the id 
| POST | /signup | Insert a new user in database |
| POST | /signin | Log in as a registered user |
| DELETE | /users/:id | Remove a specific user corresponding to the id |
