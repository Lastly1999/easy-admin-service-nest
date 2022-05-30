import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne, JoinColumn } from "typeorm"
import { Role } from "../role/role.entity"
import { Department } from "../department/department.entity"

@Entity("sys_users")
export class User {
    @PrimaryGeneratedColumn({ comment: "用户id" })
    id?: number

    @Column({ name: "user_name", comment: "用户名" })
    userName: string

    @Column({ name: "pass_word", comment: "账户密码" })
    passWord: string

    @Column({ name: "user_avatar", comment: "用户头像", nullable: true })
    userAvatar?: string

    @Column({ name: "nike_name", comment: "用户昵称" })
    nikeName?: string

    @Column({ name: "role_id", comment: "用户角色id" })
    roleId: string

    @CreateDateColumn({ name: "create_at" })
    createAt?: Date

    @UpdateDateColumn({ name: "update_at" })
    updateAt?: Date

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: "sys_user_roles",
        joinColumn: {
            name: "user_id",
        },
        inverseJoinColumn: {
            name: "role_id",
        },
    })
    roles?: Role[]

    @ManyToOne(() => Department, (dep) => dep.users)
    @JoinColumn({ name: "dep_id" })
    dep: Department
}
