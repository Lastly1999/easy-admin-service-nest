import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            // 如果没有传入验证规则，则不验证，直接返回数据
            return value
        }
        // 将路由的传递的dto参数 转为对象
        const object = plainToInstance(metatype, value)
        // 验证dto对象
        const errors = await validate(object)
        // 是否存在校验不通过的情况 errors是一个数组
        if (errors.length > 0) {
            const msg = Object.values(errors[0].constraints)[0] // 取第一个错误信息并返回
            throw new BadRequestException(`Validation failed: ${msg}`)
        }
        return value
    }

    /**
     * metatype的是否类型存在判断
     * @param metatype
     * @private
     */
    private toValidate(metatype: any): boolean {
        const types: any[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
