import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { account } from '../entities/account.entity';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService{

    constructor(
        private readonly jwtService: JwtService,
        private readonly accountRepository: Repository<account>
        ) {}
    
   
    async validateAccount(username: string, password: string): Promise<account | any>{
        const account = this.accountRepository.findOne({where: {username}})
        const hashedPassword = await bcrypt.hash(password, 10);
        const subPassword = hashedPassword.substring(0, 20);
        console.log(subPassword);
        if (account && (await account).password === subPassword) {
            return account;
          }
          return null;
    }

    async login(account: account): Promise<any> {
        const payload = { username: account.username, sub: account.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.generateRefreshToken(),
    };
      }

      async refreshToken(token: string): Promise<any> {
        // Kiểm tra token và lấy thông tin user tương ứng
        const payload = this.jwtService.verify(token);
        const account = await this.accountRepository.findOne(payload.sub);
        if (!account) {
          console.log('Error');
        }
        // Tạo lại access token mới
        const newAccessToken = this.jwtService.sign({ username: account.username, sub: account.id });
        return {
          accessToken: newAccessToken,
        };
      }
    
      private generateRefreshToken(): string {
        return 'refresh-token';
      }
}