import { Controller, Get, Param, Put, Req, UseGuards, Body, Delete } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { Request } from "express"
import { BaseMenuService } from "./base-menu.service"
import { JwtTokenParams } from "../auth/jwt.strategy"
import { AuthGuard } from "@nestjs/passport"
import { CreateMenuDto } from "./dtos/create-menu.dto"

@UseGuards(AuthGuard("jwt"))
@Controller("menu")
export class BaseMenuController {
    constructor(private readonly baseMenuService: BaseMenuService) { }

    @Get("role")
    @ApiOperation({ summary: "获取用户系统菜单" })
    async getSysRoleMenus(@Req() request: Request) {
        return await this.baseMenuService.getUserRoleMenus((request.user as JwtTokenParams).roleId)
    }

    @Get("menu")
    @ApiOperation({ summary: "获取系统菜单" })
    async getAllMenus() {
        return await this.baseMenuService.findSysMenus()
    }

    @Get("menu/:menuId")
    @ApiOperation({ summary: "获取系统菜单详情" })
    async getMenuInfo(@Param("menuId") menuId: string) {
        return await this.baseMenuService.findOneMenuInfo(menuId)
    }

    @Put("menu")
    @ApiOperation({ summary: "创建系统菜单" })
    async putSysMenu(@Body() createMenuDto: CreateMenuDto) {
        return await this.baseMenuService.createSysMenu(createMenuDto)
    }

    @Delete("menu/:menuId")
    @ApiOperation({ summary: "删除系统菜单" })
    async removeSysMenu(@Param("menuId") menuId: string) {
        return await this.baseMenuService.deleteSysMenuById(menuId)
    }

    @Get("ids/:roleId")
    @ApiOperation({ summary: "获取系统菜单的id列表" })
    async getMenuRoleIds(@Param("roleId") roleId: string) {
        return await this.baseMenuService.getMenuIdsByRoleId(roleId)
    }
}
