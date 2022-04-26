import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const result = { code: 200, data, message: "request:success" }
                Logger.log(JSON.stringify(result), "-------响应正常拦截-------")
                return result
            })
        )
    }
}
