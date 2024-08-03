import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import LanguageDropdown from "./languageDropdown";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="flex flex-col bg-transparent shadow-none py-2">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex flex-row pr-2 md:pr-4">
          <LanguageDropdown />
          <a
            href="https://www.instagram.com/lalisolariart/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              aria-label="instagram link button"
              className="p-2 rounded-full bg-white text-gray-500 hover:bg-gray-100"
            >
              <FaInstagram size={23} />
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
