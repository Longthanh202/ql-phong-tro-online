import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { permission } from '../entities/permission.entity'
import { PermissionService } from './permissions.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<permission> {
    return this.permissionService.findById(id);
  }

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.permissionService.delete(id);
  }
}