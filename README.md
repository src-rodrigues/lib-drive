# lib-drive

LIB-DRIVE é uma API para a gestão de livros e autores escrita em NodeJs com banco de Dados MariaDB.

Acesse a API [AQUI](https://libdrive-whvb.onrender.com/api) hospedagem [Render Cloud](https://render.com/). Documentação da API [AQUI - Postman](https://documenter.getpostman.com/view/21138811/2s8YzZRfKe).

## Tabela de conteúdos

- [Tabela de conteúdos](#tabela-de-conteúdos)
- [Features](#features)
- [Como executar](#como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Rotas](#rotas)
- [Contribuidores:](#contribuidores)
- [Licença](#licença)

---

## Features

🔹 CRUD de livros <br/>
🔹 CRUD de autores <br/>
🔹 CRUD de disciplinas <br/>
🔹 Relacionamento entre livros e autores <br/>
🔸 Relacionamento entre livros e disciplinas <br/>
🔸 Relacionamento entre autores e disciplinas <br/>
🔹 Banco é criado automaticamente, caso não exista, basta fornecer as credenciais no arquivo `.env` na raiz do projeto. Credenciais que possui permissões `(DDL)` para criar banco de dados. <br/>

```env
DB_HOST=localhost;
DB_PORT=3306;
DB_USER=root;
DB_PASSWORD=123456;
DB_NAME=database_name;

NODEJS_PORT = 3000;
```

<i>exemplo de arquivo `.env`</i>

<details>
<summary>Serviços que oferecem instâncias do bancdo de dados MariaDB</summary>

- [Render Cloud](https://render.com/)
- [Heroku](https://www.heroku.com/)
- [Digital Ocean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/pt/)
- [Google Cloud](https://cloud.google.com/)
- [Microsoft Azure](https://azure.microsoft.com/pt-br/)
- [Oracle Cloud](https://www.oracle.com/br/cloud/)
- [IBM Cloud](https://www.ibm.com/br-pt/cloud)

</details>

</br>

## Como executar

### Pré-requisitos

- NodeJs
- Uma instância do MariaDB, <i>MySQL pode ser usado, mas não foi testado</i>.

### Instalação

- Clone o repositório

```bash
git clone https://github.com/src-rodrigues/lib-drive.git
```

- Instale as dependências

```bash
npm install
```

- Execute o projeto

```bash
npm start
```

---

## Rotas

<details>
<summary> 👈🏽 <i> Livros </i> 📚</summary>

<br/>

- `GET /api/livro` - Retorna todos os livros
- `GET /api/livro/:id` - Retorna um livro específico
- `POST /api/livro` - Cria um novo livro

```json
{
  "autor_primario_id": 2,
  "titulo": "Gambiarra.js",
  "edicao": "6.ed.",
  "ISBN": "9788534633",
  "descricao_fisica": "txx, 827 p. : il."
}
```

- `PUT /api/livro/:id` - Atualiza um livro específico

```json
{
  "autor_primario_id": 1,
  "titulo": "Gambiarra.js",
  "edicao": "8.ed.",
  "ISBN": "9788444444"
}
```

- `DELETE /api/livro/:id` - Deleta um livro específico

</details>

<details>
<summary> 👈🏽 <i> Autores </i> 👴 </summary>

- `GET /api/autor` - Retorna todos os autores
- `GET /api/autor/:id` - Retorna um autor específico
- `POST /api/autor` - Cria um novo autor

```json
{
  "nome_completo": "Zé do Pneu",
  "nome_abnt": "Zé 1990, Pneu"
}
```

- `PUT /api/autor/:id` - Atualiza um autor específico

```json
{
  "nome_completo": "Zé do Pneu",
  "nome_abnt": "Zé 2005, Pneu"
}
```

- `DELETE /api/autor/:id` - Deleta um autor específico

</details>

<details>
<summary> 👈🏽 <i> Disciplinas </i> 👨‍🏫 </summary>

- `GET /api/disciplina` - Retorna todas as disciplinas
- `GET /api/disciplina/:id` - Retorna uma disciplina específica
- `POST /api/disciplina` - Cria uma nova disciplina

```json
{
  "nome": "Programação Web"
}
```

- `PUT /api/disciplina/:id` - Atualiza uma disciplina específica

```json
{
  "nome": "Estruturas de Dados - II"
}
```

- `DELETE /api/disciplina/:id` - Deleta uma disciplina específica

</details>

---

## Contribuidores:

<div align='center'>

| [![](https://github.com/src-rodrigues.png?size=150)](https://github.com/src-rodrigues) |
| :------------------------------------------------------------------------------------: |
|                  [Victor Rodrigues](https://github.com/src-rodrigues)                  |

</div>

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
