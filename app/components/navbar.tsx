import React from "react";

const Navbar = () => {



  return (
    <div>

    
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">Logo</div>

          {/* Meny länkar */}
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-blue-200">
                Sign in 
              </a>
            </li>
            <li>
              <a href="./editPage" className="text-white hover:text-blue-200">
                Edit
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-200">
                Movie Search
              </a>
            </li>
            <li>
              <a href="./kontakta" className="text-white hover:text-blue-200">
                Kontakta
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
