import { Controller, Post, Get, Patch, Body } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { FindUserDto } from "./dtos/find-user.dto"

@Controller("auth")
@ApiTags("系统权限")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @ApiOperation({ summary: "鉴权登录" })
    @ApiBody({ type: FindUserDto })
    async authLogin(@Body() findUserDto: FindUserDto) {
        return await this.authService.authLogin(findUserDto)
    }

    @Get("/code")
    @ApiOperation({ summary: "获取图片验证码" })
    async authImgCode() {
        return this.authService.generateUserSvgCode()
    }

    @Get("/menu")
    async getSystemAuthMenu() {
        return "auth_menu"
    }

    @Get("/menuids")
    async getSystemAuthMenuIds() {
        return "ids"
    }

    @Patch("/menu")
    async updateRoleMenus() {
        return "update"
    }

    @Patch("/user")
    async updateUserRole() {
        return "update"
    }
}
