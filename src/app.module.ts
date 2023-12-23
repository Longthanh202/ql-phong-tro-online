import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { permission } from './entities/permission.entity';
import { account } from './entities/account.entity';
import {PermissionsController} from './permissions/permissions.controller';
import {PermissionService} from './permissions/permissions.service';
import { AccountController } from './accounts/account.controller';
import { AccountService } from './accounts/account.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { Repository } from 'typeorm';
import { authenticate } from 'passport';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'monorail.proxy.rlwy.net',
      port: 43281,
      username: 'postgres',
      password: '1*233AEEcEA33Fdg62d45gbAGb6e4gbD',
      database: 'quanlyphongtro',
      entities: [permission, account],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([permission, account]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_SECRET || '5m' },
    }),
    //AuthModule,
  ],
  controllers: [PermissionsController, AccountController],
  providers: [PermissionService, AccountService],
  
})
export class AppModule {}
