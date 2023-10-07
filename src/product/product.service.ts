import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Query } from 'express-serve-static-core'

type SortOrder = 1 | -1;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  async findAll(query: Query): Promise<{data: Product[]; currentPage: number; perPage: number; totalPages: number}> {
    const perPage = Number(query.perPage) || 5;
    const currentPage = Number(query.page) || 1;
    const skip = perPage * (currentPage - 1);

    const keyword = query.keyword ? {
      title: {
        $regex: query.keyword,
        $options: 'i'
      }
    } : {}

    const category = query.category ? {
      category: query.category
    } : {}

    const sortOptions: {[key: string]: SortOrder} = {}

    if(query.sortBy) {
      switch (query.sortBy) {
        case 'name':
          sortOptions.title = 1; // Pengurutan nama secara ascending (A-Z)
          break;
        case 'priceAsc':
          sortOptions.price = 1; // Pengurutan harga secara ascending (rendah-tinggi)
          break;
        case 'priceDesc':
          sortOptions.price = -1; // Pengurutan harga secara descending (tinggi-rendah)
          break;
        default:
          break;
      }
    }

    // total pages
    const totalProducts = await this.productModel.countDocuments({ ...keyword, ...category });

    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await this.productModel.find({ ...keyword, ...category }).limit(perPage).skip(skip).sort(sortOptions)

    return {
      data: products,
      currentPage: currentPage,
      perPage: perPage,
      totalPages: totalPages
    }

  }

  async create(product: Product, user: User): Promise<Product> {
    const data = Object.assign(product, { user: user._id})
    const res = await this.productModel.create(data)
    return res
  }
  
}
