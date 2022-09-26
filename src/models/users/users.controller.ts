import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Unprotected()
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() response): Promise<any> {
    this.usersService.create(createUserDto.user_name);

    return response.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }
}
