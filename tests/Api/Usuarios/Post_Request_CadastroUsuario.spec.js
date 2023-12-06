// @ts-check
import { test, expect } from "@playwright/test";
import { postTaskCreateUser } from "../../support/helpers";

test.describe("Teste de API Serverest", () => {
  
  //url
  const BaseUrl = "https://serverest.dev";

  test("Deve retornar status da requisição quando endpoint inválida", async ({request}) => {

    let response = await request.get(`${BaseUrl}/no-exist-endpoint`);
    expect(response.status()).toBe(405);
  });


  // 1 Caso de testes - Criação de usuário -POST
  test("Criação de usuario", async ({request}) => {
    await postTaskCreateUser(request);
  });

  // 2 caso de teste - POST
  test.only("Cadastro de usuario campos em branco" , async ({request}) => {

    //Body da aplicação -preenchimento das informações
    const createUSerBody = {
      nome: "",
      email: "",
      password: "",
      administrador: "",
    };

    //Opções da requisição
    const options = {
      headers: { "Content-type": "application/json;  charset=UTF-8" },
      data: createUSerBody,
    };

    //Envio da requisição
    let response = await request.post(`${BaseUrl}/usuarios`,options);
    
    const responseBody = JSON.parse(await response.text());
    const status = response.status();
    console.log(responseBody);
    console.log(`O Status é: ${status}`);

    //Verificação
    expect(response.status()).toBe(400);
    // expect(responseBody.nome).toBe("nome não pode ficar em branco");
    expect(responseBody.nome).toBe("nome não pode ficar em branco");
    expect(responseBody.email).toBe("email não pode ficar em branco");
    expect(responseBody.password).toBe("password não pode ficar em branco");
    expect(responseBody.administrador).toBe("administrador deve ser 'true' ou 'false'");

  })

});
