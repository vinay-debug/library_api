# Note

This repo is created for library management with two roles admin and user.

# Usage

## Install npm packages

```
npm install
```

install dev dependencies

```
npm install --dev
```

## Create environment file

From `src` directory copy `.env.sample` file and rename copied file to `.env`

## Build/transpile the code

```
npm run build
```

## Start the server

```
npm run start
```

once you start the server, open browser and go to the [localhost:7272/api/v1](http://localhost:7272/api/v1)

and you should see following response from server

```
{"message":"API [Version 0.0.1]"}
```
