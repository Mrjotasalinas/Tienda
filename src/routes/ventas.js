const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpVenta } = require('../controllers/ventas.js')
const { clienteHelper } = require('../helpers/clientes.js');
const { VentaHelper } = require('../helpers/ventas.js');


router.get('/', httpVenta.listarTodo);
router.get('/activas', httpVenta.listarActivas);
router.get('/inactivas', httpVenta.listarInactivas);

router.get('/fechas/:inicio/:fin', httpVenta.listarPorRangoDeFechas);

router.get('/totalventas/:inicio/:fin', httpVenta.calcularTotalPorRangoDeFechas);

router.get('/totaldescuento', httpVenta.calcularTotalDescuento);    


router.get('/valor/:valor', [
    check('ValorTotalVenta', "el valor es invalido").isNumeric(),
    validarCampos
], httpVenta.listarPorValorSuperior);


router.get('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.obtenerPorId);

router.get('/cliente/:id', [
    check('idcliente', 'id es invalido').isMongoId(),
    check('idcliente').custom(clienteHelper.existeClienteID),
    validarCampos
], httpVenta.listarPorCliente);



router.post('/', [
    check('idcliente', 'id es invalido').isMongoId(),
    check('idcliente').custom(clienteHelper.existeClienteID),
    check("fecha", "La fecha es obligatoria").notEmpty(),
    check('ValorTotalVenta', "el valor es invalido").isNumeric(),
    validarCampos
], httpVenta.crear);

router.put('/actualizar/:id', [
    check('id', 'ID de venta inválido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    check("fecha", "La fecha es obligatoria").optional().notEmpty(),
    validarCampos
], httpVenta.actualizar);


router.put('/activar/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.activar);

router.put('/desactivar/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.desactivar);


module.exports = router;