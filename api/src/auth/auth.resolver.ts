import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { UserModel } from 'src/user/models/User.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  async registrationUser(
    @Args('registrationDto') registrationDto: RegistrationDto,
  ) {
    return await this.authService.registrationUser(registrationDto);
  }
}
