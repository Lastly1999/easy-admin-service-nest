import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "../user/user.entity"
import { BaseMenu } from "../base-menu/base-menu.entity"

@Entity("sys_roles")
export class Role {
    @PrimaryGeneratedColumn({ name: "role_id", comment: "角色id" })
    roleId: number

    @Column({ name: "role_name", comment: "角色名称" })
    roleName?: string

    @Column({ comment: "角色别名", nullable: true })
    describe?: string

    @CreateDateColumn({ name: "create_at" })
    createAt?: Date

    @UpdateDateColumn({ name: "update_at" })
    updateAt?: Date

    @ManyToMany(() => User, (user) => user.roles)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "id",
    })
    users?: User[]

    @ManyToMany(() => BaseMenu, (baseMenu) => baseMenu.roles)
    @JoinColumn({
        name: "menu_id",
        referencedColumnName: "id",
    })
    baseMenus?: BaseMenu[]
}
