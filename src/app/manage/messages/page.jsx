import Image from "next/image";

export default function AdminMessagesPage() {
    return (
      <>
        <main className="ml-80">
          <section className="pt-10 px-10">
            <div className="flex items-center gap-2">
              <Image 
                  src="/svg/messageDarkBlue.svg" 
                  alt="messageDarkBlue-svg" 
                  width={50} 
                  height={50} 
              />
              <h2 className="text-4xl text-[#0D1D5F]">Mensajes</h2>
            </div>
          </section>
          <section className="p-10">
            <div className="flex justify-between">
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Mensajes nuevos en el día</h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Mensajes nuevos en la semana </h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Mensajes nuevos en el mes</h3>
                <p></p>
              </div>
            </div>
          </section>
          <section>
            <h3>Todos los mensajes</h3>
            <div>
              cargar mensajes
            </div>
          </section>
        </main>
      </>
    );
}