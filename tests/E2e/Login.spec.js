// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../support/pages/Login";

//Caso de Teste 1:  Login com sucesso

test.only("Deve realizar login com sucesso ", async ({ page }) => {

  const login = new LoginPage(page);

  //Vai para página de login
  await login.gotoUrlLogin();

  //Espera o titulo da pagina
  await login.titlePageLogin();

  //Preencha os campos de entrada
  await login.userLogin();
});

//Caso de Teste 2:  Login com senha incorreta
test("Senha incorreta ", async ({ page }) => {

  const login = new LoginPage(page);

  //Vai para página de login
  await login.gotoUrlLogin();

  //Espera o titulo da pagina
  await login.titlePageLogin();

  // Preencha os campos de entrada e submeter o login
  await login.userLogin();

  //retorno da mensagem de erro
  const toastError = page.locator(".alert > span:nth-child(2)");
  await expect(toastError).toHaveText("Email e/ou senha inválidos");

  //espera para verificação da mensagem
  await page.waitForTimeout(3000);
});
