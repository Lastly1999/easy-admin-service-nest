import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ExistUserDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    @ApiProperty({ example: "admin", description: "用户名" })
    readonly userName: string

    @IsNotEmpty({ message: "密码不能为空" })
    @ApiProperty({ example: "1234", description: "密码" })
    readonly passWord: string

    @IsNotEmpty({ message: "验证码id不能为空" })
    @ApiProperty({ example: "@1dadasdxx", description: "验证码id" })
    readonly captchaId: string

    @IsNotEmpty({ message: "验证码不能为空" })
    @ApiProperty({ example: "9999", description: "验证码" })
    readonly captchaCode: string
}
