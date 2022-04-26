import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty({ message: "用户id不能为空" })
    @IsNumber({})
    readonly id: number
    @IsNotEmpty({ message: "用户名不能为空" })
    readonly userName: string
    @IsNotEmpty({ message: "用户昵称不能为空" })
    readonly nikeName: string
    readonly roleId: string
    readonly roleIds: string[]
    readonly userAvatar: string
}
