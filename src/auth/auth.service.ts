import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { account } from '../entities/account.entity';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(account)
        private readonly accountRepository: Repository<account>,
    ){}

    async validateAccount(username: string, password: string): Promise<any>{
        const account = this.accountRepository.findOne({where: {username}})
        if (account && (await account).password === password) {
            return account;
          }
          return null;
    }

    generateAccessToken(account: account): string {
        const accessToken = jwt.sign({ accountId: account.id }, 'your_access_token_secret', { expiresIn: '5m' });
        return accessToken;
      }
}