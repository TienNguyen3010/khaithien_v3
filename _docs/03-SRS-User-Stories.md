# SOFTWARE REQUIREMENTS SPECIFICATION & USER STORIES

**Phiên bản:** Bilingual MVP V3.0  
**Locales:** Tiếng Việt (`vi`) và English (`en`)  
**Default locale:** `vi`

## 1. Actors

- Visitor: chọn ngôn ngữ, xem nội dung và gửi liên hệ bằng `vi` hoặc `en`.
- Editor: tạo/sửa draft và bản dịch theo locale.
- Translator/Reviewer: dịch, kiểm tra glossary và đánh dấu translation readiness.
- Publisher: duyệt và publish độc lập theo locale.
- Administrator: người dùng, cấu hình và vận hành.
- System: gửi email, ghi consent, revalidate và log.

## 2. Functional requirements

| ID | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-001 | Hiển thị các trang marketing responsive | P0 |
| FR-002 | Lọc dự án theo dịch vụ/ngành nếu có dữ liệu | P1 |
| FR-003 | Hiển thị case study chỉ khi Published và Public | P0 |
| FR-004 | Quản trị page/service/project/article/media | P0 |
| FR-005 | Draft, preview, publish và rollback nội dung | P0 |
| FR-006 | Gửi form liên hệ và lưu lead an toàn | P0 |
| FR-007 | Ghi bằng chứng consent cùng submission | P0 |
| FR-008 | Gửi email cho nội bộ; lỗi email không làm mất lead | P0 |
| FR-009 | Quản trị metadata, OG image, canonical, redirect | P0 |
| FR-010 | Ghi audit cho hành động quản trị nhạy cảm | P1 |
| FR-011 | Cung cấp URL public có prefix `/vi` và `/en` | P0 |
| FR-012 | Cho phép chuyển ngôn ngữ nhưng giữ đúng document context | P0 |
| FR-013 | Quản trị nội dung localized và trạng thái phê duyệt riêng từng locale | P0 |
| FR-014 | Tạo canonical, `hreflang`, sitemap và structured data theo locale | P0 |
| FR-015 | Hiển thị UI, validation, system page và email đúng locale | P0 |
| FR-016 | Lưu `submissionLocale` cho contact request và analytics | P0 |
| FR-017 | Ngăn public fallback âm thầm sang locale khác khi thiếu nội dung bắt buộc | P0 |

## 3. User stories cốt lõi

### US-01 — Khám phá dịch vụ

Là khách truy cập, tôi muốn hiểu dịch vụ, năng lực và quy trình để biết Khải Thiên có phù hợp.

**Acceptance criteria**

- Nội dung có heading đúng cấp, CTA rõ và hoạt động trên mobile.
- Mỗi dịch vụ có mô tả, deliverables và dự án liên quan nếu có.
- Không render khối trống khi chưa có nội dung.
- Nội dung, navigation, CTA, metadata và accessibility label phải cùng locale với URL.

### US-02 — Xem case study

Là khách hàng tiềm năng, tôi muốn xem vấn đề, cách làm và kết quả của dự án.

- Chỉ document `published` và `isPublic=true` được hiển thị.
- Metrics chỉ hiển thị khi từng metric có `isPublic=true`.
- Media không đủ quyền sử dụng không được trả về public.
- Localized slug, title, body, CTA, alt text và SEO fields phải đúng locale hiện tại.

### US-03 — Gửi liên hệ

Là khách truy cập, tôi muốn gửi nhu cầu và nhận xác nhận rõ ràng.

- Bắt buộc: họ tên, email hợp lệ, message và privacy consent.
- Double-click/retry cùng idempotency key không tạo lead trùng.
- Thành công trả `201`; lỗi validation trả `422`; rate limit trả `429`.
- Lead phải được lưu trước khi gửi email.
- Form label, lỗi và success message hiển thị đúng locale.
- Request lưu `submissionLocale`; email acknowledgement dùng template cùng locale.

### US-04 — Biên tập nội dung

Là Editor, tôi muốn tạo draft và preview mà không làm thay đổi website public.

- Editor không được tự publish nếu không có quyền Publisher.
- Preview URL có thời hạn và yêu cầu xác thực.
- Publish kích hoạt revalidation đúng trang.
- Editor chọn rõ locale đang biên tập và không ghi đè nội dung locale còn lại.

### US-05 — Chọn ngôn ngữ

Là khách truy cập, tôi muốn chọn `VI` hoặc `EN` để sử dụng website bằng ngôn ngữ phù hợp.

**Acceptance criteria**

- Header desktop và menu mobile có language switcher dễ nhận biết và thao tác bằng bàn phím.
- Từ document detail, switcher mở đúng document ID với localized slug tương ứng.
- URL có `/vi` hoặc `/en` là nguồn quyết định locale; hệ thống không tự ý đổi URL đã chọn dựa trên IP.
- Lựa chọn có thể được ghi nhớ để áp dụng khi truy cập `/`, nhưng không ghi đè URL explicit.
- `<html lang>` cập nhật đúng sau navigation.

### US-06 — Xử lý khi bản dịch chưa sẵn sàng

Là khách truy cập, tôi cần phản hồi rõ ràng khi trang tương ứng chưa có bản dịch đã publish.

**Acceptance criteria**

- Không trộn body tiếng Việt vào trang `/en` hoặc ngược lại.
- Switcher không tạo broken URL.
- Nếu locale đích chưa publish, chuyển đến homepage locale đích và hiển thị thông báo localized, không lộ draft.
- Trang chưa publish không xuất hiện trong sitemap, navigation, search hoặc `hreflang`.

### US-07 — Quản lý bản dịch

Là Translator/Reviewer, tôi muốn xem phần nào còn thiếu để hoàn thiện bản dịch có kiểm soát.

**Acceptance criteria**

- CMS hiển thị locale hiện tại và trạng thái `missing`, `draft`, `in_review`, `approved`, `published`.
- Hệ thống kiểm tra title, slug, body, CTA, SEO, alt text và legal content bắt buộc theo locale.
- Reviewer có thể ghi chú và đánh dấu approved nhưng không tự publish nếu không có quyền Publisher.
- Không sử dụng machine translation chưa review làm nội dung public.

### US-08 — Publish độc lập theo locale

Là Publisher, tôi muốn xuất bản một locale khi nội dung đó đã sẵn sàng mà không làm thay đổi locale còn lại.

**Acceptance criteria**

- Publish/unpublish/revalidate chỉ tác động locale được chọn và listing liên quan.
- Không cho publish nếu thiếu field bắt buộc hoặc media chưa được duyệt.
- Audit log ghi actor, document, locale, action và timestamp.
- Preview được xác thực, gắn locale, `noindex` và `no-store`.

### US-09 — SEO song ngữ

Là công cụ tìm kiếm, tôi cần hiểu quan hệ giữa trang Tiếng Việt và English để index đúng phiên bản.

**Acceptance criteria**

- Mỗi trang có self-canonical đúng locale.
- `hreflang` chỉ tham chiếu alternate đã publish; có `x-default` theo policy.
- Sitemap chứa đúng public URL theo locale và không có draft/duplicate.
- Open Graph locale, structured data, title và description cùng ngôn ngữ với trang.

### US-10 — Truy cập route locale

Là khách truy cập, tôi cần routing song ngữ ổn định và có thể chia sẻ.

**Acceptance criteria**

- `/` chuyển hướng đến `/vi` hoặc locale preference hợp lệ theo policy.
- Chỉ `vi` và `en` được chấp nhận; locale khác trả 404.
- Refresh, deep link, browser back/forward và query string hoạt động đúng.
- Redirect không tạo loop hoặc chuyển locale ngoài ý muốn.

## 4. Business rules

- BR-01: Slug duy nhất theo collection và locale đang bật.
- BR-02: Một document public phải có title, slug, SEO title/description và featured image khi template yêu cầu.
- BR-03: Không xóa consent evidence qua UI thông thường.
- BR-04: Email failure được retry từ outbox; không rollback lead.
- BR-05: PII không xuất hiện trong analytics hoặc application logs.
- BR-06: Supported locale allowlist chỉ gồm `vi`, `en`; default là `vi`.
- BR-07: Public content query dùng locale explicit và không fallback cho field bắt buộc.
- BR-08: Slug unique theo collection và locale; hai localized slug cùng tham chiếu một document identity.
- BR-09: Một locale chỉ publish khi đạt completeness và approval của chính locale đó.
- BR-10: Legal/consent copy phải có version và approval độc lập cho `vi` và `en`.
- BR-11: User-generated message được lưu nguyên văn; không tự dịch và không đưa vào analytics.
- BR-12: Dictionary `vi` và `en` phải có cùng tập key bắt buộc.

## 5. Non-functional requirements

| ID | Mục tiêu |
|---|---|
| NFR-PERF | LCP p75 ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms |
| NFR-A11Y | WCAG 2.2 AA cho flow chính |
| NFR-SEO | Indexable HTML, sitemap, canonical, structured data phù hợp |
| NFR-SEC | OWASP controls, TLS, least privilege, rate limiting |
| NFR-REL | Form delivery ≥ 99%, backup và restore test |
| NFR-COMPAT | Hai phiên bản mới nhất của Chrome, Safari, Edge; mobile phổ biến |
| NFR-I18N | Không có mixed-language UI trên flow P0; locale isolation trong cache và revalidation |
| NFR-CONTENT | 100% route MVP có bản `vi` và `en` được duyệt trước launch |
| NFR-QUALITY | English được reviewer đủ năng lực duyệt; glossary thuật ngữ được áp dụng nhất quán |

## 6. Analytics events

`view_service`, `view_project`, `language_switch`, `missing_translation`, `click_primary_cta`, `contact_start`, `contact_submit_success`, `contact_submit_error`.

Mọi event có `locale` (`vi`/`en`) và route template. `language_switch` có `fromLocale`, `toLocale` và outcome; không gửi email, điện thoại, message, localized body hoặc PII trong event payload.

## 7. Ma trận kiểm thử song ngữ tối thiểu

| ID | Scenario | Expected |
|---|---|---|
| I18N-01 | Truy cập `/vi` và `/en` | Đúng language, navigation và metadata |
| I18N-02 | Truy cập locale không hỗ trợ | 404, không fallback runtime error |
| I18N-03 | Switch project có đủ hai bản | Giữ document, dùng localized slug |
| I18N-04 | Switch khi locale đích chưa publish | Homepage locale đích + thông báo; không lộ draft |
| I18N-05 | Publish chỉ bản English | Chỉ cache/tag English bị invalidated |
| I18N-06 | Submit form `/en/contact` | Validation, success và email template English |
| I18N-07 | Crawl sitemap/hreflang | Chỉ URL published; reciprocal alternates đúng |
| I18N-08 | Dictionary thiếu key | CI/test thất bại trước deploy |
| I18N-09 | Cache isolation | Không trả content khác locale |
| I18N-10 | Accessibility switcher | Keyboard, focus và accessible name đạt |

## 8. UAT exit criteria

- 100% P0 pass; không còn defect Severity 1/2.
- Content owner, design owner và product owner ký duyệt.
- Accessibility keyboard test và screen-reader smoke test đạt.
- Form được kiểm thử thành công, trùng lặp, spam và email failure.
- 100% route MVP có nội dung `vi` và `en` được phê duyệt; không còn placeholder hoặc mixed-language block.
- Language switcher, localized slug, fallback policy, email và analytics vượt qua ma trận I18N.
- Canonical, reciprocal `hreflang`, `x-default`, sitemap và `<html lang>` được xác nhận bằng crawl tự động và kiểm tra thủ công.
