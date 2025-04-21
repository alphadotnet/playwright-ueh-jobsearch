export class SearchJob {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", {
      name: "Tìm theo chức danh, vị trí, k",
    });

    this.chooseProvince = page.locator("#job_province_search2_chosen");
    this.provinceOptions = page.locator('.chosen-results li');

    this.chooseIndustry = page.locator("#job_group_search2_chosen");
    this.industryOptions = page.locator('.chosen-results li');

    this.searchBtn = page.getByRole("button", { name: "Tìm việc " });
    this.closeBtn = page.locator('.close-popup').first();

    this.title = page;
    this.totalJobsText = page.locator('#total_job_available');
  }

  async goto() {
    await this.page.goto("/");
  }

  async search(info, province, industry) {
    await this.closeBtn.click();
    await this.searchInput.click();
    await this.searchInput.fill(info);
    await this.chooseProvince.click();
    await this.provinceOptions.getByText(province).click();
    await this.chooseIndustry.click();
    await this.industryOptions.getByText(industry).click();
    await this.searchBtn.click();
  }

  async getTotalJobsText() {
    return await this.totalJobsText.innerText(); // Lấy giá trị thực sự của totalJobsText
  }
}
