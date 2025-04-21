export class UpdateProfile {
  constructor(page) {
    this.page = page;

    this.imageInput = page.locator("#upload_avatar_data");
    this.alertMessage = page.locator(".sweetalert2-success-title");
    this.birthdayInput = page.locator("#birthday_candidate");
    this.nameInput = page.locator("[name=fullName]");
    this.genderMaleRadio = page.locator("#male_sex");
    this.chooseMarital = page.locator(
      '//*[@id="profile_form1"]/div/div[4]/div/div'
    );
    this.maritalOptions = page.locator(".chosen-results li");
    this.phoneInput = page.locator("[name=phoneNumber]");
    this.emailInput = page.locator("[name=email1]");
    this.provinceDropdown = page.locator("#tinhid + .chosen-container");
    this.provinceOptions = page.locator(".chosen-results li");
    this.addressInput = page.locator("[name=address]");
    this.iframeInput = page
      .locator("#profile_form1")
      .getByRole("textbox", { name: "Rich Text Editor, main" });

    this.saveImageBtn = page.locator(".tb-item.save-img");
    this.categoryBtn = page.locator("#name_view_index i");
    this.closeBtn = page.locator(".close-popup").first();
    this.infoBtn = page.locator("#record_infor_navi");
    this.confirmBtn = page.locator(
      ".swal2-confirm.btn.btn-success.btn-yes-warning"
    );
    this.saveUpdateBtn = page.getByRole("button", {
      name: "Lưu thông tin cá nhân",
    });
  }

  async goto() {
    await this.page.goto("/");
    await this.closeBtn.click();
    await this.categoryBtn.click();
    await this.infoBtn.click();
  }

  async uploadAvatar() {
    await this.imageInput.setInputFiles("asset/avatar_img.png");
    await this.saveImageBtn.click();
  }

  async confirmUpload() {
    await this.confirmBtn.click();
  }

  async selectProvince(provinceName) {
    await this.provinceDropdown.click();
    const provinceOption = this.provinceOptions.getByText(provinceName);
    await provinceOption.scrollIntoViewIfNeeded();
    await provinceOption.click({ force: true });
  }

  async update(
    name,
    birthday,
    marital,
    phone,
    email,
    province,
    address,
    iframe
  ) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
    await this.birthdayInput.click();
    await this.birthdayInput.fill(birthday);
    await this.genderMaleRadio.check();
    await this.chooseMarital.click();
    await this.maritalOptions.getByText(marital).click();
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.selectProvince(province);
    await this.addressInput.click();
    await this.addressInput.fill(address);
    await this.iframeInput.click();
    await this.iframeInput.fill(iframe);
    await this.saveUpdateBtn.click();
  }
}
