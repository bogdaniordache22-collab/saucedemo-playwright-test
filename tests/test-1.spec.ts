import { test, expect } from '@playwright/test';

test.describe('SauceDemo E2E Suite', () => {
  
  // This block runs before each test scenario, ensuring the user is logged in
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL
    await page.goto('https://saucedemo.com');

    // Login with standard credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify the user was redirected to the products page
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Scenario 1: Full successful purchase flow', async ({ page }) => {
    // Add product to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Navigate to the shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Start the checkout process
    await page.locator('[data-test="checkout"]').click();

    // Fill in the personal information form
    await page.locator('[data-test="firstName"]').fill('Bogdan');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Ccomplete the transaction
    await page.locator('[data-test="finish"]').click();
    
    // Check to Validate that the success message is displayed correctly
    const successMessage = page.locator('[data-test="complete-header"]');
    await expect(successMessage).toHaveText('Thank you for your order!');
  });

  test('Scenario 2: Validation error when checkout fields are empty', async ({ page }) => {
    // Add a product and navigate to checkout to trigger validations
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Attempt to continue without filling required information
    await page.locator('[data-test="continue"]').click();

    // Verify that the validation error message is visible and correct
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Error: First Name is required');
  });

  test('Scenario 3: Successful logout from the sidebar menu', async ({ page }) => {
    // Open the side menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    
    // Click the logout link
    await page.locator('[data-test="logout-sidebar-link"]').click();
    
    // Verify that the user is redirected back to the login page
    await expect(page).toHaveURL('https://www.saucedemo.com');
  });

});