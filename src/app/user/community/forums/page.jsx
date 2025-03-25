import forumsData from '@/utils/community/forumsData.json'
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityForumsPage() {
    return (
      <>
        <section>
          <h3 className="text-3xl text-[#0D1D5F] m-10">Discusiones recientes</h3>
          <div className='w-full'>
            {
              forumsData.forums.map((forum) => (
                <div key={forum.forum_id} className='w-full group'>
                    <Link href={`/user/community/forums/${forum.forum_id}`}>
                        <div className='text-white w-full bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] border-b border-white/40 py-5 px-10'>
                            <h4 className='text-xl text-justify sm:text-2xl sm:text-left mb-5 group-hover:underline'>{forum.title}</h4>
                            <div className='block sm:flex items-center gap-10'>
                              <div>
                                <p className='font-light text-sm sm:text-lg text-white/60'>Creado por: {forum.author}</p>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Image 
                                  src="/svg/message.svg" 
                                  alt="message-svg" 
                                  width={24} 
                                  height={24} 
                                  className="opacity-60"
                                />
                                <p className='font-light text-sm sm:text-lg text-white/60'>{forum.replies.length} respuestas</p>
                              </div>
                            </div>
                        </div>
                    </Link>
                </div>
              ))
            }
          </div>
        </section>
      </>
    );
}