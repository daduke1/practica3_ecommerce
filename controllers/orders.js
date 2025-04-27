const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Obtener todas las órdenes del usuario
// @route   GET /api/orders
// @access  Private
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes del usuario
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

// @desc    Obtener una orden
// @route   GET /api/orders/:id
// @access  Private
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden encontrada
 */
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    
    // Verificar que el usuario sea el dueño de la orden
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'No autorizado para acceder a esta orden' 
      });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

// @desc    Crear nueva orden
// @route   POST /api/orders
// @access  Private
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    
    // Verificar que todos los productos existan y tengan suficiente stock
    let total = 0;
    const orderProducts = [];
    
    for (const item of products) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Producto con ID ${item.productId} no encontrado` 
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Stock insuficiente para el producto ${product.name}` 
        });
      }
      
      total += product.price * item.quantity;
      orderProducts.push({
        productId: item.productId,
        quantity: item.quantity,
      });
      
      // Reducir el stock del producto
      product.stock -= item.quantity;
      await product.save();
    }
    
    // Crear la orden
    const order = await Order.create({
      userId: req.user.id,
      products: orderProducts,
      total,
    });
    
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};