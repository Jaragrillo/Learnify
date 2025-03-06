'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function GlobalMiddlewareWrapper({ children }) {
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null; // Verificar si es el cliente

  React.useEffect(() => {
    if (searchParams) {
      // Capturar errores desde los parámetros de la URL
      const error = searchParams.get('error');

      if (error) {
        let title = 'Error';
        let text = '';
        let icon = 'error';

        // Definir mensajes basados en el tipo de error
        switch (error) {
          case 'unauthorized':
            title = 'Acceso denegado';
            text = 'No tienes permisos para acceder a esta página.';
            break;
          case 'invalid_token':
            title = 'Sesión inválida';
            text = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
            break;
          case 'no_token':
            title = 'Sesión requerida';
            text = 'Debes iniciar sesión para acceder.';
            break;
          default:
            text = 'Ha ocurrido un error desconocido.';
        }

        // Mostrar SweetAlert
        Swal.fire({
          icon,
          title,
          text,
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
            },
          buttonsStyling: false,
        }).then(() => {
          if (error === 'unauthorized') {
            router.push('/user/home'); // Redirigir a home
          } else {
            router.push('/login'); // Redirigir a login en otros casos
          }
        });
      }
    }
  }, [router, searchParams]);

  return <>{children}</>;
}
