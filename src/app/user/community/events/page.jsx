'use client'

import eventsData from '@/utils/community/eventsData.json'
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function CommunityEventsPage() {

  const handleJoinEvent = (eventTitle) => {
    Swal.fire({
        title: '¡Te uniste al evento!',
        text: `Te has unido al evento "${eventTitle}". Te llegará un correo con toda la información sobre el evento.`,
        allowOutsideClick: false,
        icon: 'success',
        confirmButtonText: 'Entendido.'
    });
  }

  return (
    <>
      <section className="p-10">
        <h3 className="text-3xl text-[#0D1D5F] mb-10">Próximos eventos de la comunidad</h3>
        <div className='w-full flex flex-wrap gap-5 justify-between'>
          {
            eventsData.events.map((event, index) => (
              <div key={index} className='bg-[#cee4f1] relative shadow-md shadow-black/25 p-5 w-[415px]'>
                <h4 className='text-2xl mb-2'>{event.title}</h4>
                <div className='flex gap-2 items-center mb-2'>
                  <Image 
                    src="/svg/calendarBlack.svg" 
                    alt="calendarBlack-svg" 
                    width={24} 
                    height={24} 
                    className="opacity-60"
                  />
                  <p className='text-black/60'>{event.date} a las {event.time}</p>
                </div>
                <div className='flex gap-2 items-center mb-2'>
                  <Image 
                    src="/svg/user.svg" 
                    alt="user-svg" 
                    width={24} 
                    height={24} 
                    className="opacity-60"
                  />
                  <p className='text-black/60'>{event.attendees} asistentes</p>
                </div>
                <button
                onClick={() => handleJoinEvent(event.title)} 
                  className='absolute bottom-5 right-5 bg-[#070E2B] px-5 py-2 text-white hover:scale-110 transition duration-500'
                >
                  Unirse
                </button>
              </div>
            ))
          }
        </div>
      </section>
    </>
  );
}