import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService{
    constructor(
        @InjectRepository(permission)
        private readonly permissionRepository: Repository<permission>,
    ){}


    async findAll(): Promise<permission[]> {
        return await this.permissionRepository.find();
    }

    async findById(id: number): Promise<permission> {
        return this.permissionRepository.findOne({ where: {id}});
      }
    
      async create(permissionData: Partial<permission>): Promise<permission> {
        const role = this.permissionRepository.create(permissionData);
        return this.permissionRepository.save(role);
      }
    
      async update(id: number, permissionData: Partial<permission>): Promise<permission> {
        await this.permissionRepository.update(id, permissionData);
        return this.permissionRepository.findOne({ where: {id}});
      }
    
      async delete(id: number): Promise<void> {
        await this.permissionRepository.delete(id);
      }
}