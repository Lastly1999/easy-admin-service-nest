import { CacheModule, Global, Module } from "@nestjs/common"
import { RedisCacheService } from "./redis-cache.service"
import redisConfig from "../../common/config/cache.config"
import * as redisStore from "cache-manager-redis-store"

@Global()
@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: redisConfig.host,
            port: redisConfig.port,
            auth_pass: redisConfig.password,
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule { }
