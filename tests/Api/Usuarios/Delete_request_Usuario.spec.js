// @ts-check
import { test } from "@playwright/test";
import { deleteTask } from "../../support/helpers";


test("Deve deletar usuario por seu ID", async ({ request }) => {
  await deleteTask(request);
});
