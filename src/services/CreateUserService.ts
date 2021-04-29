import { getRepository } from 'typeorm'
import {  hash } from 'bcrypt'

import { User } from '../models/User'

import AppError from '../errors/AppError'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
 public async execute({ name, email, password }: IRequest ): Promise<User>{
    
    const usersRepository = getRepository(User)

    const alradyUserExists = await usersRepository.findOne({email})

    if(alradyUserExists) {
      throw new AppError('Email address alrady used')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)

    return user
}
}

export { CreateUserService }