import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const InvoiceDetail = sequelize.define('InvoiceDetail', {
    id_detalle: {
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
    id_curso: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cursos',
            key: 'id_curso',
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'detalle_factura',
    timestamps: false,
});

export default InvoiceDetail;