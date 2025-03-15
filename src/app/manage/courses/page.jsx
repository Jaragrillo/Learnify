import Image from "next/image";

export default function AdminCoursesPage() {
    return (
      <>
        <main className="ml-80">
          <section className="pt-10 px-10">
            <div className="flex items-center gap-2">
              <Image 
                  src="/svg/class.svg" 
                  alt="class-svg" 
                  width={50} 
                  height={50} 
              />
              <h2 className="text-4xl text-[#0D1D5F]">Cursos</h2>
            </div>
          </section>
          <section className="p-10 relative">
            <div className="flex justify-between">
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Cursos creados hoy</h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Cursos creados en la semana</h3>
                <p></p>
              </div>
              <div className="w-[30%] border-2 border-[#0D1D5F] rounded-lg p-5">
                <h3 className="text-xl font-medium">Cursos creados en el mes</h3>
                <p></p>
              </div>
            </div>
          </section>
          <section className="p-10">
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