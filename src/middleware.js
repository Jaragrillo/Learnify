import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log(`Middleware ejecutado para la ruta: ${pathname}`);

  const tokenCookie = req.cookies.get('auth-token');
  const token = tokenCookie ? tokenCookie.value : null;

  if (token && typeof token === 'string' && token.split('.').length === 3) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Token decodificado:", payload);

      const userRole = payload.role;

      // Validar acceso a rutas protegidas
      // Excepción para /user/profile y /user/profile/edit
      if (pathname.startsWith('/user/profile')) {
        return NextResponse.next(); // Permite el acceso sin importar el rol
      }

      if (pathname.startsWith('/manage/') && userRole !== 1) {
        const url = new URL('/user/home', req.url);
        url.searchParams.set('error', 'unauthorized'); // Añadimos el mensaje
        return NextResponse.redirect(url);
      }

      if (pathname.startsWith('/user/') && userRole !== 2) {
        const url = new URL('/manage/dashboard', req.url);
        url.searchParams.set('error', 'unauthorized'); // Añadimos el mensaje
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      const url = new URL('/login', req.url);
      url.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(url);
    }
  } else {
    console.log("Token no encontrado o inválido.");
    const url = new URL('/login', req.url);
    url.searchParams.set('error', 'no_token');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/manage/:path*'],
};
