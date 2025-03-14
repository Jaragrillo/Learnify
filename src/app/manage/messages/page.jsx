export default function AdminMessagesPage() {
    return (
      <>
        <main className="ml-80">
          <section>
            <div>
              <Image></Image>
              <h2>Mensajes</h2>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h3>Mensajes nuevos en el día</h3>
                <p></p>
              </div>
              <div>
                <h3>Mensajes nuevos en la semana </h3>
                <p></p>
              </div>
              <div>
                <h3>Mensajes nuevos en el mes</h3>
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