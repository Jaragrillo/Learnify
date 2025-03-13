export default function purchasedCourseClassPage() {
    return(
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Bienvenid@ a la clase {courseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                    <p>{courseData.nombreCategoria}</p>
                </section>
            </main>
        </>
    )
}