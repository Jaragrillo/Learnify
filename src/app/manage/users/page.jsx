import Image from "next/image";

export default function AdminUsersPage() {
    return (
      <>
        <main className="ml-80">
          <section className="pt-10 px-10">
            <div className="flex items-center gap-2">
              <Image 
                  src="/svg/userDarkBlue.svg" 
                  alt="userDarkBlue-svg" 
                  width={50} 
                  height={50} 
              />
              <h2 className="text-4xl text-[#0D1D5F]">Usuarios</h2>
            </div>
          </section>
          <section className="p-10">
            <div className="flex justify-between">
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Usuarios Nuevos en el Mes</h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Usuarios Nuevos en el Año</h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Usuarios Totales</h3>
                <p></p>
              </div>
            </div>
          </section>
          <section>
            <h3>Usuarios</h3>
            <div>
              tabla usuarios
            </div>
          </section>
        </main>
      </>
    );
}