import { IsNotEmpty } from "class-validator"

export class PutRoleDto {
    @IsNotEmpty()
    readonly roleName: string

    readonly describe: string
}
