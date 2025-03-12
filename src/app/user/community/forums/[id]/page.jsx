import { notFound } from 'next/navigation';
import forumsData from '@/utils/community/forumsData.json'

export default function ForumPage({ params }) {

    const { id } = params;

    // Buscar la información de la categoría en el JSON
    const forumInfo = forumsData.forums.find(
        (forum) => forum.forum_id === Number(id)
    );

    // Si el foro no existe, renderizar un mensaje
    if (!forumInfo) {
        notFound(); // Redirige a la página not-found automáticamente
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>{forumInfo.title}</h2>
                    <h3 className='text-2xl text-[#0D1D5F] font-light'>{forumInfo.description}</h3>
                    <p className="italic text-[#0D1D5F]/60">Foro creado por: {forumInfo.author}</p>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h2 className="text-4xl font-medium mb-10 text-[#0D1D5F]">Comentarios</h2>
                    <div>
                        <form action="" className='mb-10'>
                            <div className='w-full bg-white p-5 shadow-md shadow-black/25'>
                                <h4 className='font-light text-2xl text-[#0D1D5F] mb-2'>¡Participa en el foro añadiendo un comentario!</h4>
                                <input type="text" placeholder="Escribe aquí tu comentario..." className='block py-2 mb-2 w-full focus:outline-none' />
                                <button type="submit" className="px-3 py-2 bg-[#cee4f1] shadow-md shadow-black/25 hover:scale-110 transition duration-500">Comentar</button>
                            </div>
                        </form>
                        {forumInfo && forumInfo.replies && forumInfo.replies.length > 0 ? (
                            forumInfo.replies.map((reply, index) => (
                                <div key={index} className='w-full bg-white p-5 mb-10 shadow-lg shadow-black/25'>
                                    <h4 className='font-light text-2xl text-[#0D1D5F]'>{reply.author}</h4>
                                    <p className='text-lg'>{reply.reply}</p>
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