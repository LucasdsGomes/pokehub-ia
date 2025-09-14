FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

RUN npm install

# Copia o código do frontend
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
