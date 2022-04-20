const faker = require('faker');
const boom = require('@hapi/boom');


class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(size = 10) {
    for (let i = 0; i < size; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.commerce.productDescription(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name: data.name,
      price: data.price,
      description: data.description,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.products), 4000);
    });
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //throw new Error('Product not found');
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //throw new Error('Product not found');
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1); // delete item starting in index and 1 position
    return { id };
  }
}

module.exports = ProductsServices;
