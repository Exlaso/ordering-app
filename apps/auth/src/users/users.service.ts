import {
  Injectable, InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { compare, hash, hashSync } from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserRequest) {
    try {
    await this.validateCreateUserRequest(request);
      request.password =  await this.encryptPassword(request.password);
      const user = await this.usersRepository.create(request);
      return user;
    }catch (err){
      throw new InternalServerErrorException(err)
    }
  }

  encryptPassword(password:string) {
    return password
       // return hash(password, 10);
    }
  decryptPassword(encryptedText: string, plainText: string) {
    return plainText === encryptedText;
        // return compare(plainText, encryptedText);
  }


  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await this.decryptPassword(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  getUsers() {
   return this.usersRepository.find({})
  }
}
