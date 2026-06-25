# Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students

Nền tảng định hướng nghề nghiệp và tự động cá nhân hóa lộ trình học tập dành riêng cho sinh viên ngành Công nghệ Phần mềm. Hệ thống ứng dụng Trí tuệ nhân tạo (Gemini API) để phân tích khoảng cách năng lực (Gap Analysis) từ hồ sơ và kho mã nguồn GitHub của sinh viên, kết hợp module tự động quét xu hướng tuyển dụng thực tế (Market Pulse).

---

### 👤 Phúc: Lập Checklist Yêu cầu & Use-case Tổng thể
> **Nhiệm vụ:** Rà soát để lập danh sách tính năng và vẽ sơ đồ tương tác.

**Checklist sản phẩm cần nộp:**
- [ ] **Checklist chức năng (Functional Requirements):** Liệt kê chi tiết 5 nhóm chức năng trong ảnh (AI Virtual Mentor, Dynamic Roadmap, Skill Gap Analysis, Market Pulse, E-Portfolio Management).
- [ ] **Checklist phi chức năng (Non-Functional Requirements):** Thiết lập các tiêu chuẩn về bảo mật, tốc độ phản hồi của AI và xử lý dữ liệu cào.
- [ ] **Sơ đồ Use-case tổng thể:** Vẽ sơ đồ thể hiện mối quan hệ giữa các Actor (SE Student, Academic Counselor, Industry Mentor) với các tính năng cốt lõi.

---

### 👤 Chung: Đặc tả Use-case Chi tiết & Flow chuyển đổi
> **Nhiệm vụ:** Chi tiết hóa các use-case và thiết kế luồng chuyển đổi trạng thái giữa các luồng xử lý.

**Checklist sản phẩm cần nộp:**
- [ ] **Tài liệu Đặc tả Use-case:** Viết kịch bản (Flow of events) cho các use-case quan trọng nhất (như Tạo Roadmap, Chat với AI, Đồng bộ GitHub).
- [ ] **Sơ đồ trạng thái chuyển đổi các Flow:** Vẽ sơ đồ thể hiện cách các luồng công việc (Flow) chuyển đổi qua lại lẫn nhau khi người dùng tương tác trên hệ thống.

---

### 👤 Nhất: Khái niệm ERD (Conceptual ERD)
> **Nhiệm vụ:** Xác định các thực thể tham gia vào hệ thống ở mức khái niệm căn bản.

**Checklist sản phẩm cần nộp:**
- [ ] **Khái niệm thực thể:** Định nghĩa rõ ràng vai trò của các thực thể chính (Student Profile, Tech Path, Skill Node, Course Repo, Job Trend, Mentor Session).
- [ ] **Sơ đồ ERD mức Khái niệm:** Vẽ sơ đồ thực thể mối quan hệ ở mức thô, tập trung vào việc thể hiện thực thể và các mối quan hệ (1-n, n-n) giữa chúng mà chưa cần đi sâu vào kiểu dữ liệu chi tiết.

---

### 👤 Bảo: Logic ERD (Logical ERD & Business Logic)
> **Nhiệm vụ:** Tìm hiểu chi tiết và tối ưu hóa sơ đồ ERD dựa trên các quy tắc nghiệp vụ (Business logic).

**Checklist sản phẩm cần nộp:**
- [ ] **Business Logic ERD:** Giải quyết các mối quan hệ nhiều-nhiều (n-n) bằng cách thêm các bảng trung gian (Ví dụ: Bảng theo dõi tiến độ học của Student đối với từng Skill Node).
- [ ] **Sơ đồ ERD mức Logic:** Điền đầy đủ các thuộc tính (Attributes), xác định rõ ràng thuộc tính nào là Khóa chính (Primary Key) và Khóa ngoại (Foreign Key) cho toàn bộ các bảng.

---

### 👤 Nguyên: Vật lý Class DG (Physical Class Diagram) & Sơ đồ lớp
> **Nhiệm vụ:** Thiết kế sơ đồ lớp chi tiết ở mức vật lý (Class Diagram) để chuẩn bị cho việc cài đặt mã nguồn.

**Checklist sản phẩm cần nộp:**
- [ ] **Sơ đồ lớp (Class Diagram):** Thiết kế các lớp đối tượng bao gồm đầy đủ các thuộc tính (kèm kiểu dữ liệu: String, Int...) và các phương thức/hàm xử lý logic (Ví dụ: `generateRoadmap()`, `analyzeSkillGap()`).
- [ ] **Thể hiện mối quan hệ:** Biểu diễn chính xác các quan hệ Dependency, Association, Aggregation, Composition giữa các lớp.

---

### 👤 Diễm: Sơ đồ luồng dữ liệu 3 mức & Swimlane DFD
> **Nhiệm vụ:** Mô hình hóa luồng đi của dữ liệu trong hệ thống qua các phân hệ.

**Checklist sản phẩm cần nộp:**
- [ ] **DFD 3 mức:** Vẽ sơ đồ luồng dữ liệu bao gồm Mức ngữ cảnh (Context Diagram), Mức 0 (Tổng quát hệ thống) và Mức 1 (Chi tiết cho các phân hệ chức năng).
- [ ] **Swimlane DFD:** Tổ chức sơ đồ luồng dữ liệu theo dạng phân làn (Swimlane) để phân định rõ dữ liệu được xử lý bởi Actor nào, Tiến trình nào, hoặc Hệ thống AI nào.

---

### 👤 Dung: Thiết kế Cơ sở dữ liệu vật lý (Database Designer) & Sơ đồ hoạt động
> **Nhiệm vụ:** Chuyển đổi thiết kế dữ liệu thành mã chạy trên SQL Server và vẽ sơ đồ hoạt động cho hệ thống.

**Checklist sản phẩm cần nộp:**
- [ ] **Cài đặt SQL Server:** Chuyển đổi ERD thành cấu trúc bảng vật lý trên SQL Server với đầy đủ kiểu dữ liệu tương thích, ràng buộc toàn vẹn (Constraints).
- [ ] **Sơ đồ hoạt động (Activity Diagram):** Vẽ các sơ đồ hoạt động để mô tả tuần tự các bước xử lý của hệ thống cho các tính năng tự động (như tiến trình cào dữ liệu định kỳ của Market Pulse hoặc tiến trình phân tích của AI).


## 🛠️ Công Nghệ Sử Dụng (Tech Stack)
Hệ thống được tổ chức theo mô hình **Monorepo** phân tách rõ ràng giữa các phân hệ:
* **Backend:** `Python` v3.10+ kết hợp `FastAPI Framework` (Kiến trúc Clean Architecture).
* **Frontend:** `JavaScript/TypeScript`, `React JS`, và `Next.js Framework` (Component-Based).
* **Database:** `SQL Server` (Hệ quản trị cơ sở dữ liệu quan hệ, tối ưu hóa bằng Indexes).
* **AI Integration:** `Gemini API` (Mô hình `gemini-pro` xử lý đối sánh và sinh chuỗi JSON cấu trúc).
* **Tài liệu báo cáo:** Toàn bộ báo cáo lớn được biên dịch tự động bằng `LaTeX`.

---

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

