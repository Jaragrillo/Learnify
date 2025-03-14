import Image from "next/image";

export default function AdminCoursesPage() {
    return (
      <>
        <main className="ml-80">
          <section>
            <div>
              <Image></Image>
              <h2>Cursos</h2>
            </div>
          </section>
          <section>
            <div>
              <div>
                <h3>Cursos creados hoy</h3>
                <p></p>
              </div>
              <div>
                <h3>Cursos creados en la semana</h3>
                <p></p>
              </div>
              <div>
                <h3>Cursos creados en el mes</h3>
                <p></p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="filterCoursesBy">Filtrar cursos por:</label>
              <select name="filterCoursesBy" id="filterCoursesBy">
                <option value="">Cursos</option>
                <option value="">Cursos creados</option>
                <option value="">Cursos eliminados</option>
                <option value="">Cursos más vendidos</option>
              </select>
            </div>
            <div>
              chart
            </div>
          </section>
          <section>
            <h3>Cursos más comprados</h3>
            <div>cursos mas comprados query</div>
          </section>
          <section>
            <h3>Cursos mejor valorados</h3>
            <div>cursos mejor valorados query</div>
          </section>
          <section>
            <h3>Cursos</h3>
            <div>tabla cursos</div>
          </section>
        </main>
      </>
    );
}