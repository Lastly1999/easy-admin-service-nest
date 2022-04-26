import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"
import { JwtTokenParams } from "../auth/jwt.strategy"
import { FindUserDto } from "./dtos/find-user.dto"

@UseGuards(AuthGuard("jwt"))
@Controller("user")
@ApiTags("系统用户")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("user")
    @ApiOperation({ summary: "获取用户详情." })
    async getUserInfo(@Req() request: Request) {
        return await this.userService.getUserInfoById((request.user as JwtTokenParams).id)
    }

    @Post("user")
    @ApiOperation({ summary: "查询系统用户列表" })
    @ApiBody({ type: FindUserDto })
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() findUserDto: FindUserDto) {
        return await this.userService.findUserAll(findUserDto)
    }

    @Patch("user")
    @ApiOperation({ summary: "修改系统用户信息" })
    @ApiBody({ type: UpdateUserDto })
    async updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUserInfoOrRoles(updateUserDto)
    }

    @Get("role")
    @ApiOperation({ summary: "查询用户角色列表" })
    async getUserRoles(@Req() request: Request) {
        return await this.userService.getUserRoles((request.user as JwtTokenParams).roleId)
    }

    @Get("role/:userId")
    @ApiOperation({ summary: "用户id查询权限菜单信息" })
    async getUserDefRoleInfoById(@Param("userId") userId: string) {
        // todo
    }
}
