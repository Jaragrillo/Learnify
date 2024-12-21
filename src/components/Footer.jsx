import React from 'react'
import Link from 'next/link'

export default function Footer()  {
  return (
    <>
        <footer className='bg-[#1F2937] text-white p-10 '>
            <div className='flex justify-between mb-10'>
                <div>
                    <h4 className='font-medium text-2xl'>Sobre Learnify</h4>
                    <ul>
                        <li className='mb-1'><Link href={"/about"} className='hover:text-[#34ADDA]'>Sobre nosotros</Link></li>
                        <li className='mb-1'><Link href={"/about"} className='hover:text-[#34ADDA]'>¿Qué somos?</Link></li>
                        <li className='mb-1'><Link href={"/about#ourDifferentiators"} className='hover:text-[#34ADDA]'>Nuestros diferenciadores</Link></li>
                        <li className='mb-1'><Link href={"/benefits"} className='hover:text-[#34ADDA]'>Beneficios</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-medium text-2xl'>Recursos</h4>
                    <ul>
                        <li className='mb-1'><Link href={"/contact"} className='hover:text-[#34ADDA]'>Centro de ayuda</Link></li>
                        <li className='mb-1'><Link href={"/benefits#testimonials"} className='hover:text-[#34ADDA]'>Testimonios</Link></li>
                        <li className='mb-1'><Link href={"/FAQs/learning"} className='hover:text-[#34ADDA]'>FAQs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-medium text-2xl'>Comunidad</h4>
                    <ul>
                        <li className='mb-1'><Link href={"/user/community/forums"} className='hover:text-[#34ADDA]'>Foros</Link></li>
                        <li className='mb-1'><Link href={"/user/community/events"} className='hover:text-[#34ADDA]'>Eventos</Link></li>
                        <li className='mb-1'><Link href={"/user/community/articles"} className='hover:text-[#34ADDA]'>Patrocinadores</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-medium text-2xl'>Legal</h4>
                    <ul>
                        <li className='mb-1'><Link href={"/legal#terms&conditions"} className='hover:text-[#34ADDA]'>Términos & condiciones</Link></li>
                        <li className='mb-1'><Link href={"/legal#privacyPolicies"} className='hover:text-[#34ADDA]'>Poíticas de privacidad</Link></li>
                        <li className='mb-1'><Link href={"/legal#dataTreatmentPolicies"} className='hover:text-[#34ADDA]'>Política de tratamiento de datos</Link></li>
                        <li className='mb-1'><Link href={"/legal#cookiesPolicies"} className='hover:text-[#34ADDA]'>Política de cookies</Link></li>
                    </ul>
                </div>
            </div>
            <div className='border-t border-white/30'>
                <p className='text-center text-xl mt-10'>@2024 Learnify | Todos los derechos reservados.</p>
            </div>
        </footer> 
    </>
  )
}


