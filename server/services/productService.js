const Product = require("../models/Product");

function create(data) {
  if (data.title == "" || data.description == "" || data.imageUrl == "") {
    throw new Error("Bạn không thể bỏ trống các trường!");
  }

  if (data.title.length < 4) {
    throw new Error("Tiêu đề phải có ít nhất 4 kí tự");
  }

  if (data.description.length < 5) {
    throw new Error("Mô tả phải có ít nhất 20 ký tự");
  }

  if (!/^https?:\/\//g.test(data.imageUrl)) {
    throw new Error("Hình ảnh nên được bắt đầu với http hoặc https");
  }

  if (+data.price < 0) {
    throw new Error("Giá tiền phải lớn hơn 0");
  }

  let product = new Product({ ...data });

  return product.save();
}

function getOne(id) {
  return Product.findById(id).lean();
}

async function getAll() {
  return await Product.find();
}

function updateOne(productId, data) {
  if (data.title == "" || data.description == "" || data.imageUrl == "") {
    throw new Error("Bạn không thể bỏ trống các trường!");
  }

  if (data.description.length < 20) {
    throw new Error("Mô tả phải có ít nhất 20 ký tự");
  }

  return Product.updateOne({ _id: productId }, data);
}

function deleteOne(productId) {
  return Product.deleteOne({ _id: productId });
}

module.exports = {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};
