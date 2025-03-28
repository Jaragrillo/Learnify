'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const correo = searchParams.get('correo');
    const [contraseña, setContraseña] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const validateScriptInjection = (value) => {
        const scriptRegex = /<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i;
        if (scriptRegex.test(value)) {
            return false;
        }
        return true;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
        if (!password.trim()) {
            showAlert('La Contraseña es obligatoria.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            showAlert('La Contraseña debe tener entre 8 y 16 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        if (password.trim() !== password) {
            showAlert('La Contraseña no debe tener espacios en blanco al inicio o al final.');
            return false;
        }
        if (password.includes('  ')) {
            showAlert('La Contraseña no debe tener espacios en blanco dobles.');
            return false;
        }
        if (!validateScriptInjection(password)) {
            showAlert('La Contraseña no debe contener código HTML o scripts.');
            return false;
        }
        return true;
    };

    const showAlert = (message) => {
        Swal.fire({
            title: 'Error de Validación',
            text: message,
            icon: 'error',
            confirmButtonText: 'Entendido',
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
            },
            buttonsStyling: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(contraseña)) return;

        Swal.fire({
            title: 'Restableciendo contraseña...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const response = await fetch('/api/auth/reset-password/direct', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña restablecida',
                    text: data.message,
                    confirmButtonText: 'Iniciar sesión',
                }).then(() => {
                    router.push('/login');
                });
            } else {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error || 'Error al restablecer la contraseña.',
                    confirmButtonText: 'Reintentar',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'Error al procesar la solicitud.',
                confirmButtonText: 'Entendido',
            });
        }
    };

    return (
        <div className="bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex justify-center items-center h-[80vh]">
            <div className="bg-white p-8 rounded shadow-lg shadow-black/60 w-96 m-5 sm:m-0">
                <h2 className="text-xl sm:text-2xl font-medium mb-4">Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#0D1D5F] text-xl mb-2" htmlFor="contraseña">
                            Nueva Contraseña
                        </label>
                        <div className='relative'>
                            <input
                                id="contraseña"
                                placeholder="Nueva Contraseña"
                                type={showPassword ? "text" : "password"}
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                className="shadow shadow-black/60 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Image
                                    src={showPassword ? "/svg/passwordEyeOn.svg" : "/svg/passwordEyeOff.svg"}
                                    alt="password-Eye-svg"
                                    width={24}
                                    height={24}
                                    className="absolute top-0 bottom-0 right-3 m-auto"
                                />
                            </button>
                        </div>
                    </div>
                    <button
                        className="bg-[#1F84BA] hover:bg-[#3192c6] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Restablecer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex justify-center items-center h-[80vh]">
                <div className="bg-white p-8 rounded shadow-lg shadow-black/60 w-96 m-5 sm:m-0">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="h-12 bg-gray-300 rounded mb-4"></div>
                        <div className="h-12 bg-gray-300 rounded mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}