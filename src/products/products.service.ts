import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/product-update.dto';
import { CreateProductDto } from './dto/product-create.dto';
import { ALLProductsDto } from './dto/all-products.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 0,
      title: 'Keyboard',
      description: 'This is a Devise',
      image: '/',
    },
    {
      id: 1,
      title: 'Tablet',
      description: 'This is a Devise',
      image: '/',
    },
    {
      id: 2,
      title: 'Mobile Phone',
      description: 'This is a Devise',
      image: '/',
    },
    {
      id: 3,
      title: 'Laptop',
      description: 'This is a Devise',
      image: '/',
    },
    {
      id: 4,
      title: 'Mouse',
      description: 'This is a Devise',
      image: '/',
    },
    {
      id: 5,
      title: 'Mobile',
      description: 'This is a Mobile',
      image: '/',
    },
  ];

  // Find All Products
  findAll(query: ALLProductsDto) {
    if (this.products.length == 0) return { products: [], total: 0 };

    if (Object.keys(query).length > 0) {
      // LIMIT & PAGE
      if (query.limit && query.page) {
        return {
          products: this.products.slice(
            (query.page - 1) * query.limit,
            query.page * query.limit,
          ),
          total: this.products.length,
        };
      }

      // Search
      if (query.search) {
        return (this.products = this.products.filter((p) =>
          p.title.toLowerCase().includes(query.search.toLowerCase()),
        ));
      }
    } else return { products: this.products, total: this.products.length };
  }

  // Find One Product
  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('Product Is Not Available');
    return product;
  }

  create(product: CreateProductDto) {
    const creatingId = [...this.products].sort((a, b) => b.id - a.id);
    const newProduct = { id: creatingId[0].id + 1, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  // Update Product
  update(id: number, product: UpdateProductDto, user: any) {
    if (user.email !== 'john@gmail.com') {
      throw new NotFoundException('You are not allowed to update');
    }
    this.products = this.products.map((p) => {
      if (p.id == id) return { ...p, ...product };
      return p;
    });
    return this.findOne(id);
  }

  // Delete product
  delete(id: number) {
    const remove = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return remove;
  }
}
