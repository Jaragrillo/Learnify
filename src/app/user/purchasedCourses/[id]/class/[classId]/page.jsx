'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import jsCookie from 'js-cookie';
import ClassSkeleton from "@/components/skeletons/ClassSkeleton";

export default function purchasedCourseClassPage() {
    const pathname = usePathname();
    const parts = pathname.split('/');
    const courseId = parts[3]; // Obtener el ID del curso
    const classId = parts[5]; // Obtener el ID de la clase
    const router = useRouter();

    const [claseData, setClaseData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isPurchaseChecking, setIsPurchaseChecking] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [claseResponse, courseResponse] = await Promise.all([
                    fetch(`/api/courses/course/class/${classId}`),
                    fetch(`/api/courses/course/${courseId}`)
                ]);

                const [claseData, courseData] = await Promise.all([
                    claseResponse.json(),
                    courseResponse.json()
                ]);

                setClaseData(claseData);
                setCourseData(courseData);

                const token = jsCookie.get('auth-token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    setCurrentUserId(userId);

                    if (courseData) {
                        setIsAuthor(courseData.autor.id_autor === userId);
                        await checkPurchase(userId, courseId, courseData);
                    }
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los datos. Intenta más tarde.', 'error');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [classId, courseId]);

    // Verificar la compra del curso por parte del usuario
    const checkPurchase = async (userId, courseId, courseData) => {
        if (!userId || !courseId || !courseData) {
            setIsPurchaseChecking(false);
            return;
        }

        try {
            const response = await fetch(`/api/courses/purchased?courseId=${courseId}&userId=${userId}`);
            const data = await response.json();
            setIsStudent(data.purchased);
        } catch (error) {
            console.error('Error checking purchase:', error);
        } finally {
            setIsPurchaseChecking(false);
        }
    };

    useEffect(() => {
        if (!isLoading && courseData && !isPurchaseChecking) {
            if (isAuthor) {
                Swal.fire({
                    title: 'Acceso denegado',
                    text: 'Eres el autor de este curso.',
                    icon: 'warning',
                    confirmButtonText: 'Mis cursos',
                }).then(() => {
                    router.push('/user/myCourses');
                });
            } else if (!isStudent) {
                Swal.fire({
                    title: 'Acceso denegado',
                    text: 'Debes comprar el curso para ver su contenido.',
                    icon: 'warning',
                    confirmButtonText: 'Cursos comprados',
                }).then(() => {
                    router.push('/user/purchasedCourses');
                });
            }
        }
    }, [isLoading, isAuthor, isStudent, router, isPurchaseChecking]);

    if (isLoading) {
        return <ClassSkeleton />;
    }

    return(
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Bienvenid@ a la clase {claseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{claseData.descripcion}</p>
                    <p className="text-2xl text-[#0D1D5F]/50 italic font-light">Curso: {courseData.titulo}</p>
                </section>
                <section className="p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3 className="text-4xl font-medium italic text-center text-white mb-10">¡Disfruta del aprendizaje!</h3>
                    <div className="flex flex-col">
                        <div className="w-full">
                            {claseData.url_video && (
                                <video src={claseData.url_video} controls className="w-full shadow-lg shadow-black/60" />
                            )}
                        </div>
                        <div className="flex flex-row-reverse my-5">
                            <p className="text-2xl font-extralight text-white/50">Autor: {courseData.autor.nombre_completo}</p>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <Link href={`/user/purchasedCourses/${courseId}`} className="flex items-center gap-2 text-white text-2xl font-light hover:underline">
                            Volver al curso
                            <Image
                                src="/svg/exit.svg"
                                alt="exit-svg"
                                width={35}
                                height={35}
                            />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}