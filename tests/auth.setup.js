// tests/auth.setup.js
import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../.auth/user.json");

setup("Authenticate and save storage", async ({ page }) => {
  // Truy cập trang đăng nhập
  await page.goto("https://vieclam.ueh.edu.vn/");

  // Nhập email và mật khẩu
  await page.getByRole('textbox', { name: 'Email sinh viên' }).fill('test124@gmail.com');
  await page.getByRole('textbox', { name: '********' }).fill('password123');

  // Click nút đăng nhập
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  // Đợi chuyển đến trang chủ
  await page.waitForURL("https://vieclam.ueh.edu.vn/");

  // Kiểm tra popup hoặc avatar để xác nhận đã đăng nhập
  await expect(page.locator('.close-popup > .la').first()).toBeVisible();

  // Lưu storageState (cookie + localStorage) vào file
  await page.context().storageState({ path: authFile });
});
