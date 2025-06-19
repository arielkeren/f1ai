import Image from "next/image";

const Header: React.FC = () => (
  <header className="relative flex justify-between items-center px-5 py-3 bg-primary drop-shadow-xl">
    <Image src="/images/logo.png" alt="" width="200" height="200" />
    <nav className="flex justify-center flex-wrap gap-4 text-2xl text-white">
      <a
        href="index.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center transition-colors"
      >
        Home
      </a>
      <a
        href="teams.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Teams
      </a>
      <a
        href="drivers.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Drivers
      </a>
      <a
        href="circuits.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Circuits
      </a>
      <a
        href="standings.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Standings
      </a>
      <a
        href="https://f1ai.netlify.app"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Strategy
      </a>
      <a
        href="memes.html"
        className="hover:bg-red-500 rounded-xl flex items-center px-2 py-3 justify-center"
      >
        Memes
      </a>
    </nav>
  </header>
);

export default Header;
