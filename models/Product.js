const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese un nombre para el producto'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Por favor ingrese una descripción'],
  },
  price: {
    type: Number,
    required: [true, 'Por favor ingrese un precio'],
    min: [0, 'El precio no puede ser negativo'],
  },
  stock: {
    type: Number,
    required: [true, 'Por favor ingrese el stock'],
    min: [0, 'El stock no puede ser negativo'],
  },
  category: {
    type: String,
    required: [true, 'Por favor ingrese una categoría'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);