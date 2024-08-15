import logo from "./../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-400/60 relative font-inter z-10">
      <div className="py-3 text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 border-black rounded-lg mb-2">
            <a
              href="https://portfolio-kc-v1.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={logo} alt="logo-icon" className="h-12 w-12" />
            </a>
          </div>
          <p className="font-semibold">
            Copyright &copy; {new Date().getFullYear()} | Kevin Cieślik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
