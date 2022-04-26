import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common"
import { RoleService } from "./role.service"
import { PutRoleDto } from "./dtos/put-role.dto"
import { GetRoleDto } from "./dtos/get-role.dto"
import { UpdateRoleDto } from "./dtos/update-role.dto"
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"
import { JwtTokenParams } from "../auth/jwt.strategy"
import { UpdateRoleMenusDto } from "./dtos/update-role-menus.dto"

@UseGuards(AuthGuard("jwt"))
@Controller("role")
@ApiTags("系统角色")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post("role")
    @ApiOperation({ summary: "获取系统角色(带分页)" })
    @ApiBody({ type: GetRoleDto })
    async getRoles(@Body() getRoleDto: GetRoleDto) {
        return await this.roleService.findAllSysRoles(getRoleDto)
    }

    @Get("role")
    @ApiOperation({ summary: "获取系统角色" })
    async getAllRole() {
        return await this.roleService.findAllRoles()
    }

    @Put("role")
    @ApiOperation({ summary: "添加角色" })
    @ApiBody({ type: PutRoleDto })
    async addRole(@Body() putRoleDto: PutRoleDto) {
        return await this.roleService.putSysRole(putRoleDto)
    }

    @Patch("role")
    @ApiOperation({ summary: "修改系统角色信息" })
    @ApiBody({ type: UpdateRoleDto })
    async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
        return await this.roleService.updateRole(updateRoleDto)
    }

    @Delete("role/:id")
    @ApiOperation({ summary: "删除系统角色" })
    @ApiQuery({ name: "id", required: true })
    async deleteRole(@Param("id") id: string) {
        return await this.roleService.deleteRoleById(id)
    }

    @Get("ids")
    @ApiOperation({ summary: "查询用户角色列表" })
    async getUserRoles(@Req() request: Request) {
        return await this.roleService.getRoleIdsByUserId((request.user as JwtTokenParams).roleId)
    }

    @Get("info/:id")
    @ApiOperation({ summary: "获取角色详情信息" })
    async getUserRoleInfos(@Param("id") id: string) {
        return await this.roleService.getRolesInfoByUserId(id)
    }

    @Get("menu")
    @ApiOperation({ summary: "获取角色详情信息" })
    async updateRoleMenus(@Body() updateRoleMenusDto: UpdateRoleMenusDto) {
        // todo
    }
}
