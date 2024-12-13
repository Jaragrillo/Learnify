import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '%$3CR3T_K3Y_L34RN1FY@2024@S3N4%';

export async function GET(req) {
  try {
    const token = req.cookies.get('auth-token');
    if (!token) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    // Verifica el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ role: decoded.role });
  } catch (error) {
    // Si el token es inválido o ha expirado, borra la cookie
    return NextResponse.json({ message: 'Sesión expirada' }, { status: 401 });
  }
}
