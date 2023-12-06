const { expect } = require('@playwright/test');
require('dotenv').config();


const URL_LOGIN  = process.env.URL_LOGIN ;

exports.LoginPage = class LoginPage {
  
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator(".login-page h1");
  }

  async gotoUrlLogin() {
    await this.page.goto(URL_LOGIN);
  }

  async titlePageLogin(){
    await expect(this.title).toHaveText("Login");
  }

  async userLogin(){
    await this.page.getByTestId('email').fill("fulano@qa.com");
    await this.page.getByTestId('senha').fill("teste");
    await this.page.getByRole("button >> text=Entrar").click();
  }
  

};