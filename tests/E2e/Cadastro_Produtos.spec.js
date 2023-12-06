// @ts-check
import { test } from "@playwright/test";
import { CadastroPageProdutos } from "../support/pages/Cadastro-Produtos";
import { LoginPage } from "../support/pages/Login";



//Variaveis
let login;
let cadastroProdutos;


//Caso de Teste 1: Cadastrar Produtos na Plataforma
//Realiza Login na plataforma
test.beforeEach(async ({page}) => {

  login = new LoginPage(page);
  cadastroProdutos = new CadastroPageProdutos(page);
  
  //Vai para página de login
  await login.gotoUrlLogin();

  //Espera o titulo da pagina
  await login.titlePageLogin();

  //Preencha os campos de entrada
  await login.userLogin();

});

test("Cadastro de produtos na plataforma", async ({ page }) => {

  
  await page.waitForTimeout(3000);
  //Vai para página de cadastro
  await cadastroProdutos.gotoUrlCadastroProdutos();
  await cadastroProdutos.titlePageCadastroProdutos();

  // Preencha os campos de entrada
  await cadastroProdutos.createUserCadastroProdutos();
  await page.waitForTimeout(5000);
});


