import { MyCustomLogger } from "./typeorm-log"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"

export default {
    type: "mysql",
    host: "",
    port: 3306,
    username: "",
    password: "",
    database: "fnv",
    entities: ["dist/**/**/**/*.entity{.ts,.js}", "dist/**/**/**/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    logger: new MyCustomLogger(),
} as TypeOrmModuleAsyncOptions
