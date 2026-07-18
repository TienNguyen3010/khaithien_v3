# PRODUCT STRATEGY & MVP

## 1. Mục tiêu kinh doanh

Website phải thực hiện ba việc: thể hiện năng lực thương hiệu, chứng minh bằng case study và tạo yêu cầu tư vấn có chất lượng. Đây không phải hệ thống CRM hoàn chỉnh.

Website được triển khai song ngữ **Tiếng Việt (`vi`) và English (`en`)** ngay trong MVP để phục vụ khách hàng trong nước, khách hàng quốc tế và các dự án đa quốc gia.

## 2. Khách hàng mục tiêu

- Brand/Marketing Manager cần agency triển khai activation, event hoặc communication.
- Procurement/Business Owner cần kiểm chứng năng lực và quy trình.
- Đối tác/talent cần thông tin chính thức và kênh liên hệ.

## 3. Giá trị cốt lõi

**Big thinking, reliable execution, measurable outcomes.** Mọi tuyên bố phải đi kèm bằng chứng: phạm vi, hình ảnh được duyệt, kết quả hoặc lời chứng thực.

## 4. Phạm vi MVP

### Bao gồm

- Trang chủ, giới thiệu, dịch vụ, danh sách/chi tiết dự án.
- Insights danh sách/chi tiết.
- Liên hệ và form yêu cầu tư vấn đơn giản.
- CMS quản trị nội dung, SEO, redirect và media.
- Consent, email thông báo, analytics và monitoring.
- Hai ngôn ngữ Tiếng Việt và English trên cùng một hệ thống CMS.
- Language switcher hiển thị rõ trên desktop và mobile.
- URL, metadata, sitemap và nội dung SEO riêng cho từng ngôn ngữ.

### Không bao gồm

- CRM pipeline và lead activities phức tạp.
- Project brief nhiều bước hoặc upload file.
- Client portal, thanh toán, đăng nhập khách hàng.
- Tự động hóa marketing và scheduled publishing không có worker.

## 5. Chiến lược song ngữ

### Ngôn ngữ và URL

- Tiếng Việt là ngôn ngữ mặc định và dùng prefix `/vi`.
- English dùng prefix `/en`.
- Route gốc `/` chuyển hướng đến `/vi`; có thể ghi nhớ lựa chọn của người dùng nhưng không tự động ép đổi ngôn ngữ chỉ dựa trên vị trí địa lý.
- Mỗi phiên bản ngôn ngữ có URL ổn định, có thể chia sẻ và index độc lập.

### Language switcher

- Hiển thị `VI | EN` trên header desktop và trong menu mobile.
- Khi đổi ngôn ngữ, ưu tiên mở đúng trang tương đương.
- Nếu bản dịch của trang hiện tại chưa được xuất bản, chuyển về trang chủ của ngôn ngữ đã chọn và hiển thị thông báo phù hợp; không âm thầm hiển thị nội dung sai ngôn ngữ.
- Ghi nhớ lựa chọn bằng cookie chức năng hoặc local storage theo chính sách privacy đã duyệt.

### Nội dung và xuất bản

- Tiếng Việt và English dùng chung content model nhưng có trường nội dung localized.
- Không dùng bản dịch máy chưa được biên tập để xuất bản.
- Mỗi locale có trạng thái hoàn thiện và phê duyệt độc lập.
- Một trang chỉ được xuất bản ở locale tương ứng khi title, body, CTA, SEO title, meta description, alt text và nội dung pháp lý bắt buộc đã được duyệt.
- Tên thương hiệu, tên khách hàng và thuật ngữ chuyên ngành phải tuân theo glossary song ngữ.

### SEO quốc tế

- Mỗi trang khai báo canonical trỏ về chính URL cùng locale.
- Khai báo `hreflang="vi"`, `hreflang="en"` và `x-default` khi có các phiên bản tương ứng.
- Sitemap liệt kê URL theo locale và chỉ chứa trang đã xuất bản.
- Slug có thể được bản địa hóa; CMS phải lưu quan hệ giữa hai phiên bản để language switcher tìm đúng trang.
- Không tạo redirect vòng lặp giữa `/vi` và `/en`.

## 6. Sitemap song ngữ

| Route pattern | Mục tiêu | CTA VI / EN |
|---|---|---|
| `/` | Chọn/chuyển đến locale mặc định | — |
| `/{locale}` | Định vị và điều hướng | Xem dự án / View projects |
| `/{locale}/about` | Xây dựng tin cậy | Trao đổi cùng đội ngũ / Talk to our team |
| `/{locale}/services` | Giải thích năng lực | Nhận tư vấn / Request consultation |
| `/{locale}/projects` | Chứng minh năng lực | Xem case study / View case studies |
| `/{locale}/projects/[slug]` | Bối cảnh–giải pháp–kết quả | Bắt đầu dự án / Start a project |
| `/{locale}/insights` | Thought leadership | Đọc bài viết / Read insights |
| `/{locale}/insights/[slug]` | SEO và chuyên môn | Liên hệ / Contact us |
| `/{locale}/contact` | Chuyển đổi | Gửi yêu cầu / Send enquiry |
| `/{locale}/privacy`, `/{locale}/terms` | Tuân thủ | — |

Trong đó `{locale}` chỉ nhận `vi` hoặc `en`.

## 7. KPI 90 ngày sau launch

| KPI | Định nghĩa | Mục tiêu ban đầu |
|---|---|---:|
| Qualified enquiries | Form hợp lệ, đúng nhu cầu | Thiết lập baseline 30 ngày rồi tăng 20% |
| Contact conversion | Submit thành công / phiên contact | ≥ 3% |
| Case-study engagement | Phiên xem ít nhất 2 case | ≥ 15% |
| Organic landing sessions | Phiên vào từ tìm kiếm | Tăng theo tháng |
| Form delivery success | Form ghi DB và email thành công | ≥ 99% |
| Locale coverage | Trang MVP được duyệt đủ cả `vi` và `en` | 100% trước launch |
| Missing translation rate | Lượt truy cập gặp nội dung thiếu bản dịch | 0% trên route MVP |

Các KPI chuyển đổi và organic traffic phải phân tích theo locale. Không dùng pageview như KPI kinh doanh duy nhất.

## 8. Nguyên tắc nội dung

- Viết cụ thể, ngắn, có bằng chứng; tránh “hàng đầu”, “đẳng cấp” nếu không chứng minh.
- Case study theo cấu trúc Challenge → Approach → Execution → Outcome.
- Không công bố logo, hình ảnh, testimonial hoặc metrics chưa được duyệt.
- Mỗi trang có một CTA chính và tối đa một CTA phụ.
- Duy trì glossary `Vietnamese term → Approved English term`; ưu tiên bản địa hóa thông điệp thay vì dịch từng chữ.
- Tone tiếng Anh phải tự nhiên với khách hàng quốc tế, không sao chép cấu trúc câu tiếng Việt.

## 9. Rủi ro và kiểm soát

| Rủi ro | Kiểm soát |
|---|---|
| Phạm vi tăng liên tục | Change request và backlog Phase 2 |
| Thiếu case study hợp lệ | Launch với tối thiểu 3 case đã duyệt |
| Hình ảnh nặng | Quy chuẩn crop, WebP/AVIF và CDN |
| Nội dung chung chung | Content owner duyệt bằng checklist |
| Form spam | Honeypot, rate limit, Turnstile khi cần |
| Bản dịch không tự nhiên | Biên tập viên English review, glossary và translation QA |
| Hai locale lệch nội dung | Trạng thái completeness/approval riêng và dashboard nội dung thiếu |
| SEO trùng lặp | Canonical theo locale, hreflang và sitemap song ngữ |
| Language switcher dẫn đến 404 | Quan hệ trang tương đương và fallback có kiểm soát |
