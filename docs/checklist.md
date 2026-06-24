# QUY CHUẨN LÀM VIỆC NHÓM TRÊN GIT & JIRA (DÀNH CHO 7 THÀNH VIÊN)

## 1. Quy tắc phân chia Nhánh (Branching Strategy)
- Tuyệt đối KHÔNG ĐƯỢC push code trực tiếp lên nhánh `main` và `dev`.
- Mỗi khi bắt đầu làm một nhiệm vụ được giao trên Jira, thành viên phải tạo một nhánh riêng xuất phát từ `dev`.

Cú pháp lệnh bắt buộc cho mỗi thành viên khi bắt đầu làm việc:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/ten-nhiem-vu-cua-ban