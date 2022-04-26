import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("sys_icons")
export class SysIcon {
    @PrimaryGeneratedColumn({ comment: "图标id" })
    id?: number

    @Column({ name: "icon_name", comment: "图标名称" })
    iconName: string

    @CreateDateColumn({ name: "create_at" })
    createAt?: Date

    @UpdateDateColumn({ name: "update_at" })
    updateAt?: Date
}
