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
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// DTO Imports
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { ProductsService } from './products.service';
import { ALLProductsDto } from './dto/all-products.dto';
import { AuthGuard } from 'src/auth/login/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productServices: ProductsService) {}

  @Get() // Get All Products
  findAll(@Query() query: ALLProductsDto) {
    return this.productServices.findAll(query);
  }

  @Get(':id') // Get Single Products
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productServices.findOne(id);
  }

  @Post() // Get Create a Products
  create(@Body(ValidationPipe) product: CreateProductDto) {
    return this.productServices.create(product);
  }

  @UseGuards(AuthGuard)
  @Patch(':id') // Get Update a Products
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) product: UpdateProductDto,
    @Request() req,
  ) {
    return this.productServices.update(id, product, req.user);
  }

  @Delete(':id') // Get Delete a Products
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productServices.delete(id);
  }
}
