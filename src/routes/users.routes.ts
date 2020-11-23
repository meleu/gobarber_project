import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

const usersRouter = Router();
const uploadMiddleware = multer(uploadConfig);

usersRouter.get('/', authenticationMiddleware, async (request, response) => {
  const userId = request.user.id;
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne(userId);
  // TODO: retornar user sem exibir o password
  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });
  const userWithoutPassword = {
    id: user.id,
    name,
    email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userWithoutPassword);
});

usersRouter.put('/', (request, response) => {
  response.json({ message: 'TODO: PUT /users' });
});

usersRouter.patch(
  '/avatar',
  authenticationMiddleware,
  uploadMiddleware.single('avatar'),
  (request, response) => {
    if (!request.file) {
      throw new AppError('Missing "avatar" file.');
    }

    return response.json({ avatar: request.file.filename });
  }
);

usersRouter.delete('/', (request, response) => {
  response.json({ message: 'TODO: DELETE /users' });
});

export default usersRouter;
