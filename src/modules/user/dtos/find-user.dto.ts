import { PagerDto } from "../../../common/dtos/pager.dto"

export class FindUserDto extends PagerDto {
    readonly endTime: string
    readonly keyWords: string
    readonly startTime: string
    readonly time: string[]
}
