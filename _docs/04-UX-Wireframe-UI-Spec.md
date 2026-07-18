# UX, WIREFRAME & UI SPECIFICATION

**Phiên bản:** Bilingual MVP V3.0  
**Locales:** Tiếng Việt (`vi`) và English (`en`)  
**URL pattern:** `/vi/...` và `/en/...`

## 1. Design principles

Clarity over spectacle; evidence over claims; motion supports meaning; mobile is first-class. Visual direction: contemporary editorial, confident typography, strong project imagery và khoảng trắng có chủ đích.

Thiết kế phải coi Tiếng Việt và English là hai trải nghiệm ngang hàng: cùng cấu trúc, cùng chất lượng thị giác, nhưng cho phép nội dung được bản địa hóa tự nhiên thay vì ép hai bản có độ dài giống nhau.

## 2. Design tokens sơ bộ

| Token | Quy tắc |
|---|---|
| Grid | 12 cột desktop, 8 tablet, 4 mobile |
| Container | 1280px max, gutter 24–64px |
| Spacing | Base 4px; scale 4/8/12/16/24/32/48/64/96 |
| Radius | 0/8/16; tránh dùng ngẫu nhiên |
| Type | Display, H1–H4, body, small; fluid clamp |
| Contrast | Tối thiểu WCAG AA |
| Motion | 150–300ms; hỗ trợ reduced motion |
| Locale | `vi`, `en`; language switcher luôn có text label |
| Text expansion | Component chịu được English dài hơn bản VI tối thiểu 30% |
| Line length | Body khoảng 55–75 ký tự/dòng ở desktop |

Màu và font chính thức chỉ chốt sau khi nhận brand guideline và kiểm tra license.

## 3. Global navigation

- Header VI: Logo, Giới thiệu, Dịch vụ, Dự án, Góc nhìn, Liên hệ, CTA.
- Header EN: Logo, About, Services, Projects, Insights, Contact, CTA.
- Language switcher: `VI | EN`, có accessible name và trạng thái ngôn ngữ hiện tại.
- Mobile: menu drawer có focus trap, Escape close và scroll lock.
- Footer: contact, social đã xác nhận, legal, copyright và language switcher tùy chọn.

### 3.1. Language switcher behavior

- Desktop: nằm cuối navigation, trước CTA hoặc trong utility area; không dùng icon lá cờ làm lựa chọn ngôn ngữ duy nhất.
- Mobile: nằm trong phần đầu menu drawer và vẫn truy cập được bằng bàn phím/screen reader.
- Khi trang có đủ hai bản, chuyển đúng localized slug của cùng document.
- Khi bản đích chưa publish, chuyển về homepage locale đích và hiển thị localized notice.
- Không mở tab mới, không mất query string hợp lệ và không tạo loading flash sai ngôn ngữ.
- Focus sau chuyển trang được quản lý hợp lý; screen reader nhận biết title/ngôn ngữ trang mới.

## 4. Global bilingual page frame

```text
┌─────────────────────────────────────────────────────┐
│ Logo  Primary navigation       VI | EN   Primary CTA│
├─────────────────────────────────────────────────────┤
│ Breadcrumb khi cần                                  │
│ Localized page content                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Footer navigation | Contact | Legal | Locale         │
└─────────────────────────────────────────────────────┘
```

- Mỗi route render toàn bộ chrome và content theo một locale; không trộn label VI vào trang EN.
- Loading, empty, error, cookie, 404, 500 và maintenance state đều có thiết kế cho hai ngôn ngữ.

## 5. Home wireframe

1. Hero: định vị + CTA chính/phụ + media.
2. Trust strip: khách hàng chỉ khi có quyền sử dụng.
3. Service overview: 3–6 nhóm dịch vụ.
4. Featured projects: 3 case mạnh nhất.
5. Approach: 3–4 bước làm việc.
6. Insights: tối đa 3 bài mới.
7. Final CTA: một thông điệp, một hành động.

### Bilingual constraints

- Hero thiết kế với headline VI và EN có độ dài khác nhau; không khóa chiều cao theo một bản mẫu ngắn.
- Logo/trust mark không thay đổi theo locale trừ khi brand yêu cầu.
- CTA không bị xuống dòng khó đọc ở breakpoint chính.
- Nếu Insights không đủ nội dung được duyệt cho cả hai locale, module được ẩn nhất quán theo quyết định scope.

## 6. About và Services wireframe

### About

1. Localized hero và company statement.
2. Brand story/năng lực.
3. Approach/principles.
4. Credentials hoặc team đã duyệt.
5. CTA đúng locale.

### Services

1. Localized introduction.
2. Service grid với tên/summary localized.
3. Deliverables và process.
4. Related projects cùng locale.
5. Consultation CTA.

Không dùng bản dịch cứng trong component; nội dung dài lấy từ Payload theo locale.

## 7. Projects listing wireframe

1. Intro localized.
2. Filter labels và taxonomy localized.
3. Result count.
4. Project grid.
5. Pagination/load-more theo quyết định kỹ thuật.
6. Empty state đúng locale.

Filter value trong URL dùng stable identifier; label hiển thị localized để không làm hỏng link khi đổi ngôn ngữ.

## 8. Project detail wireframe

1. Hero: tên dự án, dịch vụ, năm, hình đại diện.
2. Context/challenge.
3. Approach/idea.
4. Execution gallery/video có poster.
5. Outcomes: chỉ metrics public.
6. Testimonial đã duyệt.
7. Related projects và CTA.

- Language switcher giữ cùng project identity và đổi sang localized slug.
- Chỉ hiển thị metric được phép public; label/unit có thể localized nhưng raw value không tự thay đổi.
- Media alt/caption phải đúng locale; ảnh trang trí dùng alt rỗng.

## 9. Insights wireframe

### Listing

Localized heading, category filter, article cards, pagination và empty state. Chỉ hiển thị bài đã publish ở locale hiện tại.

### Detail

Breadcrumb, title, author/date, localized article body, share actions, related articles và CTA. Reading time/format ngày phải theo locale.

## 10. Contact wireframe

- Left: lời mời liên hệ, email/địa chỉ đã xác nhận.
- Right: name, company, email, phone tùy chọn, service, message, consent; label/helper/error đúng locale.
- Inline error gần field; summary lỗi cho screen reader.
- Success state không xóa thông tin trước khi server xác nhận.

### Field labels

| Field | Tiếng Việt | English |
|---|---|---|
| name | Họ và tên | Full name |
| company | Công ty | Company |
| email | Email | Email |
| phone | Số điện thoại | Phone number |
| service | Dịch vụ quan tâm | Service of interest |
| message | Nội dung yêu cầu | Tell us about your project |
| consent | Đồng ý chính sách quyền riêng tư | I agree to the Privacy Policy |

- Consent link mở đúng legal page cùng locale.
- Không dịch nội dung visitor nhập.
- Success/error copy và acknowledgement email dùng `submissionLocale`.

## 11. Missing translation và system states

| State | UX behavior |
|---|---|
| Locale không hợp lệ | Localized 404 theo default/safe locale policy |
| Trang không tồn tại | 404 cùng locale URL nếu locale hợp lệ |
| Bản dịch chưa publish | Không lộ draft; switcher về locale homepage + notice |
| Dictionary key thiếu | Không được deploy; CI failure |
| CMS content rỗng | Ẩn optional block hoặc dùng designed empty state |
| API/network lỗi | Giữ input form và hiển thị retry guidance đúng locale |

Không dùng nội dung từ locale khác làm fallback công khai cho body bắt buộc.

## 12. Component inventory

Header, LanguageSwitcher, MobileLocaleSelector, Footer, Button, Link, Breadcrumb, Hero, SectionHeading, ServiceCard, ProjectCard, ArticleCard, LogoStrip, RichText, Media, Gallery, Metric, Quote, CTA, FormField, Select, Checkbox, Alert, TranslationNotice, Pagination, EmptyState, Skeleton.

Mỗi component phải có default, hover, focus-visible, disabled, loading, error và empty state nếu phù hợp.

## 13. Responsive và text-expansion rules

- Không chỉ thu nhỏ desktop; đổi thứ tự nội dung theo mục tiêu.
- Touch target tối thiểu 44×44px.
- Ảnh có `sizes`, crop focal point và aspect ratio ổn định.
- Không autoplay video có âm thanh; cung cấp control và poster.
- Data card/list thay cho table rộng trên mobile.
- Không đặt fixed width cho navigation/button dựa trên label tiếng Việt.
- Cho phép CTA wrap tối đa hai dòng; icon và label không chồng nhau.
- Test chuỗi dài, từ dài tiếng Anh và heading nhiều dòng ở 320px, 768px, 1280px.
- Không dùng truncation cho heading, CTA, form label hoặc thông báo pháp lý quan trọng.
- Tab/filter có scroll hoặc wrap có kiểm soát; không ép font nhỏ để chứa text.

## 14. Accessibility và localization

- Một H1/trang; heading không nhảy cấp vô lý.
- Keyboard đầy đủ; focus rõ; skip link.
- Alt mô tả mục đích, alt rỗng cho ảnh trang trí.
- Form có label thật, `aria-describedby` và thông báo trạng thái.
- Không truyền đạt trạng thái chỉ bằng màu.
- `<html lang>` là `vi` hoặc `en` đúng với route.
- Language switcher có accessible name, current state và focus-visible.
- Không dùng cờ quốc gia để thay thế text ngôn ngữ.
- Screen-reader-only text và `aria-label` cũng phải localized.
- Format ngày, số và punctuation phù hợp locale; tránh đọc sai chữ viết tắt.

## 15. Figma structure và bilingual deliverables

- `00 Cover`, `01 Foundations`, `02 Components`, `03 Templates VI`, `04 Templates EN`, `05 Responsive`, `06 Prototype`, `07 Handoff`, `08 Archive`.
- Foundations, components và desktop/tablet/mobile templates cho cả hai locale.
- Auto Layout, variables/tokens, component variants.
- Prototype: chuyển `VI ↔ EN`, project discovery, missing-translation fallback và contact submission cho cả hai locale.
- Dev Mode/handoff có kích thước, behavior, assets và content mapping.
- Đây là đặc tả để tạo Figma; chưa được gọi là “UI hoàn tất” trước khi có file thiết kế được duyệt.

### Required Figma frames

- Home, About, Services, Projects, Project detail, Insights, Article, Contact.
- 404, 500, empty, loading, form error/success và translation-unavailable notice.
- Mỗi template có ít nhất mobile và desktop ở `vi`/`en`; tablet có thể dùng responsive annotations nếu không có layout khác biệt.
- Component variants phải test bằng nội dung thực tế hoặc content stress-test, không chỉ lorem ipsum.

## 16. Prototype flows

1. `/vi` → project VI → switch EN → đúng project EN.
2. Project EN chưa publish → switch EN → `/en` + notice.
3. `/en/contact` → validation error → success → English confirmation.
4. Mobile menu → chọn locale → menu đóng, focus/navigation đúng.

## 17. UX analytics requirements

- `language_switch`: vị trí switcher, from/to locale, success/fallback outcome.
- `missing_translation`: template/content ID/target locale, không chứa text hay PII.
- Contact funnel và CTA được phân đoạn theo locale.
- Analytics không làm chậm interaction hoặc phá consent preference.

## 18. Design acceptance criteria

- 100% route và system state P0 có thiết kế VI/EN.
- Language switcher giữ context, keyboard-accessible và không tạo 404.
- Layout vượt qua text-expansion test mà không overlap, clipping hoặc truncation quan trọng.
- Không có mixed-language label trên một page flow.
- Consent/legal link, errors, empty states và emails có mapping locale rõ.
- Design, Content và Technical Owner ký duyệt Figma/handoff trước khi gọi UI hoàn tất.
