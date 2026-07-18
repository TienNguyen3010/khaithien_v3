# KHẢI THIÊN — TESTIMONIALS V3.0

**Trạng thái:** Empty verified catalog — chưa có testimonial được duyệt  
**Nguồn có thể dùng:** email khách hàng, biên bản nghiệm thu, phỏng vấn, survey hoặc văn bản xác nhận

## Cấu trúc

- `01-Raw-Sources`: nguồn gốc chưa biên tập.
- `02-Candidate-Quotes`: quote ứng viên chờ kiểm tra.
- `03-Approved-Testimonials`: chỉ chứa quote đã duyệt.
- `04-Translation-Review`: bản dịch và linguistic approval.
- `05-Speaker-Media`: portrait/logo có quyền sử dụng.
- `06-Approvals-Evidence`: bằng chứng cho phép công bố.
- `07-Website-Copy`: heading, CTA và empty-state policy.
- `08-Templates`: biểu mẫu thu thập testimonial.
- `testimonial-catalog.json`: nguồn dữ liệu cấu trúc.

## Nguyên tắc

- Comment hoặc reaction trên fanpage không mặc định là testimonial.
- Không tạo, ghép hoặc “làm hay hơn” một lời chứng thực chưa có nguồn.
- Direct quote phải giữ đúng ý nghĩa và có người nói/client duyệt.
- Bản dịch direct quote cần approval riêng hoặc phải ghi rõ là bản dịch.
- Không công bố tên, chức danh, portrait hoặc logo khi thiếu quyền.
- Không hiển thị module testimonial nếu catalog approved trống.
