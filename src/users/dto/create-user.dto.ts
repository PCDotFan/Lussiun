import { IsString, IsInt, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly nickname: string;

    @IsEmail()
    readonly email: string;

    @MinLength(6, {
        message: '密码过短，请重新输入',
    })
    password: string;

    readonly introduction: string;
}