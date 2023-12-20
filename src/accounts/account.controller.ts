import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { permission } from '../entities/permission.entity'
import { account } from '../entities/account.entity';
import { AccountService } from './account.service';
import { createAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(): Promise<account[]> {
    return this.accountService.findAll();
  }

  @Post()
  async create(@Body() createAccountDto: createAccountDto): Promise<account> {
    return await this.accountService.create(createAccountDto);
  }
}