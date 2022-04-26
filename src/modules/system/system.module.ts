import { Module } from "@nestjs/common"
import { SystemController } from "./system.controller"
import { SystemService } from "./system.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SystemRepository } from "./system.repository"

@Module({
    imports: [TypeOrmModule.forFeature([SystemRepository])],
    controllers: [SystemController],
    providers: [SystemService],
})
export class SystemModule {}
