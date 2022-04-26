import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { UploadService } from "./upload.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { AuthGuard } from "@nestjs/passport"

@Controller("upload")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthGuard("jwt"))
    async testUpload(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadTest(file)
    }
}
