# Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students

Nền tảng định hướng nghề nghiệp và tự động cá nhân hóa lộ trình học tập dành riêng cho sinh viên ngành Công nghệ Phần mềm. Hệ thống ứng dụng Trí tuệ nhân tạo (Gemini API) để phân tích khoảng cách năng lực (Gap Analysis) từ hồ sơ và kho mã nguồn GitHub của sinh viên, kết hợp module tự động quét xu hướng tuyển dụng thực tế (Market Pulse).

<details open>
  <summary><h2>📂 Cấu Trúc Thư Mục Dự Án (Project Structure)</h2></summary>

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

