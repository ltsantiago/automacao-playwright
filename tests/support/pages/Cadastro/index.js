const { expect } = require('@playwright/test');

require('dotenv').config();


const URL_CADASTRO_USUARIOS =process.env.URL_CADASTRO_USUARIOS;

exports.CadastroPageUsuario = class CadastroPageUsuario {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.titlePageCadastro = page.locator(".register-page h2");
    this.titleCadastroUser = page.locator(".jumbotron > form:nth-child(1) > h1:nth-child(1)");
    this.checkboxElement =   page.locator('input[type="checkbox"]');
  }

  async gotoUrlCadastro() {
    await this.page.goto(URL_CADASTRO_USUARIOS)
  }

  async title(){
    await expect(this.titlePageCadastro).toHaveText("Cadastro");
  }

  async titlePageCadastroUsuario(){
     
    
    await expect(this.titleCadastroUser).toHaveText("Cadastro de usuários");
  }

 
  async createUserCadastro(randomName, randomEmail,randomPassword){
    await this.page.fill('input[name="nome"]', randomName);
    await this.page.fill('input[name="email"]', randomEmail);
    await this.page.fill('input[name="password"]', randomPassword);
    await this.checkboxElement.click()
    await this.page.click("button >> text=Cadastrar");
  }

  async alertHaveTextCadastroSuccess() {
    const toastMessage = this.page.locator("div > form > div:nth-child(3) > div > a");
    await expect(toastMessage).toHaveText("Cadastro realizado com sucesso");    
  
  }

  async alertHaveTextCadastroInvalid() {
    const toastMessageInvalidName = this.page.locator("div.alert:nth-child(3) > span:nth-child(2)");
    await expect(toastMessageInvalidName).toHaveText("Nome é obrigatório");    

    const toastMessageInvalidEmail = this.page.locator("div.alert:nth-child(4) > span:nth-child(2)");
    await expect(toastMessageInvalidEmail).toHaveText("Email é obrigatório"); 

    const toastMessageInvalidPassword = this.page.locator("div.alert:nth-child(5) > span:nth-child(2)");
    await expect(toastMessageInvalidPassword).toHaveText("Password é obrigatório");
  
    await this.page.waitForTimeout(3000);
  }

  async alertHaveTextCadastroInvalidEmailBranco() {

    const toastMessageInvalidEmailBranco = this.page.locator(".alert > span:nth-child(2)");
    await expect(toastMessageInvalidEmailBranco).toHaveText("Este email já está sendo usado");  
    await this.page.waitForTimeout(3000);
  }

 
 
 
};