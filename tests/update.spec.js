import { test, expect } from "@playwright/test";
import { UpdateProfile } from "../pages/updateProfile.page";

test.describe("Cập nhật hồ sơ", () => {
  let update;

  test.beforeEach(async ({ page }) => {
    update = new UpdateProfile(page);
    await update.goto();
  });

  test("Cập nhật ảnh đại diện", async () => {
    await update.uploadAvatar();
    await expect(update.confirmBtn).toBeVisible();
    await update.confirmUpload();
    await expect(update.alertMessage).toHaveText(
      "Cập nhật ảnh đại diện thành công!"
    );
  });

  test("Cập nhật thông tin cá nhân với dữ liệu hợp lệ", async () => {
    await update.update(
      "Nguyễn Văn A",
      "10/09/2004",
      "Chưa kết hôn",
      "0123456789",
      "test123@gmail.com",
      "TP. Hồ Chí Minh",
      "123 Đường ABC",
      "Sinh viên"
    );

    await expect(update.alertMessage).toHaveText(
      "Cập nhật thông tin cá nhân thành công!"
    );
  });
});
