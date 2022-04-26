import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Role } from "../role/role.entity"

@Entity("sys_base_menu")
export class BaseMenu {
    @PrimaryGeneratedColumn({ comment: "权限菜单id" })
    id: number

    @Column({ comment: "权限菜单名称" })
    name: string

    @Column({ comment: "权限菜单路径", nullable: true })
    path: string

    @Column({ comment: "根菜单id", nullable: true })
    parentId: number

    @Column({ comment: "图标名称", nullable: true })
    icon: string

    @CreateDateColumn({ name: "create_at" })
    createAt: Date

    @UpdateDateColumn({ name: "update_at" })
    updateAt: Date

    @ManyToMany(() => Role, (Role) => Role.baseMenus)
    @JoinTable({
        name: "sys_basemenu_roles",
        joinColumn: {
            name: "menu_id",
        },
        inverseJoinColumn: {
            name: "role_id",
        },
    })
    roles: Role[]
}
