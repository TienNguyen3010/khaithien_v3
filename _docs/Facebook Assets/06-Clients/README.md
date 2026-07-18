# KHẢI THIÊN — CLIENTS V3.0

**Trạng thái:** Discovery register — chưa có client được duyệt công bố  
**Nguồn:** Facebook Cover, Brand Photos và Project Candidates

## Cấu trúc

- `01-Client-Candidates`: tên/mark quan sát được, chưa xác nhận quan hệ khách hàng.
- `02-Approved-Clients`: chỉ chứa client đã có Business Owner và client approval.
- `03-Logo-Assets`: file logo gốc được khách hàng cung cấp/cho phép dùng.
- `04-Logo-Approvals`: phạm vi, thời hạn và evidence.
- `05-Testimonials`: quote đã duyệt.
- `06-Industry-Taxonomy`: ngành ổn định dùng cho filter/case study.
- `07-Project-Mapping`: quan hệ client–project có nguồn.
- `08-Bilingual-Copy`: cách viết tên, chức danh và quote VI/EN.
- `client-catalog.json`: nguồn dữ liệu cấu trúc.

## Nguyên tắc

- Logo xuất hiện trong ảnh không chứng minh tổ chức đó là khách hàng của Khải Thiên.
- Không tạo “logo wall” khi chưa có xác nhận bằng văn bản cho từng logo.
- Không suy ra quan hệ từ backdrop, đồng phục, địa điểm hoặc vật phẩm trong ảnh.
- Client có thể cho phép case study nhưng không cho phép logo wall; lưu scope riêng.
- Testimonial cần quote, người nói, chức danh, tổ chức và approval.
- Tên pháp lý, tên thương hiệu và cách viết English phải được client xác nhận.
