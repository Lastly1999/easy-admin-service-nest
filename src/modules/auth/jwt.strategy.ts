import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { jwtConstants } from "./constants"

export type JwtTokenParams = {
    userName: string
    id: string
    roleId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: jwtConstants.secret,
        })
    }

    validate(payload: JwtTokenParams): JwtTokenParams {
        return { userName: payload.userName, id: payload.id, roleId: payload.roleId }
    }
}
