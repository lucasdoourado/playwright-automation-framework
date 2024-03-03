const { test, expect } = require("@playwright/test");
const url = "https://rahulshettyacademy.com/client";

import * as user from "../fixtures/data.json";

test("User can sucessfull log in the application", async ({ page }) => {
  await page.goto(url);
  await page.locator("input#userEmail").fill(user.email);
  await page.locator("input#userPassword").fill(user.password);
  await page.locator("input#login").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
