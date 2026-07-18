# CONTENT & MEDIA READINESS PLAN

## 1. Trạng thái launch

Chỉ nội dung/media có trạng thái `Approved` mới được nhập production. “Có file” không đồng nghĩa “được phép công bố”.

## 2. Vai trò

| Vai trò | Trách nhiệm |
|---|---|
| Content owner | Đúng thông tin, tone và CTA |
| Brand owner | Logo, màu, font và hình ảnh thương hiệu |
| Account/project owner | Dữ liệu case study và client approval |
| Legal/privacy | Privacy, terms, consent wording, retention |
| Editor | Nhập CMS và QA hiển thị |
| Publisher | Duyệt cuối và publish |

## 3. Minimum launch pack

- Brand: logo vector, favicon, color/font license, company description.
- Home/about: headline, proof points, approach, contact chính thức.
- Services: tối thiểu 3 service đầy đủ.
- Projects: tối thiểu 3 case study được duyệt.
- Insights: 3 bài chất lượng hoặc ẩn module insights khi chưa đủ.
- Legal: privacy notice, cookie/analytics disclosure, terms nếu cần.
- SEO: title, description, OG image và canonical cho mọi trang indexable.

## 4. Content status workflow

`Missing → Draft → Internal Review → Client/Legal Review → Approved → Published → Expired/Archived`.

Mỗi item có owner, deadline, source, approver, approval date và notes.

## 5. Case study template

- Project title, client display name/anonymous decision, year, service, market.
- 40–60 từ summary.
- Challenge, objective, insight/idea, execution, deliverables.
- Outcomes có nguồn; public flag cho từng metric.
- Gallery/video, credits, testimonial và related services.
- Approval evidence cho logo, ảnh, lời trích và kết quả.

## 6. Media specification

| Loại | Master | Delivery |
|---|---|---|
| Photo | JPG/TIFF chất lượng cao | AVIF/WebP/JPG responsive |
| Logo | SVG sạch | SVG/PNG fallback |
| Video | MP4 master + caption | MP4/HLS theo nhu cầu |
| OG image | 1200×630 | JPG/WebP |

- Không upload tên file tùy tiện; dùng `project-purpose-sequence-version.ext`.
- Alt mô tả mục đích, không nhồi keyword.
- Lưu owner, license, territories, expiry và usage restrictions.
- Private asset dùng signed URL; không đặt URL bucket public cố định.

## 7. Quality checklist

- Fact, chính tả, tên thương hiệu và số liệu đã kiểm tra.
- Không có placeholder/lorem ipsum.
- Link và CTA đúng.
- Crop desktop/mobile được duyệt.
- Video có poster, caption khi cần và không autoplay âm thanh.
- Rights chưa hết hạn tại ngày launch.
- Bản tiếng Anh không dùng machine translation chưa review.

## 8. Content freeze

Freeze trước UAT cuối tối thiểu 3 ngày làm việc. Thay đổi sau freeze phải có ticket, owner, impact, approver và regression scope.

