import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Product } from './schemas/product.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Get()
  async getAllProducts(@Query() query: ExpressQuery): Promise<{ data: Product[]; currentPage: number; perPage: number; totalPages: number }> {
    return this.productService.findAll(query)
  }

  @Post()
  @UseGuards(AuthGuard())
  async createProduct(@Body() product: CreateProductDto, @Req() req): Promise<Product> {
    if(req.user.isAdmin) {
      return this.productService.create(product, req.user)
    }
  }
}
