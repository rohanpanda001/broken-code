import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="h-16 w-full border-b border-cloud/10 bg-charcoal/90 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 md:px-10 justify-between">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Logo size="md" />
      </Link>
      
      <nav className="flex items-center gap-6 text-sm font-medium text-cloud/80">
        <Link href="/practice" className="hover:text-electric transition-colors">
          Practice
        </Link>
        <Link href="/dashboard" className="hover:text-electric transition-colors">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
