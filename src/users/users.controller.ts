// Nestjs Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

// Service Imports
import { UsersService } from './users.service';

// DTO Imports
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // It's mean that this is /users route.
export class UsersController {
  /* 
      Get /users                get all users
      Get /users/:id            get single user
      Post /users               create an user
      Patch /users/:id          update an user
      Delete /users/:id         delete an user
  */

  // Constructor
  constructor(private readonly usersService: UsersService) {}

  @Get() // Get /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // Get /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // Post /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // Patch /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // Delete /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
