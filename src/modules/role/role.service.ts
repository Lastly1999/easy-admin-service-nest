import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { RoleRepository } from "./role.repository"
import { Role } from "./role.entity"
import { PutRoleDto } from "./dtos/put-role.dto"
import { GetRoleDto } from "./dtos/get-role.dto"
import { UpdateRoleDto } from "./dtos/update-role.dto"

@Injectable()
export class RoleService {
    constructor(@InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository) {}

    /**
     * 查询全部系统角色(带分页)
     * @param getRoleDto
     */
    async findAllSysRoles(getRoleDto: GetRoleDto) {
        try {
            return await this.roleRepository.findAllSysRole(getRoleDto.pageSize, getRoleDto.pageNo, getRoleDto.keywords)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询全部系统角色
     */
    async findAllRoles() {
        try {
            return await this.roleRepository.find()
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 新增系统角色
     * @param putRoleDto
     */
    async putSysRole(putRoleDto: PutRoleDto) {
        const role = new Role()
        role.roleName = putRoleDto.roleName
        role.describe = putRoleDto.describe
        await this.roleRepository.createSysRole(role).catch(() => {
            throw new HttpException("新增角色失败", HttpStatus.INTERNAL_SERVER_ERROR)
        })
        return "新增角色成功"
    }

    /**
     * 修改系统角色信息
     * @param updateRoleDto
     */
    async updateRole(updateRoleDto: UpdateRoleDto) {
        const isExist = await this.roleRepository.findRoleById(updateRoleDto.roleId)
        if (!isExist) throw new HttpException("角色信息不存在", HttpStatus.INTERNAL_SERVER_ERROR)
        try {
            await this.roleRepository.updateRole(isExist)
        } catch (e) {
            throw new HttpException("更新失败", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return "更新成功"
    }

    /**
     * 删除角色信息
     * @param id
     */
    async deleteRoleById(id: string) {
        const isExist = await this.roleRepository.findRoleById(Number(id))
        if (!isExist) throw new HttpException("角色不存在", HttpStatus.INTERNAL_SERVER_ERROR)
        try {
            await this.roleRepository.deleteRole(isExist)
        } catch (e) {
            throw new HttpException("删除失败", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return "删除成功"
    }

    /**
     * 获取用户角色的ids列表
     * @param id
     */
    async getRoleIdsByUserId(id: string) {
        try {
            const rolesRes = await this.roleRepository.findRoleByUserId(id)
            return rolesRes.map((item) => item.roleId)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询系统用户角色信息列表
     * @param id
     */
    async getRolesInfoByUserId(id: string) {
        try {
            return await this.roleRepository.findRoleByUserId(id)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
