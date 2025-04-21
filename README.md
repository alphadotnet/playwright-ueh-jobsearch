# UEH JOB SEARCH - Dự Án Kiểm Thử Tự Động

**UEH Job Search** là một dự án mô phỏng cổng thông tin việc làm nội bộ dành cho sinh viên Trường Đại học Kinh tế TP.HCM. Mục tiêu chính của dự án là:

- Tạo môi trường thực hành kiểm thử tự động.
- Triển khai các kỹ thuật **Playwright** để đảm bảo chất lượng ứng dụng web.

---

## Tổng Quan Dự Án

Trang web https://vieclam.ueh.edu.vn/ cung cấp:

1. **Đăng nhập / Đăng ký** cho ứng viên.
2. **Tìm kiếm việc làm** theo từ khóa, ngành nghề, tỉnh/thành.
3. **Cập nhật hồ sơ cá nhân**: ảnh đại diện, họ tên, ngày sinh, tình trạng hôn nhân, liên hệ...
4. **Kiểm thử xác nhận thông báo thành công** (SweetAlert2 popup)

Dự án này thử nghiệm một số chức năng chính và quan trọng của trang Web.

---

## Công Nghệ & Thư Viện

- **Playwright** (JavaScript) cho automation tests.
- **Node.js**, **npm** cho quản lý package.
- **Page Object Model (POM)** để tổ chức code test.
- **Chọn lọc reporter**, CI/CD với Github Actions (tuỳ chọn).

---

## Cấu Trúc Thư Mục

```
Project_UEH_JOBSEARCH/
├── .auth/                    # Lưu trữ session sau login
│   └── user.json
├── asset/                    # Tài nguyên tĩnh, ví dụ ảnh avatar
│   └── avatar_img.png
├── node_modules/             # Dependencies Node
├── pages/                    # Page Object Model classes
│   ├── login.page.js
│   ├── register.page.js
│   ├── searchJob.page.js
│   └── updateProfile.page.js
├── tests/                    # Các test suite của Playwright
│   ├── auth.setup.js         # Đăng nhập, lưu storageState
│   ├── login.spec.js         # Test đăng nhập
│   ├── register.spec.js      # Test đăng ký
│   ├── search.spec.js        # Test tìm kiếm việc làm
│   └── update.spec.js        # Test cập nhật hồ sơ
├── test-results/             # Kết quả và error-context sau khi chạy test
├── playwright.config.js      # Cấu hình test runner, projects
├── package.json              # Khai báo scripts và dependencies
└── README.md                 # File này
```

---

## Các Test Case Đã Triển Khai

1. **Đăng nhập và lưu session**: Sử dụng Playwright để điền form login, lưu `storageState` vào `.auth/user.json` nhằm tái sử dụng trong các test khác.

2. **Đăng nhập**:
   - Test với tài khoản hợp lệ.
   - Test với tài khoản sai / không tồn tại.

3. **Đăng ký tài khoản**:
   - Đăng ký mới thành công.
   - Đăng ký với email đã tồn tại (kiểm tra validation error).

4. **Tìm kiếm việc làm**:
   - Tìm kiếm với từ khóa, ngành nghề, tỉnh/thành hợp lệ.
   - Xử lý trường hợp không nhập từ khóa hoặc không có kết quả.

5. **Cập nhật hồ sơ cá nhân**:
   - Upload ảnh đại diện (file upload).
   - Cập nhật thông tin: tên, ngày sinh (input), tình trạng hôn nhân (custom dropdown Chosen), số điện thoại, email, tỉnh/thành (Chosen), địa chỉ (textarea), nghề nghiệp (rich text editor).

---

## Kỹ Thuật & Triển Khai Playwright

- **Page Object Model**: Tách biệt các hành động trên trang (`pages/*.page.js`) và các test case (`tests/*.spec.js`).

- **Storage State**:
  - Dùng `page.context().storageState({ path })` để lưu cookies & localStorage.
  - Cấu hình `storageState` trong `playwright.config.js` cho project logged-in.

- **Multiple Projects**:
  - Project `setup` chỉ chạy 1 lần để chuẩn bị login.
  - Project `logged-in` reuse session, và project `guest` không login.

- **Chờ đợi thông minh**:
  - `await locator.waitFor({ state: 'visible' })` và `expect(locator).toBeVisible()`.
  - Xử lý popup bằng `if (await closeBtn.isVisible()) await closeBtn.click();`.

- **Thao tác đặc biệt**:
  - **File Upload**: `setInputFiles()`
  - **Custom Dropdown** (Chosen.js): click `.chosen-container`, chọn `li` tương ứng.
  - **Rich Text Editor**: dùng `.getByRole('textbox')` tương tác.

- **Báo cáo & Debug**:
  - Sử dụng reporter HTML: `npx playwright test --reporter=html` và `show-report`.
  - Chế độ debug: `npx playwright test --debug`.

---

## Hướng Dẫn Chạy

1. Cài đặt:
   ```bash
   npm install
   npx playwright install
   ```
2. Chạy setup (login):
   ```bash
   npx playwright test --project=setup
   ```
3. Chạy test full:
   ```bash
   npx playwright test
   ```
4. Chạy test riêng:
   ```bash
   npx playwright test tests/update.spec.js --project=logged-in
   ```
5. Chạy test có login:
   ```bash
   npx playwright test --project=logged-in
   ```
6. Chạy test không login:
   ```bash
   npx playwright test --project=guest
   ```
7. Xem báo cáo:
   ```bash
   npx playwright show-report
   ```

---

## Kết quả đạt được
1. **Đăng ký tài khoản**
![Image](https://github.com/user-attachments/assets/c760a5fd-b2c3-46e0-96e1-7621c616cc64)
2. **Đăng nhập**
![Image](https://github.com/user-attachments/assets/768eb944-e50c-4358-b90c-3586c7677b14)
3. **Tìm kiếm việc làm**
![Image](https://github.com/user-attachments/assets/c2b394ac-cb88-45f0-ac3a-0dc70611dba5)
4. **Cập nhật hồ sơ cá nhân**
![Image](https://github.com/user-attachments/assets/42afbe2b-830a-4746-b634-b6a3d858c297)

---

## Hướng mở rộng
- **Tích hợp CI/CD:** Tích hợp với GitHub Actions hoặc Jenkins để tự động chạy test khi có thay đổi code.
- **Thêm test negative case:** Viết các test cho trường hợp nhập sai, thiếu dữ liệu để kiểm tra tính ổn định.
- **Áp dụng test.each:** Thêm kỹ thuật Data-driven testing để kiểm thử với nhiều bộ dữ liệu đầu vào.
- **Tự động hóa kiểm thử toàn hệ thống:** Mở rộng test cho các chức năng như tìm kiếm việc làm, nộp hồ sơ, xem chi tiết tin tuyển dụng,...
- **Chạy test song song nhiều trình duyệt:** Kiểm thử trên nhiều trình duyệt (Chrome, Firefox, WebKit) để đảm bảo khả năng tương thích.
- **Visual Regression Testing:** Thêm kiểm thử so sánh giao diện UI để phát hiện lỗi layout.
- **Mock API:** Áp dụng kỹ thuật mock API để kiểm thử nhanh hơn, độc lập backend.

---

> Được xây dựng bởi Hà Anh Duy – Project Kiểm thử tự động trang Web https://vieclam.ueh.edu.vn/ bằng Playwright @2025.

