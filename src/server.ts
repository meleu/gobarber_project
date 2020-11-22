import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'hello world!' });
});

app.listen(3333, () => console.log('backend has been started!'));
