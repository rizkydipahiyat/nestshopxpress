import { IsNotEmpty, IsString, IsNumber, IsEnum, IsEmpty, IsArray, ArrayNotEmpty } from "class-validator"
import { Category, Size } from "../schemas/product.schema"
import { User } from "src/auth/schemas/user.schema"

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsArray()
  readonly images: string[]

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsNumber()
  readonly price: number
  
  
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.'})
  readonly category: Category

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty({ message: 'Please provide at least one size.' }) // Pastikan array tidak kosong
  readonly size: Size[]

  @IsNotEmpty()
  @IsNumber()
  readonly numReviews: number

  @IsNotEmpty()
  @IsNumber()
  readonly countInStock: number
  
  
  @IsEmpty({ message: 'You cannot pass user id.'})
  readonly user: User
}