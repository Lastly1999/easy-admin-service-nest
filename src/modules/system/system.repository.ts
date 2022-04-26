import { Like, Repository, EntityRepository } from "typeorm"
import { SysIcon } from "./entitys/sys-icon.entitys"

@EntityRepository(SysIcon)
export class SystemRepository extends Repository<SysIcon> {
    /**
     * 查询系统图标集
     */
    async getIcons() {
        return this.manager.getRepository(SysIcon).find()
    }
}
