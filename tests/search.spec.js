import { test, expect } from "@playwright/test";
import { SearchJob } from "../pages/searchJob.page";

test.describe("Tìm kiếm việc làm", () => {
  let search;
  test.beforeEach(async ({ page }) => {
    search = new SearchJob(page);
    await search.goto();
  });
  test("Tìm kiếm việc làm với dữ liệu hợp lệ", async () => {
    await search.search("công nghệ", "TP. Hồ Chí Minh", "Kỹ thuật - công nghệ");

    await expect(search.title).toHaveTitle(
      "Danh sách công việc - Cổng thông tin việc làm UEH"
    );

    const totalJobsText = await search.getTotalJobsText(); // Lấy giá trị chuỗi
    expect(totalJobsText).toMatch(/^Có sẵn \d+ công việc$/); // Kiểm tra chuỗi
  });

  test("Tìm kiếm với từ khóa trống", async () => {
    await search.search("", "TP. Hồ Chí Minh", "Kỹ thuật - công nghệ");

    await expect(search.title).toHaveTitle(
      "Danh sách công việc - Cổng thông tin việc làm UEH"
    );

    const totalJobsText = await search.getTotalJobsText();
    expect(totalJobsText).toMatch(/^Có sẵn \d+ công việc$/);
  });

  test("Tìm kiếm không chọn bất kỳ thông tin nào", async () => {
    await search.search("", "Tất cả các tỉnh", "Tất cả nhóm ngành");

    await expect(search.title).toHaveTitle(
      "Danh sách công việc - Cổng thông tin việc làm UEH"
    );

    const totalJobsText = await search.getTotalJobsText();
    expect(totalJobsText).toMatch(/^Có sẵn \d+ công việc$/);
  });

  test("Tìm kiếm với ký tự đặc biệt", async () => {
    await search.search("@@@###", "TP. Hồ Chí Minh", "Kỹ thuật - công nghệ");

    await expect(search.title).toHaveTitle(
      "Danh sách công việc - Cổng thông tin việc làm UEH"
    );

    const totalJobsText = await search.getTotalJobsText();
    expect(totalJobsText).toMatch("Có sẵn 0 công việc");
  });

  test("Tìm kiếm với khoảng trắng ở đầu/cuối", async () => {
    await search.search(
      "  công nghệ  ",
      "TP. Hồ Chí Minh",
      "Kỹ thuật - công nghệ"
    );

    await expect(search.title).toHaveTitle(
      "Danh sách công việc - Cổng thông tin việc làm UEH"
    );

    const totalJobsText = await search.getTotalJobsText();
    expect(totalJobsText).toMatch(/^Có sẵn \d+ công việc$/);
  });
});
