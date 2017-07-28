# SkyNet

## Deployed at

https://skynet.herokuapp.com

## Description

SkyNet is a weather analytics web app. Using SkyNet you can view weather data based on a queried location which will be displayed using various D3 graphs.


## To start from codebase
```
yarn install
createdb SkyNet
create a secrets.js with keys for:
 * process.env.GOOGLE_CLIENT_ID
 * process.env.GOOGLE_CLIENT_SECRET
 * process.env.GOOGLE_CALLBACK
 * process.env.DARK_SKY_SECRET
 * process.env.GOOGLE_GEOLOCATION_SECRET
 * process.env.GOOGLE_GEOCODING_SECRET
yarn seed
yarn start-dev
```

## To test
```
yarn install
createdb SkyNet-test
yarn test
```
