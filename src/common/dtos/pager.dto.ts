import { IsNotEmpty } from "class-validator"

export class PagerDto {
    @IsNotEmpty()
    pageSize: number

    @IsNotEmpty()
    pageNo: number

    keywords: string
}
