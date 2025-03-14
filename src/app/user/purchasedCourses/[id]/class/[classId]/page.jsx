import Image from "next/image";
import Link from "next/link";

export default function purchasedCourseClassPage() {
    return(
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Bienvenid@ a la clase {courseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                    <p>{courseData.nombreCategoria}</p>
                </section>
                <section>
                    <h3>¡Disfruta del aprendizaje!</h3>
                    <div>
                        <div>
                            <video src=""></video>
                        </div>
                        <p>Autor: {courseData.author}</p>
                    </div>
                    <Link href={`/user/purchasedCourses/${courseId}`}>
                        Volver al curso
                        <Image
                            src="/svg/exit.svg"
                            alt="exit-svg"
                            width={35}
                            height={35}
                        />
                    </Link>
                </section>
            </main>
        </>
    )
}