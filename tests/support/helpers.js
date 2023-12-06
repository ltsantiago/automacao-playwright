import { expect } from "@playwright/test";
require("dotenv").config();
const { faker } = require("@faker-js/faker");

//Env
const BASE_URL_API = process.env.BASE_URL_API;

//Get
export async function getTaskyByHelper(request) {
  //Chamando request API Helper
  let response = await request.get(`${BASE_URL_API}/usuarios`);

  // Extração de dados
  const jsonResponse = await response.json();
  const status = await response.status();
  const nomeCampo = jsonResponse.usuarios[0].nome;
  console.log(jsonResponse);
  console.log(status);
  console.log(`Olá: ${nomeCampo}, seja bem-vindo(a)`);

  //verificação
  expect(response.statusText()).toBeTruthy();
  expect(status).toBe(200);
  expect(nomeCampo).toEqual(nomeCampo);
}

export async function getTaskyByHelperId(request) {
  const userId = "0AEhESR8t4lXRvcU";

  //Chamando request API Helper
  let response = await request.get(`${BASE_URL_API}/usuarios/${userId}`);

  // Extração de dados
  const jsonResponse = await response.json();
  const status = response.status();
  console.log(jsonResponse);
  console.log(status);
  //console.log(`Olá seu id é : ${jsonResponse.usuarios[0]._id}, seja bem-vindo(a)`);

  //verificação de status code
  expect(response.statusText()).toBeTruthy();
  expect(status).toBe(200);

  //Verificando se existe ID do usuário
  // expect(jsonResponse.data.usuarios[0]._id).toEqual(userId);
}

export async function putTaskyByHelperId(request) {
  const userId = "0uxuPY0cbmQhpEd1";

  const putUser = {
    nome: "Fulano da vida",
    email: "beltranoda@qa.com.br",
    password: "teste",
    administrador: "true",
  };

  //Opções da requisição
  const options = {
    headers: { "Content-type": "application/json;  charset=UTF-8" },
    data: putUser,
  };

  //Chamando request API
  let response = await request.put(
    `${BASE_URL_API}/usuarios/${userId}`,
    options
  );

  // Extração de dados
  const jsonResponse = await response.json();
  const status = response.status();
  console.table(jsonResponse);

  //Verificação
  if (status === 200) {
    console.log(`O Status é: ${status}, Alterado com  sucesso`);
    expect(status).toBe(200);
  } else if (status === 201) {
    console.log(`O Status é: ${status}, Cadastro com sucesso`);
    expect(status).toBe(201);
  } else {
    console.log(`O Status é: ${status}, Este email já está sendo usado`);
    expect(status).toBe(400);
  }
  expect(status).toBeTruthy();
}

export async function postLogin(request) {
  //Body da aplicação -preenchimento das informações
  const createUSerBody = {
    email: "fulano@qa.com",
    password: "teste",
  };

  //Opções da requisição
  const options = {
    authorization:
      " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzAwMjUyNjMzLCJleHAiOjE3MDAyNTMyMzN9.0WxVQNvPmz-81BiId7MwLQAATyh8JPXIPbWWbeBJt6k",
    headers: { "Content-type": "application/json;  charset=UTF-8" },
    data: createUSerBody,
  };

  //Envio da requisição
  let response = await request.post(`${BASE_URL_API}/login`, options);
  const responseBody = JSON.parse(await response.text());
  const status = response.status();
  console.log(responseBody);
  console.log(`Seu Status é: ${status}`);

  //Verificação
  expect(status).toBe(200);
  expect(responseBody).toBeTruthy();
}

export async function postTaskCreateUser(request) {
  //Dados fakes
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();

  //Chamada request API via post previamente cadastrando tarefa

  //Body da aplicação -preenchimento das informações
  const createUSerBody = {
    nome: randomName,
    email: randomEmail,
    password: randomPassword,
    administrador: "true",
  };

  //Opções da requisição
  const options = {
    headers: { "Content-type": "application/json;  charset=UTF-8" },
    data: createUSerBody,
  };

  //Envio da requisição
  let response = await request.post(`${BASE_URL_API}/usuarios`, options);

  const responseBody = JSON.parse(await response.text());
  const status = response.status();
  console.log(responseBody);
  console.log(`Seu Status é: ${status}`);

  //Verificação
  expect(status).toBe(201);
  expect(responseBody.message).toBeTruthy();
}

export async function deleteTask(request) {
  const userId = "6LJcaHrgyt2VQ8d4";
  //Opções da requisição
  const options = {
    headers: { "Content-type": "application/json;  charset=UTF-8" },
  };

  //Envio da requisição
  let response = await request.delete(
    `${BASE_URL_API}/usuarios/${userId}`,
    options
  );

  const responseBody = JSON.parse(await response.text());
  const status = await response.status();
  console.log(responseBody);

  //Verificação
  if (status === 200) {
    console.log(
      `O Status é: ${status}, Registro excluído com sucesso | Nenhum registro excluído`
    );
    expect(status).toBe(200);
  } else {
    console.log(
      `O Status é: ${status}, Não é permitido excluir usuário com carrinho cadastrado`
    );
    expect(status).toBe(400);
  }
  expect(status).toBeTruthy();
}

// Produtos

export async function getListarProdutos(request) {

  //Chamando request API Helper
  let response = await request.get(`${BASE_URL_API}/produtos`);

  // Extração de dados
  const jsonResponse = await response.json();
  const status = await response.status();
  const headers = await response.headers();
  console.log(jsonResponse);
  console.log(`O Status é: ${status}`);
  // console.log(`Server: ${headers}`);


  //verificação de status code
  // expect(status).toBeTruthy();
  expect(status).toBe(200);

  //Verifica campo esperaodo no corpo da resposta
  expect(jsonResponse).toHaveProperty('produtos')
  // expect(headers['content-type']).toBeTruthy()
}
