import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    readonly userName: string

    @IsNotEmpty({ message: "密码不能为空" })
    readonly passWord: string

    @IsNotEmpty({ message: "用户昵称不能为空" })
    readonly nikeName: string

    @IsNotEmpty({ message: "角色id不能为空" })
    @IsString({ message: "角色id只能为string类型" })
    readonly roleId: string

    @IsNotEmpty({ message: "角色id列表不能为空" })
    readonly roleIds: string[]

    readonly userAvatar: string
}
