/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { UserModel } from 'src/user/models/User.model';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Query(() => Boolean)
  validateSession() {
    return true;
  }

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
