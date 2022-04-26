import { Module } from "@nestjs/common"
import { BaseMenuService } from "./base-menu.service"
import { BaseMenuController } from "./base-menu.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BaseMenu } from "./base-menu.entity"

@Module({
    imports: [TypeOrmModule.forFeature([BaseMenu])],
    providers: [BaseMenuService],
    controllers: [BaseMenuController],
})
export class BaseMenuModule {}
