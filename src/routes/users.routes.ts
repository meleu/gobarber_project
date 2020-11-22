import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  response.json({ message: 'TODO: GET /users' });
});
usersRouter.post('/', (request, response) => {
  response.json({ message: 'TODO: POST /users' });
});
usersRouter.put('/', (request, response) => {
  response.json({ message: 'TODO: PUT /users' });
});
usersRouter.patch('/', (request, response) => {
  response.json({ message: 'TODO: PATCH /users' });
});
usersRouter.delete('/', (request, response) => {
  response.json({ message: 'TODO: DELETE /users' });
});

export default usersRouter;
