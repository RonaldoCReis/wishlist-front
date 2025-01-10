# Etapa 1: Construção
FROM node:18-alpine AS builder

WORKDIR /app
RUN corepack enable


# Copia os arquivos de dependências
COPY package.json ./

# Instala as dependências
RUN yarn

# Copia o restante do código
COPY . .

# # Build da aplicação
# RUN yarn build


# # Etapa 2: Execução
# FROM node:18-alpine

# WORKDIR /app

# # Copia apenas os arquivos necessários do estágio de construção
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public

# RUN yarn

# Expondo a porta 3334
EXPOSE 3334

# Comando para iniciar a aplicação
# CMD ["yarn", "start"]
CMD ["yarn", "dev"]