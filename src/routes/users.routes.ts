import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  response.json({ message: 'TODO: GET /users' });
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  return response.json(user);
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
