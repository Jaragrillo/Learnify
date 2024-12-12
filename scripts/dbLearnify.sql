-- Crear la base de datos Learnify
CREATE DATABASE learnify;

-- Conectar a la base de datos Learnify
\c learnify;

-- Tabla Roles
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    rol VARCHAR(255) NOT NULL
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT REFERENCES roles(id_rol) ON DELETE SET NULL
);

-- Tabla Categorias
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    categoria VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla Cursos
CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    img_portada BYTEA, -- Variable para imagen
    precio DECIMAL(10, 2) NOT NULL,
    estudiantes INT DEFAULT 0,
    id_autor INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla Contenido_curso
CREATE TABLE contenido_curso (
    id_clase SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    url_video VARCHAR(255) NOT NULL 
);

-- Tabla Valoraciones
CREATE TABLE valoraciones (
    id_valoracion SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    puntuacion INT CHECK (puntuacion >= 1 AND puntuacion <= 5)
);

-- Tabla Comentarios
CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    comentario TEXT,
    fecha_comentario DATE DEFAULT CURRENT_DATE
);

-- Tabla Facturas
CREATE TABLE facturas (
    id_factura SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_factura DATE DEFAULT CURRENT_DATE
);

-- Tabla Detalle_factura
CREATE TABLE detalle_factura (
    id_detalle SERIAL PRIMARY KEY,
    id_factura INT REFERENCES facturas(id_factura) ON DELETE CASCADE,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL
);

-- Tabla Ventas
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso) ON DELETE CASCADE,
    id_autor INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_cliente INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_compra DATE DEFAULT CURRENT_DATE
);

-- Tabla Pagos
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_factura INT REFERENCES facturas(id_factura) ON DELETE CASCADE,
    metodo_pago VARCHAR(255) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE DEFAULT CURRENT_DATE
);

-- Tabla Contactos (para mensajes del formulario de contacto)
CREATE TABLE contactos (
    id_contacto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    tipo_consulta VARCHAR(255),
    mensaje TEXT NOT NULL
);
