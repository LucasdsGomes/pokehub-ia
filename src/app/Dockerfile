# Base Node.js leve
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Next.js
EXPOSE 3000

# Comando para rodar em modo desenvolvimento com hot reload
CMD ["npm", "run", "dev"]
