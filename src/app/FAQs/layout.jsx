import NavbarFAQs from "@/components/NavbarFAQS";

export default function FAQsLayout({ children }) {
    return (
        <>
            <div className='p-16 text-center'>
                <h2 className='text-3xl sm:text-4xl font-medium text-[#0D1D5F]'>Preguntas frecuentes</h2>
                <h3 className='text-2xl sm:text-3xl font-medium text-[#0D1D5F]'>Todo lo que quieras saber sobre Learnify</h3>
            </div>
            <NavbarFAQs />
            <main>{children}</main>
        </>
    );
}
