import Link from 'next/link'
import React from 'react'

export default function LegalPage() {
  return (
    <>
        <main>
            <div className='p-16 text-center'>
                <h2 className='text-4xl font-medium text-[#0D1D5F]'>Información legal</h2>
                <h3 className='text-3xl font-medium text-[#0D1D5F]'>Cómo maneja Learnify tu información</h3>
            </div>
            <section className='relative flex'>
                <aside className='bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-5'>
                    <ul>
                        <li className='flex items-center p-5 border-l border-l-white/50 hover:border-l-white/100'>
                            <Link href={"#terms&conditions"} className='text-white/50 hover:text-white/100'>Términos y condiciones</Link>
                        </li>
                        <li className='flex items-center p-5 border-l border-l-white/50 hover:border-l-white/100'>
                            <Link href={"#privacyPolicies"} className='text-white/50 hover:text-white/100'>Política de privacidad</Link>
                        </li>
                        <li className='flex items-center p-5 border-l border-l-white/50 hover:border-l-white/100'>
                            <Link href={"#dataTreatmentPolicies"} className='text-white/50 hover:text-white/100'>Política de tratamiento de datos</Link>
                        </li>
                        <li className='flex items-center p-5 border-l border-l-white/50 hover:border-l-white/100'>
                            <Link href={"#cookiesPolicies"} className='text-white/50 hover:text-white/100'>Política de cookies</Link>
                        </li>
                    </ul>
                </aside>

                <div className='bg-[#C4C4C4]/20 p-5'>
                    <section className='mb-10' id='terms&conditions'>
                        <h4 className='text-3xl font-medium'>Términos y Condiciones</h4>
                        <ol className='list-decimal list-inside'>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Introducción</span>
                                <p>Bienvenido a Learnify. Al usar esta plataforma, aceptas cumplir con los términos y condiciones establecidos. Si no estás de acuerdo con alguno de ellos, no deberás usar nuestro servicio.</p>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Uso del Servicio</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Learnify es una plataforma de E-learning y E-commerce que permite a los usuarios crear, publicar, comprar y gestionar cursos.</li>
                                    <li>El uso del servicio está destinado únicamente a mayores de 16 años.</li>
                                    <li>Los usuarios son responsables de la información que proporcionan al registrarse y deben mantener la confidencialidad de sus credenciales de acceso.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Contenido Generado por Usuarios</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Los usuarios retienen los derechos de propiedad intelectual sobre los cursos que crean.</li>
                                    <li>Al publicar contenido, los usuarios otorgan a Learnify una licencia no exclusiva para distribuir el contenido dentro de la plataforma.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Pagos y Reembolsos</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Todas las transacciones se procesan de manera segura.</li>
                                    <li>Las solicitudes de reembolso deben realizarse dentro de los 8 días posteriores a la compra, según lo especificado en nuestra política de reembolsos.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Responsabilidad Limitada</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Learnify no se hace responsable de los problemas técnicos, la disponibilidad del servicio o la calidad de los cursos creados por los usuarios.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Modificaciones</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios sobre los cambios relevantes a través del correo electrónico o en la plataforma.</li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                    <section className='mb-10' id='privacyPolicies'>
                        <h4 className='text-3xl font-medium'>Políticas de Privacidad</h4>
                        <ol className='list-decimal list-inside'>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Introducción</span>
                                <p>En Learnify, nos tomamos en serio la privacidad de nuestros usuarios y nos comprometemos a proteger sus datos personales.</p>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Datos Recopilados</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li><span className='font-medium'>Datos de registro:</span> Nombre, Apellido, Fecha de nacimiento correo electrónico, contraseña.</li>
                                    <li><span className='font-medium'>Datos de uso:</span> Estadísticas de uso, historial de cursos, interacciones.</li>
                                    <li><span className='font-medium'>Datos de pago:</span> Información de la tarjeta de crédito/débito (procesada por un proveedor seguro de terceros).</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Uso de los Datos</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Gestionar tu cuenta y personalizar tu experiencia en la plataforma.</li>
                                    <li>Procesar pagos y emitir facturas.</li>
                                    <li>Realizar análisis de uso para mejorar nuestros servicios.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Almacenamiento y Seguridad</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Los datos se almacenan en servidores seguros y cumplen con las normativas de protección de datos vigentes.</li>
                                    <li>Implementamos medidas técnicas y organizativas para proteger tu información frente a accesos no autorizados.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Derechos de los Usuarios</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Acceso, rectificación, eliminación y portabilidad de los datos personales.</li>
                                    <li>Retirar el consentimiento para el tratamiento de datos en cualquier momento.</li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                    <section className='mb-10' id='dataTreatmentPolicies'>
                        <h4 className='text-3xl font-medium'>Políticas de Tratamiento de Datos</h4>
                        <ol className='list-decimal list-inside'>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Finalidad del Tratamiento</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Brindar los servicios contratados a través de nuestra plataforma.</li>
                                    <li>Enviar comunicaciones relevantes sobre cursos, promociones o actualizaciones.</li>
                                    <li>Cumplir con obligaciones legales o contractuales.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Bases Legales</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>El tratamiento de datos se basa en el consentimiento informado, la ejecución de un contrato o el cumplimiento de una obligación legal.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Tiempo de Conservación</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Los datos se conservarán mientras mantengas tu cuenta activa y durante el tiempo necesario para cumplir con obligaciones legales.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Terceros</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>No compartimos datos personales con terceros, excepto con nuestros socios de pago y servicios tecnológicos esenciales para la operación de la plataforma.</li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                    <section id='cookiesPolicies'>
                        <h4 className='text-3xl font-medium'>Políticas de Cookies</h4>
                        <ol className='list-decimal list-inside'>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>¿Qué son las Cookies?</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Son pequeños archivos que se almacenan en tu dispositivo para mejorar la experiencia de navegación y personalizar los servicios de la plataforma.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Tipos de Cookies Utilizadas</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li><span className='font-medium'>Cookies esenciales:</span> Necesarias para el funcionamiento del sitio web.</li>
                                    <li><span className='font-medium'>Cookies analíticas:</span> Para entender cómo se utiliza la plataforma.</li>
                                    <li><span className='font-medium'>Cookies de marketing:</span> Para mostrar contenido personalizado y relevante.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Gestión de Cookies</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Puedes aceptar, rechazar o gestionar tus preferencias de cookies a través del banner de configuración de cookies o desde la configuración de tu navegador.</li>
                                </ul>
                            </li>
                            <li className='mb-5'>
                                <span className='font-medium text-lg'>Cookies de Terceros</span>
                                <ul className='list-disc list-inside ml-4'>
                                    <li>Utilizamos servicios de terceros como Google Analytics para analizar el tráfico de la plataforma.</li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                </div>
            </section>
        </main> 
    </>
  )
}
