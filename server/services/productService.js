const Product = require('../models/Product');

function create(data) {

   if (data.title == '' || data.description == '' || data.imageUrl == '') {
      throw new Error('You can not have empty fields!')
   }

   if (data.title.length < 4) {
      throw new Error('The title should be at least 4 characters')
   }

   if (data.description.length < 5) {
      throw new Error('The description should be at least 20 characters')
   }

   if (!/^https?:\/\//g.test(data.imageUrl)) {
      throw new Error('The image should be start with http or https')
   }

   if (+data.price < 0) {
      throw new Error('The price should be bigger than zero')
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
   if (data.title == '' || data.description == '' || data.imageUrl == '') {
      throw new Error('You can not have empty fields!')
   }

   if (data.description.length < 20) {
      throw new Error('The description should be at least 20 characters')
   }

   return Product.updateOne({ _id: productId }, data)
}

function deleteOne(productId) {
   return Product.deleteOne({ _id: productId })
}

module.exports = {
   create,
   getOne,
   getAll,
   updateOne,
   deleteOne,
}