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
  ],
  controllers: [PermissionsController, AccountController],
  providers: [PermissionService, AccountService],
})
export class AppModule {}
