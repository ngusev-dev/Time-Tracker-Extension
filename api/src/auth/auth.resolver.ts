/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { UserModel } from 'src/user/models/User.model';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  async loginUser(
    @Context() context: any,
    @Args('loginDto') loginDto: LoginDto,
  ) {
    const request = context.req as Request;
    return await this.authService.loginUser(request, loginDto);
  }

  @Mutation(() => UserModel)
  async registrationUser(
    @Context() context: any,
    @Args('registrationDto') registrationDto: RegistrationDto,
  ) {
    const request = context.req as Request;
    return await this.authService.registrationUser(request, registrationDto);
  }
}
