import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { ExistUserDto } from "./dtos/find-user.dto"
import { ToolsService } from "../../common/tools/tools.service"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(private readonly toolsService: ToolsService, private readonly userService: UserService, private readonly jwtService: JwtService) {}

    //  验证码redis缓存前缀
    private readonly keyPrefix: string = "mathId"

    /**
     * 鉴权登录
     * @param findUserDto
     */
    async authLogin(findUserDto: ExistUserDto) {
        const verifyResult = await this.toolsService.verifySvgCode(this.keyPrefix, findUserDto.captchaId, findUserDto.captchaCode)
        if (!verifyResult) {
            throw new HttpException("验证码错误，请重试", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const userInfo = await this.userService.findUser(findUserDto.userName, findUserDto.passWord)
        const payload = { username: userInfo.userName, id: userInfo.id, roleId: userInfo.roleId }
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }

    /**
     * 生成登录鉴权图形验证码
     * @return Promise<{cap: string, mathId: string}>
     */
    async generateUserSvgCode() {
        const timeOut = 1000 * 60 // 过期时间
        const codeSize = 4 // 图形验证码长度
        return this.toolsService.generateSvgCode(this.keyPrefix, codeSize, timeOut)
    }
}
