const { test, expect } = require("@playwright/test");
const url = "https://rahulshettyacademy.com/loginpagePractise/";

test("First Test - Sucessfull Login", async ({ page }) => {
  await page.goto(url);
  await page.locator("input#username").fill("rahulshettyacademy");
  await page.locator("input#password").fill("learning");
  await page.locator("input#signInBtn").click();
  await page.waitForLoadState("networkidle");
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

test("Login as Admin Consultant", async ({ page }) => {
  await page.goto(url);
  await page.locator("input#username").fill("rahulshettyacademy");
  await page.locator("input#password").fill("learning");
  await page.locator(".radiotextsty").last().check();
  await page.locator("button#okayBtn").click();
  await page.locator("select.form-control").selectOption("consult"); // select the value=""
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("input#terms").check();
});

test("Handling child windows/tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  const documentLink = await page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // listen for any new page
    documentLink.click(), // new page is opened
  ]);
  // assertion on the child window/tab
  await expect(newPage.locator(".red")).toContainText(
    "mentor@rahulshettyacademy.com"
  );
  // assertion on the parent window/tab
  await expect(page.locator("p.text-center")).toContainText(
    "rahulshettyacademy"
  );
});
