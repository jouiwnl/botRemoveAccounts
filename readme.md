# Remove selfbots baseado em uma black list!


## 🚀 Começando

**O bot apresenta a seguinte função:**
Uma lista de palavras "proibidas" são definidas por usuários com maior cargo no servidor, sendo assim, qualquer pessoa que entrar no servidor com essa palavra no nick, será automaticamente banida! A cada 3 minutos, são checados usuários novos no servidor, caso alguma verificação tenha passado batida ou uma palavra tenha sido adicionada depois que alguém já entrou no servidor.

**Motivo da criação:**
Self bots são pessoas que criam usuários fakes, a fim de tumultuar ou encher um servidor de usuários sem interação. Desse modo, a pedido de algumas amigas, fiz esse projeto pra tentar diminuir esse problema.

### 🔧 Instalação

Será necessário um convite para ingressar o bot em seu servidor.

Aqui está o link de convite:

```
https://discord.com/api/oauth2/authorize?client_id=915365162268127263&permissions=545460846583&scope=bot
```

## 🛠️ Como usar?

**Comandos**
* j!check - **Ex**: j!check - Faz uma checagem limpa dos usuários no servidor, e roda a função principal do bot.
* j!newterm palavra - **Ex**: j!newterm teste - adiciona uma nova palavra na blacklist!
* j!removeterm palavra - **Ex**: j!removeterm teste - remove a palavra escrita da blacklist!
* j!wordlist - **Ex**: j!wordlist - envia uma mensagem no canal, mostrando as palavras cadastradas!

---

## Quero contribuir. Como posso?
Caso queira fazer alguma contribuição, é necessário compreender a documentação do DiscordJs que é o core do bot. Disponível em:

```
https://discord.js.org/#/docs/main/stable/general/welcome
```
### 🔧 Instalação
Instale as dependências necessárias para o projeto:

```
npm install
```

**Caso use yarn**
```
yarn
```

Após isso, você não conseguirá rodar o bot localmente, devido a ausência das configurações da API_KEY e credenciais do banco de dados, que são essenciais para o deploy do projeto. Porém, caso queira fazer um **Pull Request** como contribuição para melhorar ou resolver algum problema encontrado no bot, fique à vontade!

⌨️ com ❤️ por [João Henrique](https://github.com/jouiwnl) 😊