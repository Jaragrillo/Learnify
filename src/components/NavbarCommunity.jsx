'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarCommunity() {

    const pathname = usePathname();

    return (
        <nav className="border-b-2 border-black mx-10">
            <ul className="flex gap-x-16">
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/user/community/forums' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/user/community/forums"}>Foros</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/user/community/events' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/user/community/events"}>Eventos</Link>
                </li>
                <li className={`text-3xl hover:text-[#0B78B8] hover:underline ${pathname === '/user/community/articles' ? 'text-[#0B78B8] underline' : ''}`}>
                    <Link href={"/user/community/articles"}>Artículos</Link>
                </li>
            </ul>
        </nav>
    );
}