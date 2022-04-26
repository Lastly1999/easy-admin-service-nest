import { Injectable } from "@nestjs/common"
import * as svgCaptcha from "svg-captcha"
import { RedisCacheService } from "../redis-cache/redis-cache.service"

@Injectable()
export class ToolsService {
    constructor(private readonly redisCacheService: RedisCacheService) {}

    /**
     * 生成图形验证码
     * @param keyName 缓存的key前缀
     * @param size 验证码长度
     * @param ttl 过期时间
     */
    async generateSvgCode(keyName: string, size = 4, ttl: number) {
        const cap = svgCaptcha.create()
        const mathId = Number(Math.random() + Date.now()).toFixed(0)
        await this.redisCacheService.set(keyName + mathId, cap.text, ttl)
        return { cap: cap.data, captchaId: mathId }
    }

    /**
     * 验证图形验证码
     * @param keyPrefix 缓存的key前缀 -redis
     * @param mathId 验证码缓存id
     * @param mathText 验证码内容
     */
    async verifySvgCode(keyPrefix: string, mathId: string, mathText: string) {
        const keyName = keyPrefix + mathId
        const result = await this.redisCacheService.get(keyName)
        if (!result || result !== mathText) {
            return false
        }
        await this.redisCacheService.del(keyName)
        return true
    }
}
