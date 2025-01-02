import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @Length(5, 50)
  title: string;

  @IsString()
  @Length(20, 200)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString({ each: true, message: 'Provide at least one picture' })
  @ArrayMinSize(1)
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
