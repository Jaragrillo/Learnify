import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Contact = sequelize.define('Contactos', {
    id_contacto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_consulta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'contactos',
    timestamps: false,
});

export default Contact;  