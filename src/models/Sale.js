import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Sale = sequelize.define('Sale', {
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_curso: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cursos',
            key: 'id_curso',
        },
    },
    id_autor: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cursos',
            key: 'id_autor',
        },
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id_usuario',
        },
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_factura: {
        type: DataTypes.INTEGER,
        references: {
            model: 'facturas',
            key: 'id_factura',
        },
    },
}, {
    tableName: 'ventas',
    timestamps: false,
});

export default Sale;