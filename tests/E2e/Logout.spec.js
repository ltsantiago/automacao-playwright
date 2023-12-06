// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../support/pages/Login";
import { LogoutPage } from "../support/pages/Logout";

let login;
let logout;

//Realiza Login na plataforma
test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  logout = new LogoutPage(page);

  // Runs before each test and signs in each page.

  await login.gotoUrlLogin();

  await login.titlePageLogin();

  //Preencha os campos de entrada e submeter
  await login.userLogin();
});

//Caso de teste 01 - Realizar logout
test("Deve realizar Logout na plataforma", async ({ page }) => {
  await page.waitForTimeout(3000);
  await logout.gotoUrlLogout();
  await logout.titlePageLogout();
  await logout.clickButtonLogout();
});
