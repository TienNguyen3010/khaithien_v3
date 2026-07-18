# DASHBOARD QUẢN TRỊ WEBSITE SONG NGỮ

**Phiên bản:** Bilingual MVP V3.0  
**Nền tảng:** Payload CMS Admin + custom dashboard views  
**Locales:** Tiếng Việt (`vi`) và English (`en`)

## 1. Mục tiêu

Dashboard giúp Editor, Translator, Reviewer, Publisher và Administrator biết chính xác nội dung nào thiếu, đang chờ duyệt, được phép publish hoặc có rủi ro về SEO/media/quyền riêng tư ở từng locale.

Dashboard không thay thế access control. Mọi action vẫn phải được kiểm tra ở server/Payload access và hook.

## 2. Personas và quyền

| Role | Dashboard chính | Action |
|---|---|---|
| Editor | Draft/content tasks | Tạo/sửa nội dung locale được phân công |
| Translator | Translation queue | Dịch `vi→en` hoặc chiều được giao |
| Reviewer | Review queue | Comment, request changes, approve translation |
| Publisher | Publication readiness | Publish/unpublish từng locale |
| Content Owner | Coverage/KPI | Theo dõi tiến độ và bottleneck |
| Admin | System/roles/audit | Quản trị user, settings, incident/replay có kiểm soát |

Publisher không mặc nhiên có quyền đọc/export lead PII. Quyền PII là permission riêng.

## 3. Information architecture

```text
Dashboard
├── Overview
├── Content
│   ├── Pages
│   ├── Services
│   ├── Projects
│   ├── Insights
│   └── Taxonomies
├── Translation Queue
├── Publication Queue
├── Media & Rights
├── SEO & Redirects
├── Leads (restricted)
├── Operations
│   ├── Outbox
│   ├── Revalidation
│   └── Health
└── Settings, Users & Audit
```

## 4. Overview dashboard

### KPI cards

| Card | Definition | Alert |
|---|---|---|
| VI readiness | Approved/published required items `vi` | <100% trước release |
| EN readiness | Approved/published required items `en` | <100% trước release |
| Missing translations | Required locale items state `missing` | >0 P0 |
| Awaiting review | Items `in_review` quá SLA | Theo content SLA |
| Broken alternates | Published item thiếu mapping/alternate | >0 |
| Expiring media rights | Rights hết hạn trong 30/60/90 ngày | Có item public |
| Failed outbox | Dead-letter/retry vượt threshold | >0 theo runbook |
| Lead delivery | Persisted/form submissions | Dưới SLO |

### Work queues

- My drafts.
- Assigned translations.
- Awaiting my review.
- Ready to publish.
- Blocked by missing media/legal/SEO.
- Recently failed publication/revalidation.

## 5. Bilingual content table

| Column | Mô tả |
|---|---|
| Content | Title theo locale UI hiện tại + document ID |
| Type | Page/service/project/article/category |
| VI state | Missing/Draft/In review/Approved/Published/Archived |
| EN state | Trạng thái tương ứng |
| Completeness | % required fields theo locale |
| Owner | Người chịu trách nhiệm |
| Updated | Last update + actor |
| Blockers | SEO, legal, media, rights, missing field |

Filters: collection, VI state, EN state, owner, reviewer, due date, blocker, published status. Stable URL/query giúp chia sẻ view mà không chứa PII.

## 6. Translation workspace

- Locale selector hiển thị rõ `VI source` và `EN target`; không cho nhập nhầm locale.
- Side-by-side view cho text field; preview layout riêng theo locale.
- Glossary panel, brand voice notes và translation comments.
- Field-level completeness: title, slug, summary/body, CTA, SEO, alt/caption, legal dependency.
- Actions: Save draft, Submit review, Request changes, Approve.
- Machine translation nếu được dùng chỉ tạo Draft và phải gắn provenance; không có action auto-publish.
- Source field đổi sau approval phải đánh dấu target translation `needs_review`.

## 7. Publication readiness

Checklist trước publish theo locale:

- Required localized fields đủ.
- Translation state Approved.
- Slug unique và route preview hợp lệ.
- SEO title/description/canonical/alternate mapping đủ.
- Media public, scan clean, rights approved/chưa hết hạn và alt/caption đúng locale.
- Legal/consent version hợp lệ nếu phụ thuộc.
- Related content không dẫn đến draft/private locale.

Publisher chọn rõ locale sẽ publish; confirmation hiển thị affected URLs/cache tags. Publish `en` không tự publish `vi` và ngược lại.

## 8. Media & Rights dashboard

Hiển thị thumbnail, asset owner, usage, rights state/expiry, scan state, public flag, VI alt/caption completeness, EN alt/caption completeness và documents đang tham chiếu.

Views ưu tiên: expiring soon, missing rights, missing EN metadata, blocked scan, unused large assets. Hành động xóa/replace asset đang được tham chiếu phải cảnh báo impact cả hai locale.

## 9. SEO & Redirect dashboard

- Indexable URLs theo locale.
- Missing/duplicate title-description.
- Missing reciprocal `hreflang` hoặc broken localized slug mapping.
- Canonical mismatch, sitemap exclusion và orphan page.
- Redirect source/destination locale, loop/collision detector.
- Preview Google/social snippet theo `vi/en` chỉ để QA, không bảo đảm thứ hạng.

## 10. Leads dashboard — restricted

Chỉ role có permission `lead:read` được truy cập. Bảng gồm reference, received time, submission locale, service code, status và assignee theo scope đã duyệt.

- PII được che mặc định; reveal/export cần permission, purpose và audit.
- Filter/analytics theo locale không gửi message/email/phone ra analytics.
- Lead message giữ nguyên ngôn ngữ user nhập; dashboard không tự dịch như sự thật.

## 11. Operations dashboard

### Outbox

Pending/retry/dead-letter theo template + locale; attempt count, next retry và error category. Replay yêu cầu quyền, reason và audit; không hiển thị secret/provider payload.

### Revalidation

Document ID, locale, operation, tags, status và timestamp. Cho phép xác minh publish một locale không invalidation sai locale còn lại.

### Health

App/DB/S3/email/worker status ở mức an toàn; chi tiết nhạy cảm chỉ cho Admin/Ops. Không đưa credentials, signed URL hoặc PII vào dashboard/log.

## 12. Dashboard UI song ngữ

- Admin interface có thể chọn ngôn ngữ giao diện nếu Payload/custom component hỗ trợ; tối thiểu content locale labels và workflow messages phải rõ `VI/EN`.
- Không dùng cờ quốc gia thay thế tên ngôn ngữ.
- Bảng chịu được English text expansion; responsive dùng cards/drawer cho màn hình hẹp.
- Keyboard, focus, error summary, status announcement và contrast đạt WCAG 2.2 AA cho workflow chính.
- Date/number format theo UI locale nhưng lưu UTC/canonical values.

## 13. Audit events

Bắt buộc audit: login/security event phù hợp, role changes, translation approval, publish/unpublish theo locale, slug/redirect changes, media-right changes, PII reveal/export, outbox replay và privileged Local API/job action.

Audit lưu actor, action, target ID, locale, before/after summary an toàn, reason, request ID và timestamp; không sao chép PII/body content không cần thiết.

## 14. Dashboard acceptance criteria

- User thấy đúng queues và actions theo role; server từ chối action vượt quyền.
- Readiness/completeness tính độc lập và chính xác cho `vi/en`.
- Không thể publish locale thiếu required field, approval, media rights hoặc SEO dependency.
- Source update làm target translation cần review lại.
- Publish/revalidate/audit ghi đúng document + locale.
- Leads/PII bị che và giới hạn quyền; export/reveal có audit.
- Dashboard vượt qua unit, integration, permission, accessibility và responsive tests.

## 15. Out of scope MVP

- Full CRM pipeline/automation.
- AI translation auto-publish.
- Advanced BI warehouse/dashboard.
- Multi-client portal.
- Locale thứ ba trước ADR và content capacity review.
