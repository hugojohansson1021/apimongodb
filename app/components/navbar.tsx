import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">Logo</div>

          {/* Meny länkar */}
          <ul className="flex space-x-4">
            <li>
              <Link href="/" passHref>
                <span className="text-white hover:text-blue-200 cursor-pointer">Sign in</span>
              </Link>
            </li>
            <li>
              <Link href="/editPage" passHref>
                <span className="text-white hover:text-blue-200 cursor-pointer">Edit</span>
              </Link>
            </li>
            <li>
              <Link href="/movieSearch" passHref>
                <span className="text-white hover:text-blue-200 cursor-pointer">Movie Search</span>
              </Link>
            </li>
            <li>
              <Link href="/kontakta" passHref>
                <span className="text-white hover:text-blue-200 cursor-pointer">Kontakta</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
