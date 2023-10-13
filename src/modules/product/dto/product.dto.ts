import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ type: String, example: `xxxxx` })
  name: string;
  @ApiProperty({ type: String, example: `xxxxx` })
  description?: string;
  @ApiProperty({ type: String, example: `xxxxx` })
  quantity?: number;
  @ApiProperty({ type: String, example: `xxxxx` })
  price: number;
  @ApiProperty({ type: String, example: `xxxxx` })
  category_id?: string;
  @ApiProperty()
  files?: any;
  @ApiProperty()
  image_delete?: any;
}

export class ProductUpdateStockDto {
  @ApiProperty({ type: String, example: `xxxxx` })
  data_stock: string;
}
