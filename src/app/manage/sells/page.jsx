import Image from "next/image";

export default function AdminSalesPage() {
    return (
      <>
        <main className="ml-80">
          <section className="pt-10 px-10">
            <div className="flex items-center gap-2">
              <Image 
                  src="/svg/moneyDarkBlue.svg" 
                  alt="moneyDarkBlue-svg" 
                  width={50} 
                  height={50} 
              />
              <h2 className="text-4xl text-[#0D1D5F]">Ventas</h2>
            </div>
          </section>
          <section className="p-10">
            <div className="flex justify-between">
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Ingresos</h3>
                <p className="text-4xl font-medium my-3"></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Gastos</h3>
                <p className="text-lg font-medium my-3 text-gray-400">Empieza a registrar los gastos de learnify</p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Balance General</h3>
                <p className="text-4xl font-medium my-3"></p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <h4>Ingresos del Día</h4>
              <div>ingresos del dia chart</div>
            </div>
            <div>
              <h4>Ingresos Semanales</h4>
              <div>ingresos semanales chart</div>
            </div>
            <div>
              <h4>Ingresos Mensuales</h4>
              <div>ingresos mensuales chart</div>
            </div>
            <div>
              <h4>Ingresos Año Hasta la Fecha</h4>
              <div>ingresos año hasta la fecha chart</div>
            </div>
          </section>
          <section>
            <h3>Ventas</h3>
            <div>
              tabla ventas
            </div>
          </section>
        </main>
      </>
    );
}