function AwarenessCampaigns() {
  const campaigns = [
    {
      title: 'Setembro Amarelo',
      color: 'yellow',
      image: '/src/assets/images/setembroamarelo.png',
      bgColor: 'from-yellow-300 to-yellow-200',
      textColor: 'text-black',
      url: 'https://www.setembroamarelo.com/',
      description: 'Prevenção ao suicídio e valorização da vida',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Novembro Azul',
      color: 'blue',
      image: '/src/assets/images/novembroazul.png',
      bgColor: 'from-cyan-400 via-blue-500 to-blue-600',
      textColor: 'text-black',
      url: 'https://www.inca.gov.br/novembro-azul',
      description: 'Conscientização sobre o câncer de próstata e saúde do homem',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const openCampaignSite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="campanhas" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 w-full">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1 text-sm font-semibold text-blue-600 bg-white/90 backdrop-blur-sm rounded-full">
            Campanhas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Juntos pela saúde</h2>
          <div className="w-20 h-1 bg-white/80 mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Participe das nossas campanhas e faça parte dessa corrente de conscientização e cuidado com a saúde.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {campaigns.map((campaign, index) => (
            <div 
              key={index}
              className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br ${campaign.bgColor} ${campaign.textColor}`}
              onClick={() => openCampaignSite(campaign.url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openCampaignSite(campaign.url)}
              aria-label={`Ir para o site oficial do ${campaign.title}`}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center">
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">{campaign.title}</h3>
                    <span className="ml-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white/90 backdrop-blur-sm">
                <p className="mb-6">
                  {campaign.description}
                </p>
                <div className="flex items-center font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Saiba mais sobre a campanha</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white text-sm">
            Clique em qualquer campanha para acessar o site oficial e obter mais informações.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AwarenessCampaigns;
