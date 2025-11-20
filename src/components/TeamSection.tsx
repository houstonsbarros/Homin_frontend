const teamMembers = [
  { 
    name: 'dev.prii', 
    instagram: 'https://www.instagram.com/dev.prii',
    image: '/src/assets/images/dev.prii.png'
  },
  { 
    name: 'ian_zamba', 
    instagram: 'https://www.instagram.com/ian_zamba',
    image: '/src/assets/images/ian_zamba.jpg'
  },
  { 
    name: 'o_titox', 
    instagram: 'https://www.instagram.com/o_titox',
    image: '/src/assets/images/o_titox.jpg'
  },
  { 
    name: 'eh_neto', 
    instagram: 'https://www.instagram.com/eh_neto',
    image: '/src/assets/images/eh_neto.png'
  },
  { 
    name: 'dannykvlyn', 
    instagram: 'https://www.instagram.com/dannykvlyn',
    image: '/src/assets/images/dannykvlyn.png'
  },
  { 
    name: 'thurrr_29', 
    instagram: 'https://www.instagram.com/thurrr_29',
    image: '/src/assets/images/thurrr_29.jpg'
  },
  { 
    name: 'maycon.fp_', 
    instagram: 'https://www.instagram.com/maycon.fp_',
    image: '/src/assets/images/maycon.fp_.png'
  },
  { 
    name: '_renosoo', 
    instagram: 'https://www.instagram.com/_renosoo',
    image: '/src/assets/images/_renosoo.png'
  },
  { 
    name: '_marii.andr', 
    instagram: 'https://www.instagram.com/_marii.andr',
    image: '/src/assets/images/_maa.vitt2.jpg'
  },
  { 
    name: '_maa.vitt', 
    instagram: 'https://www.instagram.com/_maa.vitt',
    image: '/src/assets/images/_maa.vitt.jpg'
  },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-cyan-400">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Nossa Equipe
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <a
              key={member.name}
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-full aspect-[3/4] max-w-[180px] overflow-hidden rounded-lg border-2 border-white/30 shadow-xl bg-white/10 backdrop-blur-sm mb-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-90"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/src/assets/images/placeholder.png';
                    target.className = 'w-full h-full object-cover';
                  }}
                />
              </div>
              <span className="text-white font-medium text-sm sm:text-base">@{member.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
