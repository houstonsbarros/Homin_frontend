import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  type: string;
  file?: File; // Store the actual file object for download
}

interface ChatConversation {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeChats, setActiveChats] = useState<ChatConversation[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Redirect if not admin
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('adminFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
    
    // Start with empty conversations
    setActiveChats([]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    // Simulate file upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    // Create new file object
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: selectedFile.name,
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
      type: selectedFile.name.split('.').pop()?.toUpperCase() || 'FILE',
      file: selectedFile  // Store the actual file object for download
    };
    
    // Add to files list and save to localStorage
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem('adminFiles', JSON.stringify(updatedFiles));
    
    // Reset form
    setUploadProgress(0);
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Logado como: <span className="font-medium">{user?.username}</span>
              </span>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Visão Geral */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-900">Visão Geral</h2>
            <p className="mt-1 text-sm text-gray-500">Estatísticas e informações do sistema.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium">Usuários Online</h3>
                <p className="mt-1 text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium">Conversas Ativas</h3>
                <p className="mt-1 text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm font-medium">Arquivos Enviados</h3>
                <p className="mt-1 text-2xl font-bold text-purple-600">{files.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gerenciamento de Arquivos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-900">Gerenciamento de Arquivos</h2>
            <p className="mt-1 text-sm text-gray-500">Faça upload e gerencie os arquivos do sistema.</p>
              
              <div className="mt-4">
                <div className="flex items-center space-x-4">
                  <label className="block">
                    <span className="sr-only">Escolher arquivo</span>
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </label>
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadProgress > 0}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {uploadProgress > 0 ? `Enviando... ${uploadProgress}%` : 'Enviar'}
                  </button>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Arquivo selecionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome do Arquivo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tamanho
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Upload
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {files.map((file) => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(file.uploadedAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => {
                            if (file.file) {
                              const url = URL.createObjectURL(file.file);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = file.name;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                            }
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Baixar
                        </button>
                        <button 
                          onClick={() => {
                            const updatedFiles = files.filter(f => f.id !== file.id);
                            setFiles(updatedFiles);
                            localStorage.setItem('adminFiles', JSON.stringify(updatedFiles));
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                  {files.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        Nenhum arquivo encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        
        {/* Conversas Ativas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-900">Conversas Ativas</h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitore e interaja com as conversas em andamento.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="text-md font-medium text-gray-900">Lista de Conversas</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {activeChats.length} conversa{activeChats.length !== 1 ? 's' : ''} ativa{activeChats.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {activeChats.length === 0 ? (
                      <div className="p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma conversa ativa</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Quando houver conversas ativas, elas aparecerão aqui.
                        </p>
                      </div>
                    ) : (
                      activeChats.map((chat) => (
                        <div key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">{chat.user}</h3>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-500">{chat.timestamp}</span>
                              {chat.unread > 0 && (
                                <span className="mt-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                  {chat.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="text-md font-medium text-gray-900">Visualização do Chat</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {activeChats.length > 0 ? 'Selecione uma conversa para visualizar' : 'Nenhuma conversa ativa no momento'}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-8 bg-white">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={
                          activeChats.length > 0 
                            ? "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                            : "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        } />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-700">
                        {activeChats.length > 0 
                          ? 'Nenhuma conversa selecionada' 
                          : 'Nenhuma conversa ativa'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {activeChats.length > 0 
                          ? 'Selecione uma conversa da lista para visualizar as mensagens.'
                          : 'Quando houver conversas ativas, você poderá visualizá-las aqui.'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Digite uma mensagem..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        disabled={activeChats.length === 0}
                      />
                      <button
                        type="button"
                        className={`px-4 py-2 border border-l-0 border-gray-300 ${activeChats.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500'} rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        disabled={activeChats.length === 0}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
