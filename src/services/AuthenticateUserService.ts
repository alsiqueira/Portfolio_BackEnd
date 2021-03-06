import { getRepository } from 'typeorm'
import { compare  } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

import { User } from '../models/User'

import AppError from '../errors/AppError'


interface IRequest{
  email: string;
  password: string
}

interface IResponse{
  user: User;
  token: string;
}

class AuthenticateUserService{
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({email})

    if(!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched =  await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ }, secret ,{
      subject: user.id,
      expiresIn
    })


    return {
      user,
      token
    }
  }
}

export { AuthenticateUserService }