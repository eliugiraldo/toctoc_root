# Usa Node 18 LTS
FROM node:18.18.2-bullseye

# Instala dependencias de compilación
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Configura entorno seguro
RUN mkdir -p /home/node/app && \
    chown -R node:node /home/node/app

WORKDIR /home/node/app

# Configura npm
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Instala herramientas globales con legacy-peer-deps
RUN npm install -g \
    expo-cli@latest \
    eas-cli@latest \
    --legacy-peer-deps \
    --prefer-offline

# Copia archivos de dependencias
COPY --chown=node:node package.json package-lock.json ./

# Instala dependencias del proyecto con legacy-peer-deps
RUN npm ci --no-audit --prefer-offline --legacy-peer-deps

# Copia el resto de la aplicación
COPY --chown=node:node . .

EXPOSE 19000 19001 19002

CMD ["expo", "start"]