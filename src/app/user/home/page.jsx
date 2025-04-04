'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import data from '@/utils/motivationalData.json'
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from 'sweetalert2';
import HomeCoursesSkeleton from '@/components/skeletons/HomeCoursesSkeleton'

export default function page() {

    const [activeModal, setActiveModal] = useState(null); // Estado para controlar qué modal de los educadores está activo

    const educators = [ // Array con toda la información de los educadores destacados
        {
            id: 1,
            name: 'Ana María López',
            image: '/images/benefits/testimony1.png',
            description: 'Ana María es diseñadora gráfica con más de 10 años de experiencia en la industria. Ha trabajado con marcas reconocidas y es apasionada por enseñar a otros a desarrollar su creatividad.',
            courses: ['Diseño Gráfico para Principiantes', 'Técnicas Avanzadas de Photoshop'],
        },
        {
            id: 2,
            name: 'Carlos Gómez',
            image: '/images/educators/educator2.png',
            description: 'Carlos es un desarrollador web full-stack con una sólida formación en programación. Ha trabajado en proyectos innovadores y disfruta compartir su conocimiento con futuros programadores.',
            courses: ['Desarrollo Web con JavaScript', 'Introducción a Python'],
        },
        {
            id: 3,
            name: 'María Fernanda Ruiz',
            image: '/images/educators/educator3.png',
            description: 'María Fernanda es especialista en marketing digital y ha ayudado a numerosas empresas a mejorar su presencia en línea. Su enfoque práctico hace que sus clases sean dinámicas y efectivas.',
            courses: ['Estrategias de Marketing en Redes Sociales', 'SEO para Principiantes'],
        },
        {
            id: 4,
            name: 'Javier Martínez',
            image: '/images/educators/educator4.png',
            description: 'Javier es ingeniero en sistemas con más de 15 años de experiencia en informática y software. Su pasión por la enseñanza lo ha llevado a formar a cientos de estudiantes en diversas áreas tecnológicas.',
            courses: ['Fundamentos de Bases de Datos', 'Seguridad Informática'],
        },
        {
            id: 5,
            name: 'Sofía Torres',
            image: '/images/educators/educator5.png',
            description: 'Sofía es fotógrafa profesional y experta en edición fotográfica. Su estilo único y su habilidad para capturar momentos la han hecho destacar en la industria.',
            courses: ['Fotografía Digital para Principiantes', 'Edición Avanzada con Lightroom'],
        },
        {
            id: 6,
            name: 'Diego Pérez',
            image: '/images/educators/educator6.png',
            description: 'Diego es músico y productor musical con más de 12 años de experiencia en la industria musical. Comparte su amor por la música a través de clases interactivas y prácticas.',
            courses: ['Introducción a la Teoría Musical', 'Producción Musical con Ableton Live'],
        },
    ];

    const [motivationalContent, setMotivationalContent] = useState(null);

    useEffect(() => {
        // Función para obtener un elemento aleatorio
        const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

        // Ruleta para decidir entre tips y frases
        const isTip = Math.random() < 0.5;
        if (isTip) {
            const randomTip = getRandomElement(data.tips);
            setMotivationalContent({ type: 'tip', ...randomTip });
        } else {
            const randomPhrase = getRandomElement(data.phrases);
            setMotivationalContent({ type: 'phrase', ...randomPhrase });
        }
    }, []); // Ejecutar al cargar la vista

    // Obtenemos todos los cursos para el carrusel
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            setLoading(true);
            const response = await fetch("/api/courses");
            const data = await response.json();
            setCourses(data);
          } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los cursos. Intenta más tarde.', 'error');
          } finally {
            setLoading(false);
          }
        };
        fetchCourses();
    }, []);

    // Obtenemos las estrellas de valoración
    const renderStars = (rating, totalRatings) => {
        const fullStars = Math.floor(rating) || 0;
        const emptyStars = 5 - fullStars;
    
        return (
            <div className="flex items-center">
                {/* Estrellas llenas */}
                {Array.from({ length: fullStars }, (_, index) => (
                    <Image
                        key={`full-${index}`}
                        src="/svg/star.svg"
                        alt="star-svg"
                        width={24}
                        height={24}
                    />
                ))}
                {/* Estrellas vacías */}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <Image
                        key={`full-${index}`}
                        src="/svg/emptyStar.svg"
                        alt="emptyStar-svg"
                        width={24}
                        height={24}
                    />
                ))}
                {/* Total de valoraciones */}
                <span className="ml-2 text-sm text-gray-600">({totalRatings})</span>
          </div>
        );
    };

    // Botones personalizados para el carrusel
    const PrevArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-[#070E2B] p-2 rounded-full shadow-md hover:bg-[#0D1D5F]"
        >
            <Image
                src="/svg/rightArrow.svg"
                alt="rightArrow-svg"
                width={24}
                height={24}
                className="rotate-180"
            />
        </button>
    );
  
    const NextArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-[#070E2B] p-2 rounded-full shadow-md hover:bg-[#0D1D5F]"
        >
        <Image
          src="/svg/rightArrow.svg"
          alt="rightArrow-svg"
          width={24}
          height={24}
        />
      </button>
    );

    // Configuración del carrusel
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 675,
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
                <section className='p-10'>
                    <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>Una amplia selección de cursos</h2>
                    <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[600px]'>Elige entre más de 5.000 cursos de vídeo en línea con nuevo contenido cada semana.</p>
                    <div>
                        {loading ? (
                              <HomeCoursesSkeleton />
                        ) : (
                          <Slider {...carouselSettings}>
                            {courses.map((course) => (
                                <div key={course.id_curso}  className='px-4 py-6'>
                                    <div className="bg-white shadow-lg shadow-black/60 w-full h-[400px] sm:h-[384px] relative">
                                        <div className="w-full h-40">
                                            <Image
                                                src={course.img_portada}
                                                alt={`Portada de ${course.titulo}`}
                                                width={300}
                                                height={160}
                                                className="w-full h-full m-auto"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="text-lg font-semibold">{course.titulo}</h3>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Autor: {course.autor.nombre_completo}
                                            </p>
                                            <div className="mt-2">{renderStars(course.valoracion, course.totalValoraciones)}</div>
                                            <p className="text-2xl font-light text-[#0D1D5F] mt-2">
                                                ${Number(course.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP
                                            </p>
                                            <Link
                                                href={`/user/courses/${course.id_curso}`}
                                                className="bg-[#070E2B] w-11/12 absolute text-center bottom-2 left-0 right-0 m-auto text-white hover:bg-[#0D1D5F] py-2"
                                            >
                                                Más información
                                            </Link>
                                        </div>
                                </div>
                                </div>
                            ))}
                          </Slider>
                        )}
                    </div>
                </section>
                <section className='w-full bg-[#070E2B] relative h-96 sm:h-80'>
                    <p className={`antialiased font-light text-3xl text-white p-5`} style={{ fontFamily: 'var(--font-newsreader)' }}>Habilidades que te ayudan a avanzar</p>
                    <div className='bg-[#F7F7F7] absolute h-[280px] flex items-center w-4/5 p-10 font-light text-base sm:text-2xl left-0 right-0 -bottom-7 m-auto shadow-lg shadow-black/60'>
                        <p className='text-justify leading-normal'>La tecnología y el mundo laboral evolucionan muy rápido, pero con nosotros, podrás mantener el ritmo. Consigue las habilidades que necesitas para lograr tus objetivos y garantizar la competitividad.</p>
                    </div>
                </section>
                <section className='px-10 py-24'>
                    <h2 className='text-4xl text-[#0D1D5F] text-center'>Categorías principales</h2>
                    <div className='flex flex-wrap justify-center sm:justify-between'>
                    <Link href={"/user/categories/programmation"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/programming.svg"
                                        alt="programming-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/programming.svg"
                                                alt="programming-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Programación</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Aprende programación, desarrollo web y móvil, y lenguajes como JavaScript y Python. Cursos virtuales de expertos para construir soluciones innovadoras.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/design"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/design.svg"
                                        alt="design-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/design.svg"
                                                alt="design-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Diseño</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Cursos virtuales de diseño gráfico, interiores y UX/UI, impartidos por profesionales de la industria. Desarrolla tu creatividad y habilidades visuales.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/marketing"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/marketing.svg"
                                        alt="marketing-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/marketing.svg"
                                                alt="marketing-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Marketing</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Domina estrategias efectivas de marketing digital, redes sociales, SEO y análisis de datos. Profesionales te enseñan a atraer y retener clientes.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/personalDevelopment"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/clapperboard.svg"
                                        alt="clapperboard-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/clapperboard.svg"
                                                alt="clapperboard-svg"
                                                width={75}
                                                height={75}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Creación de contenido</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Cursos virtuales sobre creación de contenido, edición y filmación. Creadores de contenido expertos te enseñan las claves para crecer en las redes sociales.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/personalDevelopment"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/personalDevelopment.svg"
                                        alt="personalDevelopment-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div className='flex items-center mb-2 gap-2'>
                                        <Image
                                            src="/svg/personalDevelopment.svg"
                                            alt="personalDevelopment-svg"
                                            width={75}
                                            height={75}
                                        />
                                        <h3 className='text-3xl hover:cursor-default leading-6'>Desarrollo personal</h3>
                                    </div>
                                    <p className='text-justify font-light hover:cursor-default'>Mejora tus habilidades de comunicación, gestión del tiempo y liderazgo. Cursos virtuales para crecer profesional y personalmente.</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/business"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/business.svg"
                                        alt="business-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/business.svg"
                                                alt="business-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Negocios</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Aprende gestión empresarial y emprendimiento. Desarrolla estrategias efectivas y administra recursos con éxito. Profesionales te guían.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/photography"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/photography.svg"
                                        alt="photography-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/photography.svg"
                                                alt="photography-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Fotografía</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Desde básicos hasta técnicas avanzadas. Fotógrafos profesionales te enseñan a capturar imágenes impresionantes y dominar cámaras y editores.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/user/categories/music"} className='hover:cursor-default'>
                            <div className='group size-[300px] relative my-10 shadow-lg shadow-black/50 text-white bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                                <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0'>
                                    <Image
                                        src="/svg/music.svg"
                                        alt="music-svg"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#34ADDA] via-30% via-[#1E88C6] to-purple-500 text-white px-4 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <div>
                                        <div className='flex items-center mb-2 gap-2'>
                                            <Image
                                                src="/svg/music.svg"
                                                alt="music-svg"
                                                width={50}
                                                height={50}
                                            />
                                            <h3 className='text-3xl hover:cursor-default'>Música</h3>
                                        </div>
                                        <p className='text-justify font-light hover:cursor-default'>Teoría musical y clases prácticas de instrumentos. Cursos virtuales para todos los niveles, impartidos por músicos experimentados. Desarrolla tus habilidades y creatividad.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
                <div className='w-full bg-[#0B78B8] h-40 flex items-center justify-center p-2'>
                    <div className='text-center'>
                        {motivationalContent && motivationalContent.type === 'tip' && ( // Contenido para un Tip
                            <div>
                                <p className='text-xl italic text-white'>{motivationalContent.tipContent}</p>
                                <p className='text-lg italic text-white/80 text-right'>- Tip de estudio</p>
                            </div>
                        )}
                        {motivationalContent && motivationalContent.type === 'phrase' && ( // Contenido para una Frase Motivacional
                            <div>
                                <p className='text-xl italic text-white'>{motivationalContent.phrase}</p>
                                <p className='text-lg italic text-white/80 text-right'>- {motivationalContent.author}</p>
                            </div>
                        )}
                    </div>
                </div>
                <section className='px-10 py-24'>
                    <h2 className='text-4xl text-center text-[#0D1D5F]'>Educadores destacados</h2>
                    <div className='relative flex-col flex md:flex-row flex-wrap items-center justify-between'>
                        {educators.map((educator) => (
                            <div key={educator.id} className='w-2/6 my-5'>
                                <div className='text-center'>
                                    <Image
                                        src={educator.image}
                                        alt={`${educator.name}-image`}
                                        width={200}
                                        height={200}
                                        className='border-2 border-black rounded-full m-auto hover:cursor-pointer hover:border-[#0B78B8]/80'
                                        onClick={() => setActiveModal(educator.id)} // Mostrar detalles al hacer clic
                                    />
                                    <h3 className='text-lg sm:text-xl mt-4'>{educator.name}</h3>
                                    <p
                                        className='text-base sm:text-lg hover:cursor-pointer hover:text-[#0B78B8] w-fit mx-auto'
                                        onClick={() => setActiveModal(educator.id)} // Mostrar detalles al hacer clic
                                    >
                                        Ver perfil &gt;
                                    </p>
                                </div>
                                {activeModal === educator.id && ( // Mostrar modal solo para el educador activo
                                    <div className='fixed inset-0 bg-black/50 flex flex-col lg:flex-row items-center justify-center z-50'>
                                        <div className='bg-white p-6 shadow-lg w-4/5 lg:w-[900px] relative'>
                                            <button
                                                onClick={() => setActiveModal(null)} // Cerrar modal
                                                className='absolute top-4 right-4 bg-gray-200 rounded-full py-2 px-3 hover:bg-gray-300'
                                            >
                                                ✕
                                            </button>
                                            <div className='flex flex-col lg:flex-row items-center gap-3'>
                                                <div>
                                                    <Image
                                                        src={educator.image}
                                                        alt={`educator-${educator.name}-image`}
                                                        width={250}
                                                        height={250}
                                                        className='rounded-full mx-auto h-1/2 w-1/2 sm:h-full sm:w-full'
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className='text-2xl font-medium text-[#0D1D5F] mb-1'>{educator.name}</h3>
                                                    <p className='text-xl text-[#070E2B] text-justify'>{educator.description}</p>
                                                </div>
                                            </div>
                                            <ul className='mt-2'>
                                                <h4 className='text-xl text-[#0D1D5F]'>Cursos Impartidos:</h4>
                                                {educator.courses.map((course, index) => (
                                                    <li key={index} className='flex items-center gap-1'>
                                                        <Image 
                                                            src="/svg/class.svg" 
                                                            alt="class-svg" 
                                                            width={20} 
                                                            height={30} 
                                                            className='hidden sm:block'
                                                        />
                                                        <p className='text-lg text-[#070E2B] flex items-center gap-x-2'> <span className='block sm:hidden'>●</span> {course}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}
