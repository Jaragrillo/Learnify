import Image from "next/image";

export default function AdminDashboardPage() {
    return (
      <>
        <main className="ml-80">
          <section className="p-10">
            <div>
              <Image></Image>
              <h2>Dashboard</h2>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h3>Ingresos</h3>
                <p></p>
              </div>
              <div>
                <h3>Usuarios</h3>
                <p></p>
              </div>
            </div>
          </section>
          <section>
            <div>ingresos chart</div>
          </section>
        </main>
      </>
    );
}