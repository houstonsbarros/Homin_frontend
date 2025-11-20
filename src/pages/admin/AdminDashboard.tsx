import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  type: string;
  file?: File;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const savedFiles = localStorage.getItem('adminFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: selectedFile.name,
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
      type: selectedFile.name.split('.').pop()?.toUpperCase() || 'FILE',
      file: selectedFile
    };
    
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem('adminFiles', JSON.stringify(updatedFiles));
    
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

        {}
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
        
        {}
        <div className="bg-white rounded-lg shadow overflow-hidden">
         
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
