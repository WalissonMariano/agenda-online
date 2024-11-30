import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({
        description: 'Email cadastrado.',
        example: 'teste@gmail.com',
      })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Senha cadastrada.',
        example: 'teste123',
      })
    @IsString()
    password: string;
}