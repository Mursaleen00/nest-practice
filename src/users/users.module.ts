// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports: [UsersService],
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
