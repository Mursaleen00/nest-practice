// Nestjs Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

// DTO Imports
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  /*
        Get /product         Get All Products
        Get /product/:id     Get Single Products
        Post /product        Get Create a Products
        Patch /product/:id   Get Update Products
        Delete /product/:id  Get Remove Products
  */

  constructor(private readonly productServices: ProductsService) {}

  @Get() // Get All Products
  findAll() {
    return this.productServices.findAll();
  }

  @Get(':id') // Get Single Products
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productServices.findOne(id);
  }

  @Post() // Get Create a Products
  create(@Body(ValidationPipe) product: CreateProductDto) {
    return this.productServices.create(product);
  }

  @Patch(':id') // Get Update a Products
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) product: UpdateProductDto,
  ) {
    return this.productServices.update(id, product);
  }

  @Delete(':id') // Get Delete a Products
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productServices.delete(id);
  }
}
