import { useState, useEffect } from 'react';

function HealthTips() {
  const tips = [
    {
      title: 'A Importância da Saúde Mental Masculina',
      description: 'A saúde mental masculina é muitas vezes negligenciada devido a estigmas sociais. É crucial que os homens reconheçam a importância de suas emoções e não hesitem em buscar apoio. Procurar ajuda profissional não é sinal de fraqueza, mas sim de força e autoconhecimento. Cuidar da mente é investir em uma vida mais plena e equilibrada.',
      image: '/src/assets/images/aimportanciadasaudementalmasculina.png'
    },
    {
      title: 'Pense na sua Saúde',
      description: 'Para uma vida mais saudável, é fundamental evitar o tabagismo, moderar o consumo de álcool e buscar alternativas para lidar com o estresse. Pequenas mudanças hoje podem trazer grandes benefícios amanhã.',
      image: '/src/assets/images/pensenasuasaude.png'
    },
    {
      title: 'Alimentação Forte',
      description: 'Uma alimentação equilibrada é a base de uma vida saudável. Inclua em sua dieta alimentos como frutas, verduras, legumes e carnes magras.',
      image: '/src/assets/images/alimentacaoforte.png'
    },
    {
      title: 'Prevenção é o melhor remédio',
      description: 'Cuide-se desde cedo para prevenir um problema maior no futuro. Consultas e exames preventivos são essenciais para diagnósticos; doenças em estágio inicial, aumentando as chances de tratamento.',
      image: '/src/assets/images/prevencaoeomelhorremedio.png'
    },
    {
      title: 'Durma Bem, Viva Melhor',
      description: 'O sono de qualidade é vital para a saúde física e mental. Influencia no funcionamento do sistema imunológico. Um bom descanso melhora o humor, a concentração e a saúde como um todo.',
      image: '/src/assets/images/durmabemvivamelhor.png'
    },
    {
      title: 'Movimente-se Pela Sua Saúde',
      description: 'Prática regular de exercícios físicos é fundamental. Além de ajudar no controle do peso, a prática de exercícios traz a atividade física libera hormônios que promovem o bem-estar e a disposição física e mental. Cuide de você todos os dias, faça dela um hábito.',
      image: '/src/assets/images/movimentesepelasuasaude.png'
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance to next tip every 10 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isPaused, tips.length]);

  const goToNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const goToPrevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };

  const goToTip = (index: number) => {
    setCurrentTipIndex(index);
  };

  const currentTip = tips[currentTipIndex];

  return (
    <section className="py-16 px-6">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-white text-4xl font-bold">Dicas de Saúde</h2>
          <img 
            src="/src/assets/images/logo.png" 
            alt="HOMIN+ Logo" 
            className="h-24 md:h-32 w-auto"
          />
        </div>


        <div 
          className="relative bg-blue-600/40 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 ease-in-out transform hover:bg-blue-600/50"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevTip}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
            aria-label="Dica anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNextTip}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
            aria-label="Próxima dica"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Current Tip */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <img
                src={currentTip.image}
                alt={currentTip.title}
                className="w-full max-w-xs h-56 object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-2xl font-bold mb-4">{currentTip.title}</h3>
              <p className="text-white text-base leading-relaxed">
                {currentTip.description}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTip(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentTipIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                aria-label={`Ir para dica ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthTips;
