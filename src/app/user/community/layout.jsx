import NavbarCommunity from "@/components/NavbarCommunity";

export default function CommunityLayout({ children }) {
    return (
        <>
            <div className='p-10'>
                <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>La Comunidad de Learnify</h2>
                <h3 className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[600px]'>Conecta, colabora, y crece con compañeros de todo el mundo.</h3>
            </div>
            <NavbarCommunity />
            <main>{children}</main>
        </>
    );
}