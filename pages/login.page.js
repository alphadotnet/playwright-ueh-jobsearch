export class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByRole('textbox', { name: 'Email sinh viên' });
      this.passwordInput = page.getByRole('textbox', { name: '********' });
      this.submitBtn = page.getByRole('button', { name: 'Đăng nhập' });

      this.url = page;
      this.Message = page.locator(".sweetalert2-success-title");
      this.tooltip = page.locator('text=Please fill out this field');
    }
  
    async goto() {
      await this.page.goto("/");
    }
  
    async login(email, password) {
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click;
      await this.passwordInput.fill(password);
      await this.submitBtn.click();
    }
  }
  