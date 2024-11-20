import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { authorizationToLoginPayload } from "../utils/base-64-converter";

export const UserId = createParamDecorator((_, ctx: ExecutionContext) =>{
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayLoad = authorizationToLoginPayload(authorization);

    return loginPayLoad?.id;
});

//CASO EU PASSE A CONSTANTE UserId NO LUGAR DO PARAMETRO , O ID DO USUARIO LOGADO SERÁ PASSADO