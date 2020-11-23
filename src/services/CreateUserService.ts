import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const regexValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(regexValidEmail)) {
      throw new AppError(`Invalid email: ${email}`);
    }

    if (!name || !password) {
      throw new AppError('Fields name and password can not be empty.');
    }

    if (password.length < 6) {
      throw new AppError('The password must have at least 6 characters.');
    }

    // nao cria um novo usuário se email já está em uso
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    const user = usersRepository.create({ name, email, password });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
