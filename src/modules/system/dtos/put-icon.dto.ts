import { IsNotEmpty } from "class-validator"

export class PutIconDto {
    @IsNotEmpty()
    iconName: string
}
