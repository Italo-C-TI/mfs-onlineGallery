# mfs-onlineGallery
Descrição
Este projeto é uma galeria online que permite buscar e favoritar vídeos do YouTube usando micro-frontends e um backend for frontend (BFF).

Pré-requisitos
Certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:
- `Docker e Docker Compose`

1. Clonando o repositório
Clone este repositório em sua máquina local:

- `git clone https://github.com/seu_usuario/mfs-onlineGallery.git`
- `cd mfs-onlineGallery`

2. Configuração de variáveis de ambiente
- Na raiz do projeto crie um arquivo `.env` com sua chave de API do YouTube: `YOUTUBE_API_KEY`=`Sua_Youtube_API_Key`
- Você deve gerar sua `YOUTUBE_API_KEY` de aplicação neste [link](https://developers.google.com/youtube/v3/getting-started?hl=pt-br).
- Você deve ativar sua `YOUTUBE_API_KEY` para a api `YouTube Data API v3` - [link](https://console.cloud.google.com/apis/dashboard?hl=pt-br&project=galleryonline-427916).

3. Executando o projeto
Dentro do diretório principal do projeto, execute o Docker Compose para construir e iniciar os serviços:
- `docker-compose up --build`

4. Acessando o aplicativo
- Abra o navegador e vá para: Hall (Microfrontend Orchestration): `http://localhost:8000`

# PRINTS
![Screenshot 1](./assets/Screenshot1.png)
![Screenshot 2](./assets/Screenshot2.png) 