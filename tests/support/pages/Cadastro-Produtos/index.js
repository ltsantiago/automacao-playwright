const { expect } = require("@playwright/test");

require('dotenv').config();

const URL_CADASTRO_PRODUTOS  = process.env.URL_CADASTRO_PRODUTOS ;

exports.CadastroPageProdutos = class CadastroPageProdutos {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator(".jumbotron > form:nth-child(1) > h1:nth-child(1)");
  }

  async gotoUrlCadastroProdutos() {
    await this.page.goto(URL_CADASTRO_PRODUTOS);
  }

  async titlePageCadastroProdutos() {
    await expect(this.title).toHaveText("Cadastro de Produtos");
  }

  async createUserCadastroProdutos() {
    await this.page.getByTestId('nome').fill("PS5");
    await this.page.getByTestId('preco').fill("3000");
    await this.page.getByTestId('descricao').fill("PS5 - SONY");
    await this.page.getByTestId('quantity').fill("1");
    await this.page.setInputFiles("input[type='file']", 'tests/images/hd-externo.jpg');
    await this.page.getByRole("button >> text=Cadastrar").click();
  }
};
