import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class RegisterUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  name: string

  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'Correo inválido' })
  email: string

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(6,  { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string

  @IsOptional()
  @IsString()
  role?: string
}

