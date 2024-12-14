import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@/models/User.js';

const SECRET_KEY = '%$3CR3T_K3Y_L34RN1FY@2024@S3N4%';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // Validar datos de entrada
    if (!email || !password) {
      return NextResponse.json({ message: 'Correo y contraseña son requeridos.' }, { status: 400 });
    }

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { correo: email } });
    
    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
    }

    // Crear token JWT
    const token = jwt.sign(
        { id: user.id_usuario, email: user.correo, role: user.id_rol },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
    
    // Configurar la cookie 
    const response = NextResponse.json({ message: 'Inicio de sesión exitoso.' });
    response.cookies.set('auth-token', token, {
      secure: process.env.NODE_ENV === 'production', // Solo asegurado en producción
      sameSite: 'strict',
      maxAge: 3600, // 1 hora
      path: '/', // Disponible en toda la app
    });

    return response;

  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json({ message: 'Error en el servidor. Inténtalo más tarde.' }, { status: 500 });
  }
}
