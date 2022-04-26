import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common"

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        const message = exception.message
        Logger.error(message, "-------响应拦截错误-------")
        const errorResponse = {
            data: null, // 管道捕获到错误，此时响应的参数应该全部不包含data参数
            message: message, // 获取全部的错误信息
            code: exception.getStatus(), // 自定义code
            url: request.originalUrl, // 错误的url地址
        }
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status)
        response.header("Content-Type", "application/json; charset=utf-8")
        response.send(errorResponse)
    }
}
