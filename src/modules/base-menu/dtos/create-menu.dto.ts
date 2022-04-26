import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateMenuDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    path: string
    @IsNotEmpty()
    @IsNumber()
    parentId: number
    icon: string
}
