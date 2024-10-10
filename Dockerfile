FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

# Crear un usuario y cambiar a él
RUN useradd -ms /bin/bash appuser
USER appuser

EXPOSE 3000

CMD ["npm", "test"]
