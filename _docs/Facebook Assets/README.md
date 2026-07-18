# KHẢI THIÊN — CONTENT & ASSET INDEX V3.0

**Trạng thái tổng thể:** Development-ready working set; chưa production-ready  
**Nguyên tắc:** Asset/content chỉ được public khi đúng locale, có approval và quyền sử dụng hợp lệ.

## Danh mục

| Nhóm | Nội dung | Trạng thái |
|---|---|---|
| `01-Brand` | Logo, màu, typography, guideline, graphic elements, brand photos, social identity, legal rights | Working draft; thiếu logo vector, font files và ảnh gốc |
| `02-Company` | Company Profile, Mission–Vision–Values, Contact Locations | Contact confirmed; profile/MVV chờ Business Owner |
| `03-Services` | PR, Event, Production House, Activation | Chờ xác nhận scope và case evidence |
| `04-Projects` | 4 project candidates, template, media/rights/SEO | 0 case study approved |
| `05-Teams` | Team overview, leadership, capability groups, consent | 0 public member profile approved |
| `06-Clients` | Candidate register, logo approval, industry taxonomy | 0 client approved; logo strip tắt |
| `07-Testimonials` | Source/approval/translation workflow | 0 testimonial approved; module tắt |
| `08-Contact` | Page copy, form, consent, email, API, QA | Content ready; privacy version/provider pending |

## Source-of-truth order

1. Approved JSON/content record trong nhóm tương ứng.
2. ADR/SRS/API/Database documents ở thư mục kiến trúc.
3. Working draft.
4. Fanpage/banner chỉ là nguồn discovery, không phải approval.

## Publication gates

- Status phải là `approved` và chưa hết hạn.
- Localized fields bắt buộc đủ cho locale được publish.
- Media/Logo/Talent/Client rights approved.
- Không fallback công khai sang locale khác.
- Không công bố PII hoặc facts chưa được xác minh.

## Launch blockers hiện tại

- Thiếu tối thiểu 3 case study approved cho cả `vi/en`.
- Thiếu logo vector và xác nhận font/logo ownership.
- Brand Photos gốc chưa được lưu/duyệt rights.
- Client list/testimonials chưa có approval.
- Privacy Policy/version và email provider chưa được chốt.
- Payload independent locale publishing chưa có technical spike evidence.

## Owners cần chỉ định

- Business Owner.
- Brand/Design Owner.
- Content Owner.
- English Translator/Reviewer.
- Legal/Media Rights Owner.
- Technical Owner.
- QA/UAT Owner.
