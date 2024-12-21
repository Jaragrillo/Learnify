'use client'
import { useState } from "react";
import creationsFaqs from '@/utils/FAQs/creationsFaqsData.json'
import Image from "next/image";

export default function CreationsFaqsPage() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    return (
        <>
            <section className="p-10">
                <h3 className="text-3xl text-[#0D1D5F] mb-10">Sobre la creación de cursos</h3>
                <div>
                    {creationsFaqs.creations.map((faq, index) => (
                        <div key={index} className="bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] shadow-md shadow-black/60 mb-5 py-4">
                            {/* Pregunta */}
                            <div
                                className="flex items-center  cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <Image
                                    src="/svg/rightArrow.svg"
                                    alt="rightArrow-svg"
                                    width={30}
                                    height={30}
                                    className={`transform transition-transform ${activeIndex === index ? "rotate-90" : ""}`}
                                />
                                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                            </div>

                            {/* Respuesta */}
                            <div className={`overflow-hidden bg-[#cee4f1] transition-all ease-linear duration-500 ${activeIndex === index ? "max-h-40" : "max-h-0"}`}>
                                <p className="m-2 text-black text-justify">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}