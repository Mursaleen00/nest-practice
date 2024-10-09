import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
