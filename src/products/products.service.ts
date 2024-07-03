import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/product-update.dto';
import { CreateProductDto } from './dto/product-create.dto';

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
      title: 'Mobile',
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
  ];

  // Find All Products
  findAll() {
    if (this.products.length == 0)
      throw new NotFoundException('There Is No Product Yet');
    return this.products;
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
  update(id: number, product: UpdateProductDto) {
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
