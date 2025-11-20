import { Link } from 'react-router-dom';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const About = () => {
  // Array de membros da equipe - você pode substituir as imagens posteriormente
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'Membro 1', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 2, name: 'Membro 2', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 3, name: 'Membro 3', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 4, name: 'Membro 4', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 5, name: 'Membro 5', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 6, name: 'Membro 6', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 7, name: 'Membro 7', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 8, name: 'Membro 8', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 9, name: 'Membro 9', role: 'Cargo', image: '/placeholder-avatar.png' },
    { id: 10, name: 'Membro 10', role: 'Cargo', image: '/placeholder-avatar.png' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 py-12">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nossa Equipe</h1>
          <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Conheça nossa equipe de profissionais dedicados que trabalham incansavelmente para trazer o melhor serviço para você.
          </p>
        </div>

        {/* Grid de membros da equipe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:scale-[1.02] border border-white/10"
            >
              <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=3b82f6&color=fff&size=256';
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-blue-100/90 font-medium">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Botão de voltar */}
        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
