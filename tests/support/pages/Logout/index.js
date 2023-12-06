const { expect } = require("@playwright/test");

require("dotenv").config();

const URL_LOGOUT = process.env.URL_LOGOUT;

exports.LogoutPage = class LogoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   *
   */

  constructor(page) {
    this.page = page;
    this.title = page.locator(".lead");
  }

  async gotoUrlLogout() {
    await this.page.goto(URL_LOGOUT);
  }

  async titlePageLogout() {
    await expect(this.title).toHaveText(
      "Este é seu sistema para administrar seu ecommerce."
    );
  }

  async clickButtonLogout() {
    // Submeti ao botão Logout
    await this.page.click("button >> text=Logout");
  }
};
