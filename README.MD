# Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students

Nền tảng định hướng nghề nghiệp và tự động cá nhân hóa lộ trình học tập dành riêng cho sinh viên ngành Công nghệ Phần mềm. Hệ thống ứng dụng Trí tuệ nhân tạo (Gemini API) để phân tích khoảng cách năng lực (Gap Analysis) từ hồ sơ và kho mã nguồn GitHub của sinh viên, kết hợp module tự động quét xu hướng tuyển dụng thực tế (Market Pulse).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)
Hệ thống được tổ chức theo mô hình **Monorepo** phân tách rõ ràng giữa các phân hệ:
* **Backend:** `Python` v3.10+ kết hợp `FastAPI Framework` (Kiến trúc Clean Architecture).
* **Frontend:** `JavaScript/TypeScript`, `React JS`, và `Next.js Framework` (Component-Based).
* **Database:** `SQL Server` (Hệ quản trị cơ sở dữ liệu quan hệ, tối ưu hóa bằng Indexes).
* **AI Integration:** `Gemini API` (Mô hình `gemini-pro` xử lý đối sánh và sinh chuỗi JSON cấu trúc).
* **Tài liệu báo cáo:** Toàn bộ báo cáo lớn được biên dịch tự động bằng `LaTeX`.

---

## 📁 Cấu Trúc Thư Mục Dự Án (Project Structure)
```text
personalized-learning-platform/
├── backend/                  # Phân hệ Backend FastAPI
│   ├── app/
│   │   ├── domain/           # Thực thể nghiệp vụ & SQLAlchemy Models
│   │   ├── repository/       # Lớp giao tiếp truy vấn cơ sở dữ liệu
│   │   ├── services/         # Logic xử lý chính & Tích hợp Gemini API
│   │   └── api/              # Cổng kết nối API Endpoints
│   └── config.env            # Biến môi trường bảo mật (.env)
├── frontend/                 # Phân hệ Frontend Next.js
│   └── src/
│       ├── components/       # Các thành phần UI tái sử dụng (Sidebar, Canvas)
│       ├── pages/            # Các trang giao diện chức năng hệ thống
│       └── services/         # Module đóng gói API Client xuống Backend
├── docs/                     # Tài liệu đặc tả hệ thống
│   ├── ERD.md                # Đặc tả chi tiết 15 bảng và bản số
│   └── checklist.md          # Kế hoạch tiến độ Sprint đồng bộ Jira
└── reports/                  # Mã nguồn tài liệu báo cáo lớn LaTeX
    ├── chapters/             # Nội dung 7 chương con của 7 thành viên
    └── main.tex              # Tệp điều phối trung tâm báo cáo

---

</details>

<br> <!-- Thêm khoảng trống giữa các phần -->

<!-- TAB 2: PHÂN CHIA CHI TIẾT -->
<details>
  <summary><h2>👥 Phân Chia Chi Tiết (Task Assignment)</h2></summary>


```text
  phan-chia-chi-tiet/
  ├── Thanh-vien-1/                              # Lập Checklist Yêu cầu & Use-case Tổng thể
  │   ├── nhiem-vu.txt                           # Rà soát để lập danh sách tính năng và vẽ sơ đồ tương tác.
  │   └── san-pham-can-nop/
  │       ├── [ ] Checklist chức năng            # Liệt kê chi tiết 5 nhóm chức năng (AI Virtual Mentor, Dynamic Roadmap...).
  │       ├── [ ] Checklist phi chức năng        # Thiết lập các tiêu chuẩn về bảo mật, tốc độ phản hồi của AI...
  │       └── [ ] Sơ đồ Use-case tổng thể        # Thể hiện mối quan hệ giữa các Actor với các tính năng cốt lõi.
  │
  ├── Thanh-vien-2/                              # Đặc tả Use-case Chi tiết & Flow chuyển đổi
  │   ├── nhiem-vu.txt                           # Chi tiết hóa các use-case và thiết kế luồng chuyển đổi trạng thái.
  │   └── san-pham-can-nop/
  │       ├── [ ] Tài liệu Đặc tả Use-case       # Viết kịch bản (Flow of events) cho các use-case quan trọng nhất.
  │       └── [ ] Sơ đồ trạng thái chuyển đổi    # Thể hiện cách các luồng công việc (Flow) chuyển đổi qua lại lẫn nhau.
  │
  ├── Thanh-vien-3/                              # Khái niệm ERD (Conceptual ERD)
  │   ├── nhiem-vu.txt                           # Xác định các thực thể tham gia vào hệ thống ở mức khái niệm căn bản.
  │   └── san-pham-can-nop/
  │       ├── [ ] Khái niệm thực thể             # Định nghĩa rõ ràng vai trò của các thực thể chính (Student Profile...).
  │       └── [ ] Sơ đồ ERD mức Khái niệm        # Thể hiện thực thể và các mối quan hệ (1-n, n-n) ở mức thô.
  │
  ├── Thanh-vien-4/                              # Logic ERD (Logical ERD & Business Logic)
  │   ├── nhiem-vu.txt                           # Tìm hiểu chi tiết và tối ưu hóa sơ đồ ERD dựa trên quy tắc nghiệp vụ.
  │   └── san-pham-can-nop/
  │       ├── [ ] Business Logic ERD             # Giải quyết các mối quan hệ nhiều-nhiều (n-n) bằng cách thêm bảng trung gian.
  │       └── [ ] Sơ đồ ERD mức Logic            # Điền đầy đủ thuộc tính, xác định rõ Khóa chính (PK) và Khóa ngoại (FK).
  │
  ├── Thanh-vien-5/                              # Vật lý Class DG (Physical Class Diagram) & Sơ đồ lớp
  │   ├── nhiem-vu.txt                           # Thiết kế sơ đồ lớp chi tiết ở mức vật lý để chuẩn bị cài đặt mã nguồn.
  │   └── san-pham-can-nop/
  │       ├── [ ] Sơ đồ lớp (Class Diagram)      # Thiết kế đối tượng gồm thuộc tính (kèm kiểu dữ liệu) và phương thức.
  │       └── [ ] Thể hiện mối quan hệ           # Biểu diễn chính xác các quan hệ Dependency, Association, Aggregation...
  │
  ├── Thanh-vien-6/                              # Sơ đồ luồng dữ liệu 3 mức & Swimlane DFD
  │   ├── nhiem-vu.txt                           # Mô hình hóa luồng đi của dữ liệu trong hệ thống qua các phân hệ.
  │   └── san-pham-can-nop/
  │       ├── [ ] DFD 3 mức                      # Vẽ sơ đồ Mức ngữ cảnh, Mức 0 (Tổng quát) và Mức 1 (Chi tiết).
  │       └── [ ] Swimlane DFD                   # Tổ chức sơ đồ phân định rõ dữ liệu được xử lý bởi Actor/Tiến trình nào.
  │
  └── Thanh-vien-7/                              # Thiết kế CSDL vật lý (SQL Server) & Sơ đồ hoạt động
      ├── nhiem-vu.txt                           # Chuyển đổi thiết kế dữ liệu thành mã SQL Server và vẽ sơ đồ hoạt động.
      └── san-pham-can-nop/
          ├── [ ] Cài đặt SQL Server             # Chuyển ERD thành bảng vật lý, đầy đủ kiểu dữ liệu tương thích, constraints.
          └── [ ] Sơ đồ hoạt động                # Mô tả tuần tự các bước xử lý cho các tính năng tự động (như Market Pulse).



