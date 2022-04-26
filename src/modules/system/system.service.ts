import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { SystemRepository } from "./system.repository"

@Injectable()
export class SystemService {
    constructor(@InjectRepository(SystemRepository) private readonly systemRepository: SystemRepository) {}

    /***
     * 查询系统图标集
     */
    async getIcons() {
        return this.systemRepository.getIcons()
    }
}
