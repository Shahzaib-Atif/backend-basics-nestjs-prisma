import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepo } from 'src/infra/UserRepo';
import { RegisterUserdDto } from '../dtos/user/RegisterUserDto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/user/LoginUserDto';
import * as jwt from 'jsonwebtoken';
import { FetchUserDto } from '../dtos/user/FetchUserDto';
const jwtSecret = process.env.SECRET_KEY;

@Injectable()
export class UserService {
  constructor(readonly userRepo: UserRepo) {}
  async registerUser(dto: RegisterUserdDto): Promise<any> {
    const { email, password } = dto;
    // const userEntity = new UserEntity(email, password)
    /* please note that as part of domain driven design, we currently use domain layer which mainly contains entities. It can be introduced here. 
    The domain layer will then act as core of our application. 
    The repository will stop acting as the core of application and will be abstracted out with the help of interfaces or abstract classes.
    Even though doing so will complicate this simple application, it can be done if required.
     */
    const hashedPassword = await bcrypt.hash(password, 10); // first hash the password
    const user = await this.userRepo.add(email, hashedPassword);
    return RegisterUserdDto.serialize(user);
  }

  async loginUser(dto: LoginUserDto): Promise<any> {
    const { email, password } = dto;
    const hash = (await this.userRepo.fetchByEmail(email)).password;
    const isPassCorrect = await bcrypt.compare(password, hash);
    if (!isPassCorrect)
      throw new HttpException('Password Incorrect', HttpStatus.UNAUTHORIZED);
    const token = jwt.sign({ email: dto.email }, jwtSecret, {
      expiresIn: '2 days',
    });
    return { jwt: token };
  }

  async fetchUser(dto: FetchUserDto): Promise<any> {
    const user = await this.userRepo.fetchByEmail(dto.email);
    return { user: { id: user.id, email: user.email } };
  }
}
