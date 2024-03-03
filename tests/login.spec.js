const { test, expect } = require("@playwright/test");
const url = "https://rahulshettyacademy.com/loginpagePractise/";

test("First Test - Sucessfull Login", async ({ page }) => {
  await page.goto(url);
  await page.locator("input#username").fill("rahulshettyacademy");
  await page.locator("input#password").fill("learning");
  await page.locator("input#signInBtn").click();
  await expect(page.locator(".card-body a").first()).toContainText("iphone X");
  await expect(page.locator(".card-body a").nth(1)).toContainText(
    "Samsung Note 8"
  );
  await expect(page.locator(".card-body a").nth(2)).toContainText("Nokia Edge");
  await expect(page.locator(".card-body a").last()).toContainText("Blackberry");
});

test("Second Test - Failed to Login", async ({ page }) => {
  await page.goto(url);
  await page.locator("input#username").fill("lucas");
  await page.locator("input#password").fill("dourado");
  await page.locator("input#signInBtn").click();
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});
