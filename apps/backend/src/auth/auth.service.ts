import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {


    constructor(private Prisma : PrismaService) {}
    async validateLocalUser({email,password}: SignInInput){
        const user = await this.Prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');

        const passwordMatched = await verify(user.password, password);

        if (!passwordMatched) throw new UnauthorizedException('Invalid credentials');
    }

}
