// Nestjs Import
import { Injectable, NotFoundException } from '@nestjs/common';

// DTO Import
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'john',
      email: 'john@gmail.com',
    },
    {
      id: 2,
      name: 'jane',
      email: 'jane@gmail.com',
    },
    {
      id: 3,
      name: 'jim',
      email: 'jim@gmail.com',
    },
    {
      id: 4,
      name: 'jimmy',
      email: 'jimmy@gmail.com',
    },
    {
      id: 5,
      name: 'joe',
      email: 'joe@gmail.com',
    },
  ];

  // Get All Users
  findAll() {
    return this.users;
  }

  // Get Single User
  findOne(id: number) {
    const user = this.users.find((u) => u.id == id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  // Create New User
  create(createUserDto: CreateUserDto) {
    const newUserId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: newUserId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update User
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((u) => {
      if (u.id == id) {
        return { ...u, ...updateUserDto };
      }
      return u;
    });

    return this.findOne(id);
  }

  // Delete User
  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((u) => u.id != id);
    return removeUser;
  }
}
