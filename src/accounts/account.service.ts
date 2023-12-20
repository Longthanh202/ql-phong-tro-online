import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { account } from '../entities/account.entity';
import { createAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService{
    constructor(
        @InjectRepository(account)
        private readonly accountRepository: Repository<account>,
    ){}


    async findAll(): Promise<account[]> {
        return await this.accountRepository.find();
    }

    async create(permissionData: createAccountDto): Promise<account> {
        const account = this.accountRepository.create(permissionData);
        return this.accountRepository.save(account);
      }
}