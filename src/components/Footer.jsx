import React, { useState } from 'react'
import Link from 'next/link'

export default function Footer()  {
    // Estados para controlar el valor de cada select
    const [sobreLearnify, setSobreLearnify] = useState('');
    const [recursos, setRecursos] = useState('');
    const [comunidad, setComunidad] = useState('');
    const [legal, setLegal] = useState('');

    // Función para manejar el cambio en los selects
    const handleSelectChange = (event, setter) => {
        setter(event.target.value);
        if (event.target.value) {
            window.location.href = event.target.value; // Redirigir a la URL seleccionada
        }
    };


  return (
    <>
        <footer className='bg-[#1F2937] text-white p-10 '>
            {/* Footer para escritorio */}
            <div className='hidden md:flex justify-between mb-10'>
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
                        <li className='mb-1'><Link href={"/user/community/articles"} className='hover:text-[#34ADDA]'>Artículos</Link></li>
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

            {/* Footer para móvil */}
            <div className="md:hidden flex flex-col gap-5 mb-10">
                <div>
                    <select
                        value={sobreLearnify}
                        onChange={(e) => handleSelectChange(e, setSobreLearnify)}
                        className="bg-[#1F2937] text-white w-full p-2 border-2 border-white/30 focus:outline-none rounded-md"
                    >
                        <option value="">Sobre Learnify</option>
                        <option value="/about">Sobre nosotros</option>
                        <option value="/about">¿Qué somos?</option>
                        <option value="/about#ourDifferentiators">Nuestros diferenciadores</option>
                        <option value="/benefits">Beneficios</option>
                    </select>
                </div>
                <div>
                    <select
                        value={recursos}
                        onChange={(e) => handleSelectChange(e, setRecursos)}
                        className="bg-[#1F2937] text-white w-full p-2 border-2 border-white/30 focus:outline-none rounded-md"
                    >
                        <option value="">Recursos</option>
                        <option value="/contact">Centro de ayuda</option>
                        <option value="/benefits#testimonials">Testimonios</option>
                        <option value="/FAQs/learning">FAQs</option>
                    </select>
                </div>
                <div>
                    <select
                        value={comunidad}
                        onChange={(e) => handleSelectChange(e, setComunidad)}
                        className="bg-[#1F2937] text-white w-full p-2 border-2 border-white/30 focus:outline-none rounded-md"
                    >
                        <option value="">Comunidad</option>
                        <option value="/user/community/forums">Foros</option>
                        <option value="/user/community/events">Eventos</option>
                        <option value="/user/community/articles">Artículos</option>
                    </select>
                </div>
                <div>
                    <select
                        value={legal}
                        onChange={(e) => handleSelectChange(e, setLegal)}
                        className="bg-[#1F2937] text-white w-full p-2 border-2 border-white/30 focus:outline-none rounded-md"
                    >
                        <option value="">Legal</option>
                        <option value="/legal#terms&conditions">Términos & condiciones</option>
                        <option value="/legal#privacyPolicies">Políticas de privacidad</option>
                        <option value="/legal#dataTreatmentPolicies">Política de tratamiento de datos</option>
                        <option value="/legal#cookiesPolicies">Política de cookies</option>
                    </select>
                </div>
            </div>

            <div className='border-t border-white/30'>
                <p className='text-center text-xl mt-10'>@2025 Learnify | Todos los derechos reservados.</p>
            </div>
        </footer> 
    </>
  )
}


