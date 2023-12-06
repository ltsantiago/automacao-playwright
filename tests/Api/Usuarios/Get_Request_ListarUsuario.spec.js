// @ts-check
import { test, expect } from "@playwright/test";
import { getTaskyByHelper, getTaskyByHelperId } from "../../support/helpers";

require("dotenv").config();

const BASE_URL_API = process.env.BASE_URL_API;


test.describe("Listar usuário", () => {
  
  //1 caso de teste listar usuários method GET
  test.only("Deve listar usuarios cadastrados na aplicação", async ({request}) => {
    //Send requisição GET
    await getTaskyByHelper(request);
  });
  
  //2 caso de teste listar usuários pelo ID
  test("Deve listar usuarios por seu ID", async ({ request }) => {
    // Send requisição GET
    await getTaskyByHelperId(request);
  });
});




test.describe('Valida campo existente' , ()=>{
  
  //3 -LIsta se a quantidade de campos da requisição estar correta
  test("Deve validar se a quantidade de campo corresponde", async ({request,}) => {
  
    // Send requisição GET
    let response = await request.get(`${BASE_URL_API}/usuarios`);
  
    // Extração de dados
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const status = await response.status();
    console.log(`Código de Status é: ${status}`);
    // const qtdeCampos = Object.keys(jsonResponse).length;
  
    //verificação
    expect(response.ok()).toBeTruthy();
    expect(status).toBe(200);
  });

});
