const Product = require("../models/ProductModel");
const JwtService = require("./JwtService");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      price,
      countinstock,
      description,
      discount,
      selled,
      cpu,
      screen,
      ram,
      memory,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "Tên sản phẩm đã tồn tại",
        });
      }

      const createdProduct = await Product.create({
        name,
        image,
        type,
        countinstock,
        price,
        description,
        discount,
        selled,
        cpu,
        screen,
        ram,
        memory,
      });

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      return resolve({
        status: "OK",
        message: "Success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      return resolve({
        status: "OK",
        message: "All Product",
        data: checkProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      return resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();

      if (filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: { $regex: filter[1], $options: "i" },
        });
        return resolve({
          status: "OK",
          message: "All Product",
          data: allProductFilter,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        return resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);
      return resolve({
        status: "OK",
        message: "All Product",
        data: allProduct,
        total: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductFilter = (valueFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const minPrice = parseInt(valueFilter.price[0]) * 1000000;
      const maxPrice = parseInt(valueFilter.price[1]) * 1000000;

      const condition = {
        $and: [
          { type: { $in: valueFilter.type } },
          { memory: { $in: valueFilter.memory } },
          { $expr: { $gte: [{ $toInt: "$price" }, minPrice] } },
          { $expr: { $lte: [{ $toInt: "$price" }, maxPrice] } },
        ],
      };

      // Lọc ra các sản phẩm thỏa mãn điều kiện
      const allProduct = await Product.find(condition);
      return resolve({
        status: "OK",
        message: "All Product Filter",
        data: allProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  getAllProductFilter,
};
