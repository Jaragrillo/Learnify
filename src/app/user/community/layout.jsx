export default function CommunityLayout({ children }) {
    return (
        <>
            <div className='p-16 text-center'>
                <h2 className='text-4xl font-medium text-[#0D1D5F]'>Comunidad</h2>
                <h3 className='text-3xl font-medium text-[#0D1D5F]'>Todo lo que quieras saber sobre Learnify</h3>
            </div>
            <main>{children}</main>
        </>
    );
}