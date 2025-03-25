'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarFAQs() {

    const pathname = usePathname();

    return (
        <nav className="mx-10">
            {/* Navbar escritorio */}
            <ul className="hidden lg:flex gap-x-16 border-b-2 border-black">
                <li className={`text-2xl xl:text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/learning' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/learning"}>Aprendizaje</Link>
                </li>
                <li className={`text-2xl xl:text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/purchases' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/purchases"}>Compras</Link>
                </li>
                <li className={`text-2xl xl:text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/creations' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/creations"}>Creación</Link>
                </li>
                <li className={`text-2xl xl:text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/community' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/community"}>Comunidad</Link>
                </li>
                <li className={`text-2xl xl:text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/settings' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/settings"}>Configuración</Link>
                </li>
            </ul>

            {/* Navbar móvil */}
            <ul className="block lg:hidden mx-10 list-disc">
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/learning' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/learning"}>Aprendizaje</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/purchases' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/purchases"}>Compras</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/creations' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/creations"}>Creación</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/community' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/community"}>Comunidad</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/FAQs/settings' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/FAQs/settings"}>Configuración</Link>
                </li>
            </ul>
        </nav>
    );
}