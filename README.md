
# SisVehicles - Gerenciamento Inteligente de Frota para Automóvel

O SisVehicles é um aplicativo móvel desenvolvido em React Native para o gerenciamento eficiente de frotas de caminhões.

Com recursos avançados de GPS, o SisVehicles permite o rastreamento em tempo real da localização de cada veículo, oferecendo informações precisas sobre posição, velocidade e direção. Com dados detalhados sobre consumo de combustível, quilometragem e manutenção, os usuários podem otimizar o desempenho individual de cada veiculo. 


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/juanpbarros20/sis-vehicles.git
```

Entre no diretório do projeto

```bash
  cd sis-vehicles
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Configurando Back-End

```bash
Acesse o site do Firebase: https://firebase.google.com/?hl=pt-br e faça login na sua conta do Google.
```

```bash
No console do Firebase, clique em "Adicionar projeto" para criar um novo projeto.
```
```bash
Insira um nome para o seu projeto e clique em "Continuar".
```
```bash
Na seção "Desenvolvimento", escolha a opção "Web" (ícone de "</>") para adicionar o Firebase ao seu aplicativo web.
```
```bash
Insira um nome para o aplicativo e clique em "Registrar app".
```
```bash
Na seção "Adicionar SDK do Firebase", copie as configurações de inicialização do Firebase, incluindo o objeto de configuração com as chaves API e o identificador do projeto.
```
```bash
No diretório do projeto SisVehicles no seu ambiente de desenvolvimento, abra o arquivo de configuração do Firebase. Dependendo da estrutura do projeto, esse arquivo pode estar localizado em algum lugar como src/config/firebase.js ou na raiz do projeto.
```
```bash
Cole as configurações do Firebase que você copiou do console na etapa 6 no arquivo de configuração do Firebase.
```
```bash
Salve o arquivo de configuração.
```
```bash
Pode ser necessario inserir o comando "npm install firebase".
```
