# trueview-app

> The consumer TrueView app.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Firebase deploy

Trebuie sa specificam in firebase json site-ul pe care dam deploy daca avem mai multe site-uri configurate.

```json
  "hosting": {
    "site": "trueview",
    "public": "dist",
```

In firebase ni se sugereaza sa rulam

```bash
firebase deploy --only hosting:trueview
```

dar cred ca se poate sa rulam si doar

```bash
firebase deploy
```

pentru ca oricum noi lucram cu un singur site per proiect nuxt.
