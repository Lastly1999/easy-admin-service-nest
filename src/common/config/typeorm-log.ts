import { Logger as Nestlogger } from "@nestjs/common"
import { Logger, QueryRunner } from "typeorm"

export class MyCustomLogger implements Logger {
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        Nestlogger.log(message, "TypeORMLog")
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        Nestlogger.log("TypeORMMigration", message)
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        Nestlogger.log(
            query
                .toString()
                .replace(/\ +/g, "")
                .replace(/[\r\n]/g, " "),
            "TypeORMLog"
        )
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        Nestlogger.error(`${error}`, "TypeORMQueryError")
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        Nestlogger.warn(`${query};Time:${time}`, "TypeORMQuerySlow")
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        Nestlogger.warn(message, "TypeORMSchemaBuild")
    }
}
