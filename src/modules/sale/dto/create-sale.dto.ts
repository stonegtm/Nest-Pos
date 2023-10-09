import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {
    @ApiProperty()
    product_id: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    unit_price: number;

    @ApiProperty()
    total_price: number;
}
