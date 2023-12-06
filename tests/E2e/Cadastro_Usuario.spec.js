// @ts-check
import { expect, test } from "@playwright/test";
import { CadastroPageUsuario } from "../support/pages/Cadastro";
import { LoginPage } from "../support/pages/Login";

const { faker } = require("@faker-js/faker");

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomPassword = faker.internet.password(); //


let login;
let cadastroUsuario;

test.describe('Cadastro de usuário dentro da plataforma', ()=> { 
  //Caso de Teste 1: Cadastrar usuário na Plataforma
  
  //Realiza Login na plataforma
  test.beforeEach(async ({ page }) => {
    
    login = new LoginPage(page);
    cadastroUsuario = new CadastroPageUsuario(page);
   
  
    //Vai para página de login
    await login.gotoUrlLogin();
    //Espera o titulo da pagina
    await login.titlePageLogin();
    //Preencha os campos de entrada
    await login.userLogin();
    await page.waitForTimeout(2000);
  });


  test("Cadastro de usuario na plataforma", async () => {
  
    //Vai para página de cadastro
    await cadastroUsuario.gotoUrlCadastro();
    await cadastroUsuario.titlePageCadastroUsuario();
    // Preencha os campos de entrada
    await cadastroUsuario.createUserCadastro(randomName, randomEmail,randomPassword);
  });

})

