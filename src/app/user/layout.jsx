import NavbarLoggedIn from "@/components/NavbarLoggedIn";
import { Newsreader } from "next/font/google";

// Configurar Newsreader
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Pesos de la fuente
  variable: '--font-newsreader', // Nombre de la variable CSS
});

export default function UserLayout({ children }) {
    return (
      <>
        <div className={newsreader.variable}>
          <NavbarLoggedIn />
          <main>{children}</main>
        </div>
      </>
    );
  }
