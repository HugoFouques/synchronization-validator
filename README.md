# Description

Dougs Test Technique

# Backend

## Installation Backend

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# all tests
$ npm run test:all
```

## Description

Il s'agit d'un application NestJS qui sert une API avec comme route `/movements/validation`. Vous trouverez le fichiers `test success.json` à la racine du projet pour un exemple de payload acceptée par le serveur.

# Frontend

## Installation Frontend

```bash
$ cd frontend
$ npm install
$ npm start
```

## Description

Il s'agit d'un application react qui propose de rentrer son fichier JSON directement pour l'envoyé au serveur pour validation. Si le fichier et valide et que des erreurs sont remontées, alors l'interface donne des indices pour la résolution des données.
