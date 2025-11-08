import { useState, useEffect } from 'react';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); 
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}%`);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('grayscale', grayscale);
    document.documentElement.classList.toggle('highlight-links', highlightLinks);
    document.documentElement.classList.toggle('readable-font', readableFont);
  }, [fontSize, highContrast, grayscale, highlightLinks, readableFont]);

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const {
        fontSize: savedFontSize,
        highContrast: savedHighContrast,
        grayscale: savedGrayscale,
        highlightLinks: savedHighlightLinks,
        readableFont: savedReadableFont,
      } = JSON.parse(savedSettings);
      
      setFontSize(savedFontSize || 100);
      setHighContrast(!!savedHighContrast);
      setGrayscale(!!savedGrayscale);
      setHighlightLinks(!!savedHighlightLinks);
      setReadableFont(!!savedReadableFont);
    }
  }, []);

  useEffect(() => {
    const settings = {
      fontSize,
      highContrast,
      grayscale,
      highlightLinks,
      readableFont,
    };
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [fontSize, highContrast, grayscale, highlightLinks, readableFont]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 70));
  };

  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setReadableFont(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-4 w-72 border border-gray-200 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-sm">Configurações de Acessibilidade</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar menu de acessibilidade"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="mb-2">
              <label className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Tamanho do texto</span>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={decreaseFontSize}
                    className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-xs"
                    aria-label="Diminuir tamanho da fonte"
                  >
                    A-
                  </button>
                  <button 
                    onClick={increaseFontSize}
                    className="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-xs"
                    aria-label="Aumentar tamanho da fonte"
                  >
                    A+
                  </button>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="text-xs font-medium text-gray-700">Alto contraste</label>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`px-2 py-0.5 text-xs rounded ${highContrast ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                aria-pressed={highContrast}
              >
                {highContrast ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="text-xs font-medium text-gray-700">Escala de cinza</label>
              <button 
                onClick={() => setGrayscale(!grayscale)}
                className={`px-2 py-0.5 text-xs rounded ${grayscale ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                aria-pressed={grayscale}
              >
                {grayscale ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="text-xs font-medium text-gray-700">Destacar links</label>
              <button 
                onClick={() => setHighlightLinks(!highlightLinks)}
                className={`px-2 py-0.5 text-xs rounded ${highlightLinks ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                aria-pressed={highlightLinks}
              >
                {highlightLinks ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="text-xs font-medium text-gray-700">Fonte legível</label>
              <button 
                onClick={() => setReadableFont(!readableFont)}
                className={`px-2 py-0.5 text-xs rounded ${readableFont ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                aria-pressed={readableFont}
              >
                {readableFont ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <button
              onClick={resetAccessibility}
              className="w-full mt-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-800"
            >
              Redefinir configurações
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-700 hover:text-blue-800 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar menu de acessibilidade' : 'Abrir menu de acessibilidade'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
