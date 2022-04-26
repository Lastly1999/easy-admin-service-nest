import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserRepository } from "./user.repository"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { FindUserDto } from "./dtos/find-user.dto"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    /**
     * 查找用户
     * @param userName
     * @param passWord
     */
    async findUser(userName: string, passWord: string) {
        try {
            const result = await this.userRepository.findOne({ where: { userName, passWord } })
            if (!result) throw new HttpException("暂未注册用户", HttpStatus.INTERNAL_SERVER_ERROR)
            return result
        } catch (e) {
            throw new HttpException("发生未知错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 查询系统用户列表
     * @param findUserDto
     */
    async findUserAll(findUserDto: FindUserDto) {
        return await this.userRepository.findAllUsers(findUserDto.pageSize, findUserDto.pageNo, findUserDto.keywords)
    }

    /**
     * 创建用户
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto) {
        await this.userRepository.createUserInsertRoleIds(createUserDto).catch(() => {
            throw new HttpException("创建失败", HttpStatus.INTERNAL_SERVER_ERROR)
        })
        return "创建成功"
    }

    /**
     * 更新用户信息
     * @param updateUserDto
     */
    async updateUser(updateUserDto: UpdateUserDto) {
        try {
            const user = new User()
            user.id = updateUserDto.id
            user.userName = updateUserDto.userName
            user.nikeName = updateUserDto.nikeName
            await this.userRepository.update(user, updateUserDto)
        } catch (e) {
            throw new HttpException("更新失败", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 获取用户详情
     * @param id
     */
    async getUserInfoById(id: string) {
        const userInfo = await this.userRepository.findUserInfoById(id)
        if (!userInfo) {
            throw new HttpException("暂无用户信息", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return userInfo
    }

    /**
     * 获取用户角色的ids列表
     * @param id
     */
    async getUserRoles(id: string) {
        try {
            const rolesRes = await this.userRepository.findUserRoles(Number(id))
            return rolesRes.roles.map((item) => item.roleId)
        } catch (e) {
            throw new HttpException("系统错误", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    /**
     * 更新用户信息（及角色状态）
     * @param updateUserDto
     */
    async updateUserInfoOrRoles(updateUserDto: UpdateUserDto) {
        try {
            // 更新用户信息
            const user = new User()
            user.id = updateUserDto.id
            user.userName = updateUserDto.userName
            user.nikeName = updateUserDto.nikeName
            user.roles = [
                {
                    roleId: Number(updateUserDto.roleIds[0]),
                },
            ]
            await this.userRepository.save(user)
        } catch (e) {
            throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
