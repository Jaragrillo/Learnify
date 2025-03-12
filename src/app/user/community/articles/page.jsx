import articlesData from '@/utils/community/articlesData.json'
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityArticlesPage() {
    return (
      <>
        <section className="p-10">
          <h3 className="text-3xl text-[#0D1D5F] mb-10">Artículos de la comunidad</h3>
          <div className='w-full flex flex-wrap gap-5 justify-between'>
            {
              articlesData.articles.map((article, index) => (
                <div key={index} className='bg-[#cee4f1] relative shadow-lg shadow-black/50 w-[600px] h-[500px]'>
                  <div className='h-1/2'>
                    <Image 
                          src={article.img} 
                          alt={article.title} 
                          width={600} 
                          height={250} 
                          className="w-full h-full"
                    />
                  </div>
                  <div className='p-5'>
                    <h4 className='text-2xl font-medium'>{article.title}</h4>
                    <p className='text-lg text-[#070E2B]/80 font-medium mb-2'>{article.author}</p>
                    <p className='line-clamp-2 text-[#070E2B] text-justify'>{article.description}</p>
                    <div className='flex justify-between items-center absolute w-11/12 bottom-5'>
                      <div className='flex items-center gap-2'>
                        <Image 
                          src="/svg/messageBlack.svg" 
                          alt="messageBlack-svg" 
                          width={30} 
                          height={30} 
                        />
                        <p className='text-xl'>{article.comments.length}</p>
                      </div>
                      <Link href={`/user/community/articles/${article.article_id}`} className='text-2xl hover:text-[#0B78B8]'>Leer más →</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </>
    );
}