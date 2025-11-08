function Specialists() {
  const specialists = [
    {
      name: 'Psicologia',
      image: '/src/assets/images/psicologia.png'
    },
    {
      name: 'Urologia',
      image: '/src/assets/images/urologia.png'
    },
    {
      name: 'Dermatologia',
      image: '/src/assets/images/dermatologia.png'
    }
  ];

  return (
    <section id="especialistas" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-bold">
            "Conheça os especialistas"
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {specialists.map((specialist, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-6 transform transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/20 blur-2xl group-hover:blur-3xl transition-all"></div>
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="relative w-64 h-80 object-cover shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="bg-blue-400/60 backdrop-blur-sm px-8 py-3 rounded-full">
                <h3 className="text-white text-xl font-bold">{specialist.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-start mt-8">
          <img 
            src="/src/assets/images/logo.png" 
            alt="HOMIN+ Logo" 
            className="h-24 md:h-32 w-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Specialists;
