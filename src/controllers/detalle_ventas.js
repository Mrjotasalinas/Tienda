const DetalleVenta = require('../models/detalle_ventas');
const Venta = require('../models/ventas')

const httpDetalle = {
    // Listar detalle de venta por ID de venta
    listarDetalleVentaPorIdVenta: async (req, res) => {
        const { idVenta } = req.params;
        try {
            const detallesVenta = await DetalleVenta.find({ idVenta });
            res.json(detallesVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Insertar nuevo detalle de venta
    insertarDetalleVenta: async (req, res) => {
        const { idventa, idproductos, cantidad, descuento } = req.body;
        const totalsin = cantidad * req.productobd.precio
        const total = totalsin * (1 - descuento / 100)
        try {
            const detalleVenta = new DetalleVenta({ idventa, idproductos, cantidad, descuento, total });
            await detalleVenta.save();

            const detallesVenta = await DetalleVenta.find({ idventa });
            const ValorTotalVentas = detallesVenta.reduce((acumulador, detalle) => acumulador + detalle.total, 0);
            await Venta.findByIdAndUpdate(idventa, { ValorTotalVenta: ValorTotalVentas })

            res.status(201).json(detalleVenta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Modificar detalle de venta
    modificarDetalleVenta: async (req, res) => {
        const { id } = req.params;
        const { cantidad, descuento } = req.body;
        try {
            const detalleVenta = await DetalleVenta.findByIdAndUpdate(id, { cantidad, descuento }, { new: true });
            res.json(detalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { httpDetalle };