// @ts-check
import { test } from "@playwright/test";
import { postLogin } from "../../support/helpers";

test.only("Login do Usuário", async ({ request }) => {
  await postLogin(request);
});
