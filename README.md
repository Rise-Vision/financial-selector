# Rise Vision Financial Component and Financial Selector [![CircleCI](https://circleci.com/gh/Rise-Vision/financial-selector-prototype.svg?style=svg&circle-token=a6f0a61d96bd7f3f901fa3cfbb1d4e1059183b86)](https://circleci.com/gh/Rise-Vision/financial-selector-prototype)

## What
Financial selector app


## Start Dev

### Financial Selector with a static dev site
```bash
npm run dev
```

### Financial component cross-domain test server

(note, this depends on the Financial Selector static dev site)

```bash
npm run dev-cr
```

## Build Project
Note: this will build both Financial Selector and Financial Component.

```bash
npm run build
```

## Deployment

```bash
npm run deploy
```

## Continuous Deployment

Note, in order to automatically deploy the app, you need to set `FIREBASE_TOKEN` environment variable in your CI. To generate a token, you need to run `firebase login:ci`.

See more here: https://github.com/firebase/firebase-tools#administrative-commands
