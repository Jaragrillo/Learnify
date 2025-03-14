import Image from "next/image";

export default function AdminUsersPage() {
    return (
      <>
        <main className="ml-80">
          <section>
            <div>
              <Image></Image>
              <h2>Usuarios</h2>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h3>Usuarios Nuevos en el Mes</h3>
                <p></p>
              </div>
              <div>
                <h3>Usuarios Nuevos en el Año</h3>
                <p></p>
              </div>
              <div>
                <h3>Usuarios Totales</h3>
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