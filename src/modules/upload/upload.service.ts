import { Injectable, Logger } from "@nestjs/common"
import { join } from "path"
import { createWriteStream } from "fs"

@Injectable()
export class UploadService {
    async uploadTest(file: Express.Multer.File) {
        const fileName = file.filename
        const fileButter = file.buffer
        const filePath = join(__dirname, "../../../static/", `${fileName}.txt`)
        const streamOptions = await createWriteStream(filePath)
        streamOptions.write(fileButter)
        return filePath
    }
}
