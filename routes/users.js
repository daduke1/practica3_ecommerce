const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const userController = require('../controllers/users');

// Rutas públicas
router.post('/', userController.register);  // Registro de usuario
router.post('/login', userController.login); // Login

// Rutas protegidas
router.use(protect); // Middleware de autenticación para todas las rutas siguientes

router.get('/', authorize('admin'), userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;