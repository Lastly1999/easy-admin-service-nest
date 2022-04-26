import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsNumber()
    roleId: number

    roleName: string

    describe: string
}
