import { IsNotEmpty } from "class-validator"

export class FindUserDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    readonly userName: string

    @IsNotEmpty({ message: "密码不能为空" })
    readonly passWord: string

    @IsNotEmpty({ message: "验证码id不能为空" })
    readonly captchaId: string

    @IsNotEmpty({ message: "验证码不能为空" })
    readonly captchaCode: string
}
