import { Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer id="sobre" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-white text-4xl font-bold text-center mb-16">
          Parceria & Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-16 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <img 
                src="/src/assets/images/logo2.png" 
                alt="HOMIN+ Logo" 
                className="h-40 md:h-52 w-auto"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-white text-2xl font-bold mb-6">Rede Social</h3>
              <a
                href="https://www.instagram.com/homiin.saude/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-200 transition-colors group"
              >
                <div className="bg-white/20 p-3 rounded-full mr-4 group-hover:bg-white/30 transition-all">
                  <Instagram className="w-7 h-7" />
                </div>
                <span className="text-xl">homiin.saude</span>
              </a>
            </div>

            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Email :</h3>
              <a
                href="mailto:homiin.saude@gmail.com"
                className="text-white hover:text-blue-200 transition-colors text-xl"
              >
                homiin.saude@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="bg-blue-800 px-6 py-4 rounded-lg shadow-lg">
            <p className="text-white text-xl font-bold">UNINASSAU</p>
          </div>
        </div>

        <div className="bg-white py-4">
          <p className="text-blue-500 text-xl text-center font-semibold">
            © Homin + 2025
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
