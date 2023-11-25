import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

/// Navbar component
function Navbar() {
  return (
    <nav className="border-b fixed z-20 w-full bg-white border-stone-200 p-4 px-8 flex items-center">
      {/* Logo */}
      <Link to="/" className="mr-16 flex-1">
        <img src={logo} className="w-48" alt="Page logo" />
      </Link>
      {/* Navigation buttons */}
      <div className="flex-1 flex justify-end">
        {/* Home */}
        <Link className="hover:text-tmBlue transition" to="/">Home</Link>
        {/* Favorites */}
        <Link className="hover:text-tmBlue transition ml-6" to="/favorites">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
