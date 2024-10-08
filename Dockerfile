FROM node:22-bookworm-slim

WORKDIR /app

# Copia solo package.json y package-lock.json para aprovechar la caché
COPY package*.json ./

# Instala todas las dependencias, incluidas las devDependencies
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Cambia a root para evitar problemas de permisos
USER root

# Ejecutar la aplicación
CMD ["npm", "run", "dev"]
