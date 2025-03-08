import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Payment = sequelize.define('Payment', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_factura: {
        type: DataTypes.INTEGER,
        references: {
            model: 'facturas',
            key: 'id_factura',
        },
    },
    metodo_pago: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'pagos',
    timestamps: false,
});

export default Payment;