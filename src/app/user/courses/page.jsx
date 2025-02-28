'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryCoursesSkeleton from '@/components/skeletons/CategoryCoursesSkeleton'
import Link from "next/link";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function coursesPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all"); // Estado para la categoría seleccionada
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para el skeleton loading
    const [topRatedCourses, setTopRatedCourses] = useState([]);

    // Obtenemos las categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories'); // Ruta para obtener categorías
                if (!response.ok) throw new Error('Error al cargar las categorías');
                const data = await response.json();
                setCategories(data); // Guardar categorías en el estado
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar las categorías. Intenta más tarde.', 'error');
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    // Obtenemos los cursos según la categoría seleccionada
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const queryParam = selectedCategory === "all" ? "" : `?category=${selectedCategory}`;
                const response = await fetch(`/api/courses${queryParam}`);
                if (!response.ok) throw new Error('Error al cargar los cursos');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los cursos. Intenta más tarde.', 'error');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [selectedCategory]);

    // Obtenemos los cursos mejor valorados para el carrusel
    useEffect(() => {
        const fetchTopRatedCourses = async () => {
            try {
                const response = await fetch('/api/courses?topRated=true');
                if (!response.ok) throw new Error('Error al cargar los cursos mejor valorados');
                const data = await response.json();
                setTopRatedCourses(data);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los cursos destacados. Intenta más tarde.', 'error');
                console.error(error);
            }
        };
    
        fetchTopRatedCourses();
    }, []);

    // Configuración del carrusel
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Explora Nuestros Cursos</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Descubre una amplia variedad de cursos impartidos por expertos en sus campos.</p>

                    <h3 className="mt-10 text-2xl text-[#0D1D5F]">Cursos destacados</h3>
                    <Slider {...carouselSettings}>
                        {topRatedCourses.map((course) => (
                            <div key={course.id_curso} className="p-4">
                                <div className="shadow-lg shadow-black/60 w-[300px]">
                                    <div className="w-full h-40">
                                        <Image
                                            src={course.img_portada}
                                            alt={`Portada de ${course.titulo}`}
                                            width={300}
                                            height={160}
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="mt-4 p-2">
                                        <h3 className="text-2xl font-medium">{course.titulo}</h3>
                                        <p className="text-lg font-medium text-[#070E2B]/80">
                                            {course.autor.nombre_completo}
                                        </p>
                                        <div className="flex items-center gap-x-2 mt-2 text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Image
                                                    src="/svg/star.svg"
                                                    alt="star-svg"
                                                    width={24}
                                                    height={24}
                                                />
                                                {course.valoracion.toFixed(1)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Image
                                                    src="/svg/studentDarkBlue.svg"
                                                    alt="studentDarkBlue-svg"
                                                    width={24}
                                                    height={24}
                                                />
                                                {course.estudiantes}
                                            </div>
                                        </div>
                                        <p className="text-2xl mt-2">
                                            ${Number(course.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>
                <section>
                    <div className="flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-3xl">Todos los cursos</p>
                        <div className="relative">
                            <select
                                name="coursesCategoriesSelect"
                                id="coursesCategoriesSelect"
                                value={selectedCategory} // Enlazar al estado
                                onChange={(e) => setSelectedCategory(e.target.value)} // Actualizar categoría seleccionada
                                className="bg-transparent border border-white px-3 py-2 text-xl text-white appearance-none focus:outline-none"
                            >
                                <option className="text-black " value="all">Todos</option>
                                {categories.map((category) => (
                                    <option key={category.id_categoria} value={category.id_categoria} className="text-black">
                                        {category.categoria}
                                    </option>
                                ))}
                            </select>

                            <Image
                                src="/svg/rightArrow.svg"
                                alt="rightArrow-svg"
                                width={30}
                                height={30}
                                className="transform transition-transform rotate-90 absolute right-3 top-0 bottom-0 my-auto"
                            />
                        </div>
                    </div>
                    <div className="p-10">
                        {isLoading ? (
                            <CategoryCoursesSkeleton />
                        ) : courses.length > 0 ? (
                            <div className='flex flex-wrap justify-between gap-6'>
                                {courses.map((course) => (
                                    <div key={course.id_curso} className='shadow-lg shadow-black/60 w-[400px]'>
                                        <div className="w-full h-40">
                                            <Image
                                                src={course.img_portada}
                                                alt={`Portada de ${course.titulo}`}
                                                width={300}
                                                height={160}
                                                className="w-full h-full "
                                            />
                                        </div>
                                        <div className="mt-4 p-2">
                                            <h3 className="text-2xl font-medium">{course.titulo}</h3>
                                            <p className='text-lg font-medium text-[#070E2B]/80'>{course.autor.nombre_completo}</p>
                                            <div className="flex items-center gap-x-2 mt-2 text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Image
                                                        src="/svg/star.svg"
                                                        alt="star-svg"
                                                        width={24}
                                                        height={24}
                                                        className=""
                                                    />
                                                    {course.valoracion}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Image
                                                        src="/svg/studentDarkBlue.svg"
                                                        alt="studentDarkBlue-svg"
                                                        width={24}
                                                        height={24}
                                                        className=""
                                                    />
                                                    {course.estudiantes}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Image
                                                        src="/svg/class.svg"
                                                        alt="class-svg"
                                                        width={24}
                                                        height={24}
                                                        className=""
                                                    />
                                                    {course.totalClases || 0}
                                                </div>
                                            </div>
                                            <p className="text-2xl mt-2">
                                                ${Number(course.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP
                                            </p>
                                            <Link
                                                href={'/user/courses/course'}
                                                className="w-full flex items-center justify-center py-3 gap-2 text-white bg-[#070E2B] mt-4 hover:bg-[#0D1D5F] transition duration-200">
                                                Más información
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-center text-xl text-[#0D1D5F]'>No hay cursos disponibles en esta categoría.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}