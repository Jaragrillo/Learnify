import { notFound } from 'next/navigation';
import articlesData from '@/utils/community/articlesData.json'
import Image from 'next/image';

export default async function ArticlePage({ params }) {

    const { id } = await params;

    // Buscar la información de la categoría en el JSON
    const articleInfo = articlesData.articles.find(
        (forum) => forum.article_id === Number(id)
    );

    // Si el articulo no existe, renderizar un mensaje
    if (!articleInfo) {
        notFound(); // Redirige a la página not-found automáticamente
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <div className='w-full h-auto lg:h-[400px] m-auto text-white relative'>
                        <div className='p-10'>
                            <h2 className='text-xl sm:text-3xl lg:text-5xl text-justify sm:text-left mb-5'>{articleInfo.title}</h2>
                            <h3 className='text-sm sm:text-xl md:text-2xl text-justify font-light mb-10 lg:mb-0'>{articleInfo.description}</h3>
                            <p className="italic relative sm:absolute sm:right-10 bottom-10 text-base sm:text-2xl text-white/80">Hecho por: {articleInfo.author}</p>
                        </div>
                        <Image 
                        src={articleInfo.img} 
                        alt={articleInfo.title} 
                        width={1000} 
                        height={1000} 
                        className="brightness-[0.3] w-full h-full absolute top-0 -z-10"
                        />
                    </div>
                </section>
                <section className='px-10 pb-10'>
                    {
                        articleInfo && articleInfo.sections && articleInfo.sections.length > 0 ? (
                            articleInfo.sections.map((section, index) => (
                                <div key={index} className='mb-5'>
                                    <h4 className='text-[#0D1D5F] font-medium text-2xl'>{section.title}</h4>
                                    <p className='text-[#0D1D5F] text-justify font-light text-xl'>{section.article}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay secciones del artículo aún.</p>
                        )
                    }
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h2 className="text-3xl sm:text-4xl font-medium mb-10 text-[#0D1D5F]">Comentarios</h2>
                    <div>
                        <form action="" className='mb-10'>
                            <div className='w-full bg-white p-5 shadow-md shadow-black/25'>
                                <h4 className='font-light text-2xl text-[#0D1D5F] mb-2'>¿Qué opinas de este artículo?</h4>
                                <input type="text" placeholder="Escribe aquí tu comentario..." className='block py-2 mb-2 w-full focus:outline-none' />
                                <button type="submit" className="px-3 py-2 bg-[#cee4f1] shadow-md shadow-black/25 hover:scale-110 transition duration-500">Comentar</button>
                            </div>
                        </form>
                        {articleInfo && articleInfo.comments && articleInfo.comments.length > 0 ? (
                            articleInfo.comments.map((comment, index) => (
                                <div key={index} className='w-full bg-white p-5 mb-10 shadow-lg shadow-black/25'>
                                    <h4 className='font-light text-2xl text-[#0D1D5F]'>{comment.author}</h4>
                                    <p className='text-lg text-justify lg:text-left'>{comment.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay comentarios aún.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}