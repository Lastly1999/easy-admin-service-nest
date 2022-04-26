import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../user/user.entity"
import { ToolsService } from "../../common/tools/tools.service"
import { UserModule } from "../user/user.module"
import { UserService } from "../user/user.service"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"
import { AuthController } from "./auth.controller"
import { jwtConstants } from "./constants"

@Module({
    controllers: [AuthController],
    providers: [AuthService, ToolsService, UserService, JwtStrategy],
    exports: [JwtModule],
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
})
export class AuthModule { }
