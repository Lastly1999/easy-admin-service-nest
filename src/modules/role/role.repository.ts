import { EntityRepository, getConnection, Like, Repository } from "typeorm"
import { Role } from "./role.entity"

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    /**
     * 查询系统角色列表
     * @param pageSize
     * @param pageNo
     * @param keyWords
     */
    findAllSysRole(pageSize = 10, pageNo = 1, keyWords?: string) {
        return this.manager.getRepository(Role).find({
            skip: pageNo,
            take: pageSize,
            where: { roleName: Like(`%${keyWords}%`) },
        })
    }

    /**
     * 新增系统角色
     * @param role
     */
    async createSysRole(role: Role) {
        const user = await this.manager.getRepository(Role).create(role)
        return this.manager.save(user)
    }

    /**
     * 查询是否存在角色
     * @param id
     */
    async findRoleById(id: number) {
        return this.manager.getRepository(Role).findOne({ where: { roleId: id } })
    }

    /**
     * 更新角色
     * @param role
     */
    async updateRole(role: Role) {
        return await this.manager.getRepository(Role).save(role)
    }

    /**
     * 删除角色
     * @param role
     */
    async deleteRole(role: Role) {
        return this.manager.getRepository(Role).remove(role)
    }
    /**
     * 查询用户的角色权限列表
     * @param id
     */
    async findRoleByUserId(id: string) {
        return await this.manager
            .getRepository(Role)
            .createQueryBuilder("role")
            .innerJoinAndSelect("sys_user_roles", "sur", "role.role_id = sur.role_id")
            .andWhere("sur.user_id = :userId", { userId: id })
            .getMany()
    }

    /**
     * 更新角色关联的权限菜单列表
     * @param permissionId
     * @param roleId
     */
    async updateRoleBindMenus(permissionId: number[], roleId: number) {
        // return getConnection().createQueryBuilder("sys_basemenu_roles")
    }
}
