function Hero() {

  return (
    <section id="hero" className="py-8 px-6 relative overflow-hidden" aria-label="Página inicial">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Conteúdo do lado esquerdo */}
          <div className="text-white">
            <div className="-mb-1">
              <img 
                src="/src/assets/images/logo.png" 
                alt="HOMIN+ Logo" 
                className="h-80 md:h-96 w-auto"
              />
            </div>
            <p className="text-3xl md:text-400xl mb-4 font-light leading-relaxed">
              Sua jornada para o<br />
              Bem-estar começa aqui!
            </p>
            <a 
              href="#sobre" 
              className="inline-block bg-white/90 backdrop-blur-sm text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Saiba mais sobre nossos serviços"
            >
              Saiba mais
            </a>
          </div>
          
          {/* Imagem do médico */}
          <div className="hidden md:flex justify-end items-center opacity-80">
            <img 
              src="/src/assets/images/mediconatela.png" 
              alt="Médico" 
              className="h-[500px] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
