import { MyCustomLogger } from "./typeorm-log"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"

export default {
    type: "mysql",
    host: "rm-wz94k0l69605b622nwo.mysql.rds.aliyuncs.com",
    port: 3306,
    username: "root",
    password: "Chen1027",
    database: "easy_cms_base",
    entities: ["dist/**/**/**/*.entity{.ts,.js}", "dist/**/**/**/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    logger: new MyCustomLogger(),
} as TypeOrmModuleAsyncOptions
