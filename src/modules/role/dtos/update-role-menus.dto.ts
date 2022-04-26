import { IsNotEmpty } from "class-validator"

export class UpdateRoleMenusDto {
    readonly permissionId: number[]
    @IsNotEmpty({ message: "角色id不可为空!" })
    readonly roleId: number
}
