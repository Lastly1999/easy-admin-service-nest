import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../user/user.entity"

@Entity("sys_department")
export class Department {
    @PrimaryGeneratedColumn({ comment: "部门id" })
    id: number

    @Column({ name: "dep_name", comment: "部门名称" })
    depName: string

    @Column({ name: "dep_status", comment: "启用状态" })
    depStatus: boolean

    @Column({ name: "dep_pid", comment: "部门父级id" })
    depPid: number

    @OneToMany(() => User, (user) => user.dep)
    users: User[]
}
