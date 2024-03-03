const { test, expect } = require("@playwright/test");
const url = "https://rahulshettyacademy.com/client";

import * as user from "../fixtures/data.json";

test("Register user", async ({ page }) => {
  await page.goto(url);
  await page.locator("a.text-reset").click();
  await expect(page.locator(".login-title")).toContainText("Register");
  await page.locator("input#firstName").fill(user.firstname);
  await page.locator("input#lastName").fill(user.lastname);
  await page.locator("input#userEmail").fill(user.email);
  await page.locator("input#userMobile").fill(user.phone);
  await page
    .locator('select[formcontrolname="occupation"]')
    .selectOption("3: Engineer");
  await page.locator("input[value='Male']").check();
  await page.locator("input#userPassword").fill(user.password);
  await page.locator("input#confirmPassword").fill(user.password);
  await page.locator("[class='col-md-1'] .ng-untouched").check();
  await page.locator("input#login").click();
  await expect(page.locator(".headcolor")).toContainText(
    "Account Created Successfully"
  );
});
