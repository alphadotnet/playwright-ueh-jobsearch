export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", {
      name: "Họ tên đầy đủ Sinh viên/Ứng",
    });
    this.emailInput = page.getByRole("textbox", {
      name: "Email sinh viên dùng để đăng",
    });
    this.passwordInput = page.getByRole("textbox", { name: "Mật khẩu" });
    this.phoneInput = page.getByRole("textbox", {
      name: "Số điện thoại liên hệ",
    });
    this.submitBtn = page.getByRole('button', { name: 'Đăng ký' });
    this.registerBtn = page.getByText('Đăng ký cho Sinh viên/Ứng viên', { exact: true });
    this.Message = page.locator("[class=swal2-title]");
  }

  async goto() {
    await this.page.goto("/");
  }

  async register(name, email, password, phone) {
    await this.registerBtn.click();
    await this.nameInput.click();
    await this.nameInput.fill(name);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click;
    await this.passwordInput.fill(password);
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.submitBtn.click();
  }
}
