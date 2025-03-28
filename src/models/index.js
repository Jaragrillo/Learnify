import User from './User.js';
import Role from './Role.js';
import Course from './Course.js';
import CourseContent from './CourseContent.js';
import Rating from './Rating.js';
import Comment from './Comment.js';
import Category from './Category.js';
import Contact from './Contact.js'
import Invoice from './Invoice.js';
import InvoiceDetail from './InvoiceDetail.js';
import Sale from './Sale.js';
import Payments from './Payments.js';

// Relación entre modelos
User.belongsTo(Role, { foreignKey: 'id_rol', as: 'rol' });
Role.hasMany(User, { foreignKey: 'id_rol' });
User.hasMany(Course, { as: 'cursos', foreignKey: 'id_autor' });
Course.belongsTo(User, { as: 'autor', foreignKey: 'id_autor' });
Course.hasMany(CourseContent, { as: 'clases', foreignKey: 'id_curso' });
CourseContent.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Rating, { foreignKey: 'id_curso', as: 'valoraciones' });
Rating.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Comment, { foreignKey: 'id_curso', as: 'comentarios' });
Comment.belongsTo(Course, { foreignKey: 'id_curso' });
User.hasMany(Comment, { foreignKey: 'id_usuario', as: 'comentarios' });
Comment.belongsTo(User, { foreignKey: 'id_usuario', as: 'usuario' });
Course.belongsTo(Category, { foreignKey: 'id_categoria', as: 'categoria' });
Category.hasMany(Course, { foreignKey: 'id_categoria', as: 'cursos' });

// Relaciones de los pagos
Invoice.belongsTo(Course, { foreignKey: 'id_curso' });
Invoice.hasMany(InvoiceDetail, { foreignKey: 'id_factura' });
InvoiceDetail.belongsTo(Invoice, { foreignKey: 'id_factura' });
InvoiceDetail.belongsTo(Course, { foreignKey: 'id_curso' });
Sale.belongsTo(Course, { foreignKey: 'id_curso' });
// Sale.belongsTo(Course, { foreignKey: 'id_autor', as: 'Autor' });
Sale.belongsTo(User, { foreignKey: 'id_cliente', as: 'Cliente' });
Sale.belongsTo(User, { foreignKey: 'id_autor', as: 'Autor' });
Payments.belongsTo(Invoice, { foreignKey: 'id_factura' });

export { User, Role, Course, CourseContent, Rating, Comment, Category, Contact, Invoice, InvoiceDetail, Sale, Payments };
