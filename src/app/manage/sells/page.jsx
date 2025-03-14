import Image from "next/image";

export default function AdminSalesPage() {
    return (
      <>
        <main className="ml-80">
          <section>
            <div>
              <Image></Image>
              <h2>Ventas</h2>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h3>Ingresos</h3>
                <p></p>
              </div>
              <div>
                <h3>Gastos</h3>
                <p></p>
              </div>
              <div>
                <h3>Balance General</h3>
                <p></p>
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