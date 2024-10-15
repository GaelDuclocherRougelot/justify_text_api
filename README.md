# **Justify text API**

## How to initialize the project

``` bash
pnpm install
```

## How to run the project

``` bash
pnpm run dev
```

### or

``` bash
pnpm run start
```

## How to test the project

``` bash
pnpm run test
```

## How to build the project

``` bash
pnpm run build
```

## API Documentation

Base endpoint : https://justifytextapi-production.up.railway.app/api

POST:
- Generate a token : ```/token```
  - Body : email
- Justify a text (with token provided) : ```/justify```
  - Body: plain text
