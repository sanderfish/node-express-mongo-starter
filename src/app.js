import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import {
  developmentErrorHandler,
  productionErrorHandler,
} from './handlers/errorHandler';

import router from './router';

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(
  cors({
    origin: '*',
    headers: [
      'Access-Control-Allow-Headers',
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'x-access-token',
    ],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use(
  express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined,
  }),
);

app.use('/', router);

if (app.get('env') === 'development') {
  app.use(developmentErrorHandler);
}

app.use(productionErrorHandler);

module.exports = app;
