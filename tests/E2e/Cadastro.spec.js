// @ts-check
import { test } from "@playwright/test";
import { CadastroPageUsuario } from "../support/pages/Cadastro";

const { faker } = require("@faker-js/faker");

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomPassword = faker.internet.password(); //

let cadastro;

test.beforeEach(({ page }) => {
  cadastro = new CadastroPageUsuario(page);
});

test.describe('Cadastro', ()=>{

  // Caso de Teste 1: Cadastro de Usuário
  test.only("Deve cadastrar usuario como administrador", async () => {
    //Vai paara página de cadastro
    await cadastro.gotoUrlCadastro();
  
    //Titulo da página
    await cadastro.title();
  
    await cadastro.createUserCadastro(randomName, randomEmail, randomPassword);
    //retorno da mensagem
    await cadastro.alertHaveTextCadastroSuccess();
  });

  //Caso de Teste 2: Campos Obrigatórios em Branco
  test("Campos sem preenchimento de credenciais válidas", async () => {
    await cadastro.gotoUrlCadastro();
    //Titulo da página
    await cadastro.title();
  
    // Preencha os campos de entrada e submeter o login
    await cadastro.createUserCadastro();
    //retorno da mensagem
    await cadastro.alertHaveTextCadastroInvalid();
  });

  //Caso de Teste 3: E-mail existente na base
  test("Cadastro com email já existente", async () => {
  
    //Vai paara página de cadastro
    await cadastro.gotoUrlCadastro();
    //Titulo da página
    await cadastro.title();
  
    await cadastro.createUserCadastro();
  
    //retorno da mensagem
    await cadastro.alertHaveTextCadastroInvalidEmailBranco();
  });

})



