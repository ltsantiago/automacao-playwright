// @ts-check
import { test } from "@playwright/test";
import { putTaskyByHelperId } from "../../support/helpers";

test.describe( "Edição do cadastro", ()=>{

  //1º Caso de teste
  test.only("Deve editar usuario por seu ID", async ({ request }) => {
    await putTaskyByHelperId(request);
  });


})
