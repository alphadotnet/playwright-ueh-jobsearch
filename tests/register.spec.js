import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

test.describe("Đăng ký tài khoản mới", () => {

  test("Đăng ký tài khoản mới với dữ liệu hợp lệ", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register(
      "Test User 123",
      "test124@gmail.com",
      "password123",
      "0123456789"
    );
  });

  test("Đăng ký tài khoản mới với email đã tồn tại", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register(
      "Test User 123",
      "test124@gmail.com",
      "password123",
      "0123456789"
    );

    await expect(register.Message).toHaveText("Lỗi! Tài khoản Sinh viên/Ứng viên đã tồn tại.");
  });

  test("Đăng ký tài khoản mới với email không hợp lệ", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register(
      "Test_User",
      "test123.gmail.com",
      "password123",
      "0123456789"
    );
  });
});
