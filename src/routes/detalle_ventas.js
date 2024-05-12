const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpDetalle } = require('../controllers/detalle_ventas.js')
const { DetalleHelper } = require('../helpers/detalle_ventas.js');
const { productoHelper } = require('../helpers/productos.js');
const { VentaHelper} = require('../helpers/ventas.js');


router.get('/listarDetalle/:id', [
    check('idventa', 'No es un ID válido').isMongoId(),
    check('idventa').custom(VentaHelper.existVentaID),
    validarCampos
], httpDetalle.listarDetalleVentaPorIdVenta);

router.post('/', [
    check('idventa', 'No es un ID válido').isMongoId(),
    check('idventa').custom(VentaHelper.existVentaID),
    check('idproductos', 'No es un ID válido').isMongoId(),
    check('idproductos').custom(productoHelper.existeProductoID),
    check('cantidad', 'la cantidad es obligatoria').notEmpty(),
    check('cantidad', 'la cantidad tiene que se un numero').isNumeric(),
    check('descuento', 'el descuento tiene que se un numero').isNumeric(),
    validarCampos
], httpDetalle.insertarDetalleVenta);

router.put('/modificarDetalle/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(DetalleHelper.existeDetalleID),
    check('cantidad').optional().notEmpty().withMessage('La cantidad es obligatoria').isNumeric().withMessage('La cantidad tiene que ser un número'),
    check('descuento').optional().isNumeric().withMessage('El descuento tiene que ser un número'),
    validarCampos
], httpDetalle.modificarDetalleVenta);

module.exports = router;

