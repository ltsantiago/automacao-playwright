// @ts-check
import { test } from "@playwright/test";
import { getListarProdutos } from "../../support/helpers";


test("Deve listar os produtos cadastrados", async ({ request }) => {
  await getListarProdutos(request);
});
