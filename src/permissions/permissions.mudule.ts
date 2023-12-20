import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './permissions.service';

@Module({
    controllers: [PermissionsController],
    providers: [PermissionService],
  })
export class PermissionModule {}
