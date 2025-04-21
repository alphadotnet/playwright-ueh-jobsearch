import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Đăng nhập tài khoản", () => {
  test("Đăng nhập tài khoản với dữ liệu hợp lệ", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      "test124@gmail.com",
      "password123",
    );

    await expect(login.url).toHaveURL("https://vieclam.ueh.edu.vn/");
  });

  test("Đăng nhập tài khoản với dữ liệu không hợp lệ", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      "test124@gmail.com",
      "password",
    );

    await expect(login.Message).toHaveText('Tài khoản hoặc mật khẩu không chính xác');
  });

  test("Đăng nhập với tài khoản bị thiếu", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      "",
      "password123",
    );

    expect(login.tooltip).toBeTruthy();
  });

  test("Đăng nhập với mật khẩu bị thiếu", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      "test124@gmail.com",
      "",
    );

    expect(login.tooltip).toBeTruthy();
  });
});
