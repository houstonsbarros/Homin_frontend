# HOMIN+ - Plataforma de Saúde

## Descrição
O HOMIN+ é uma plataforma de saúde que visa facilitar o acesso a informações e serviços de saúde, com foco em prevenção e bem-estar. A plataforma oferece recursos como dicas de saúde, campanhas de conscientização e uma interface acessível.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd homin-main
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   VITE_FIREBASE_API_KEY=sua_chave_aqui
   VITE_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-projeto-id
   VITE_FIREBASE_STORAGE_BUCKET=seu-bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```

## Executando o Projeto

1. **Modo de Desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   O servidor de desenvolvimento será iniciado em [http://localhost:5173](http://localhost:5173)

2. **Build para Produção**
   ```bash
   npm run build
   # ou
   yarn build
   ```
   Os arquivos otimizados para produção serão gerados na pasta `dist/`

3. **Servir a Build de Produção**
   ```bash
   npm run preview
   # ou
   yarn preview
   ```

## Estrutura do Projeto

```
homin-main/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos do React
│   ├── pages/          # Páginas da aplicação
│   │   ├── admin/      # Páginas administrativas
│   │   └── ...
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada da aplicação
├── public/             # Arquivos estáticos
├── .env                # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usuários de Teste

### Administrador
- **Email:** homiin.saude@gmail.com
- **Senha:** hominmais

### Usuário Comum
- **Email:** arthur@gmail.com
- **Senha:** 123456

## Recursos

- Autenticação de usuários
- Painel administrativo
- Dicas de saúde
- Campanhas de conscientização
- Interface acessível
- Design responsivo

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento
- `build`: Gera a build de produção
- `preview`: Previa a build de produção localmente
- `lint`: Executa o linter no código
- `format`: Formata o código usando Prettier

## Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato

Equipe HOMIN+ - [contato@hominmais.com](mailto:contato@hominmais.com)

---

Desenvolvido com ❤️ pela equipe HOMIN+
