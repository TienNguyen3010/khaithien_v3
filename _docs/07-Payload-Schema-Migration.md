# PAYLOAD SCHEMA, ACCESS CONTROL & MIGRATION PLAN

**Phiên bản:** Bilingual MVP V3.0  
**Payload locales:** `vi`, `en`; default `vi`

## 1. Scope

Tài liệu này là blueprint triển khai Payload V3.0 song ngữ; code config mới là nguồn thực thi. Schema phải khớp Database Design, API Contract và SRS bilingual.

## 2. Localization config

Ví dụ cấu hình định hướng — phải xác nhận tên option với phiên bản Payload đã khóa:

```ts
localization: {
  locales: [
    { label: 'Tiếng Việt', code: 'vi' },
    { label: 'English', code: 'en' },
  ],
  defaultLocale: 'vi',
  fallback: false,
}
```

Tên option chính xác phải được kiểm tra với Payload version đã khóa trước khi commit. Public data access luôn truyền locale explicit và `fallbackLocale:false` cho field bắt buộc, ngay cả khi Admin có trải nghiệm fallback riêng.

## 3. Roles

| Role | Read draft | Edit locale | Approve translation | Publish locale | Users/settings | Leads |
|---|---:|---:|---:|---:|---:|---:|
| editor | Có | Locale được phân công | Không | Không | Không | Không |
| translator | Có | Locale được phân công | Không | Không | Không | Không |
| reviewer | Có | Có | Có | Không | Không | Không |
| publisher | Có | Có | Theo policy | Có | Không | Không mặc định |
| admin | Có | Có | Có | Có | Có | Có theo permission |

Không suy ra quyền đọc PII từ quyền publish nội dung.

## 4. Access rules

- Public read chỉ trả document `status=published` và `isPublic=true`.
- Public không được create/update/delete `contact_requests`, `consent_events`, `outbox_events` qua Payload REST/GraphQL.
- Custom API chạy server-side nhưng vẫn dùng wrapper rõ transaction và validation.
- Media public chỉ khi `isPublic=true`, `rightsStatus=approved`, chưa hết hạn và scan sạch.
- Consent events append-only; admin chỉ đọc trừ tác vụ retention được kiểm soát.
- Public query bắt buộc có `locale` thuộc `vi|en`; locale chưa publish không được fallback sang locale còn lại.
- Preview token phải gắn document ID, locale, expiry và actor/session được phép.
- Translation workflow fields chỉ được reviewer/publisher/admin thay đổi theo state transition hợp lệ.

## 5. Localized field policy

| Collection/global | Localized fields |
|---|---|
| Pages | title, slug, layout blocks, SEO, CTA, social/accessibility text |
| Services | title, slug, summary, body, deliverables, CTA, SEO |
| Projects | title, slug, client display name, summary, blocks, metric label/unit, SEO |
| Articles | title, slug, excerpt, body, SEO |
| Categories | label/title, slug, description |
| Media | alt, caption, transcript/credit display khi cần |
| SiteSettings | navigation labels, footer copy, default SEO, contact CTA |

Không localized: IDs, role, relationship identity, sort order, rights status, scan status, metric raw value, audit timestamps và user-submitted PII/message.

## 6. Collection blueprint

- `Users`: email, name, roles; auth; no public read.
- `Media`: upload S3, localized alt/caption, rights, expiry, scan, public flag.
- `Pages`: localized title/slug/layout/SEO; translation state và publication readiness theo locale.
- `Services`: localized title/slug/summary/body/SEO; icon/media, order và internal code shared.
- `Projects`: localized editorial blocks/SEO/metric labels; shared classification/raw facts; public flag.
- `Articles`: localized title/slug/excerpt/body/SEO; categories relationship, author và workflow.
- `ContactRequests`: PII, source, `submissionLocale`, status, public reference; admin-only.
- `ConsentEvents`: append-only evidence có `consentLocale` và `policyVersion`.
- `Redirects`, `AuditEvents`, `OutboxEvents`; `SiteSettings` global.

### Translation workflow group

Mỗi localized content collection cần state theo locale:

- `viState`, `enState`: `missing|draft|in_review|approved|published|archived`, hoặc cấu trúc tương đương được Payload hỗ trợ an toàn.
- `approvedBy`, `approvedAt`, `publishedAt` theo locale.
- Hook chặn `published` nếu required localized fields chưa đủ.
- Không dựa duy nhất vào global `_status` nếu yêu cầu publish độc lập theo locale chưa được chứng minh bằng Payload version đang dùng; cần spike và integration test trước khi chốt physical model.

## 7. Hooks

- `beforeValidate`: normalize slug, email, phone; reject invalid publish state.
- `beforeChange`: enforce role/publish rules and rights expiry.
- `afterChange`: enqueue revalidation/outbox; không gọi provider trong DB transaction nếu gây mất nhất quán.
- `afterDelete`: invalidate cache và bảo vệ referenced media.
- Hook phải idempotent và có unit test.
- `beforeValidate`: validate locale allowlist, localized slug và dictionary/workflow fields.
- `beforeChange`: kiểm tra completeness, role và state transition của locale đang thao tác.
- `afterChange`: audit document ID + locale; revalidate tag chỉ cho locale bị ảnh hưởng.
- Public serializer: bỏ locale chưa publish, private metric và media không đủ rights/scan/alt readiness.

### Locale completeness requirements

Một locale không được publish nếu thiếu field template yêu cầu: title, slug, body/layout content, CTA, SEO title/description, legal copy và alt/caption bắt buộc. English không được tự động đánh dấu ready từ fallback Tiếng Việt.

## 8. Local API guardrail

Tạo một data-access module thay vì gọi `payload.find/create` rải rác. Mặc định `overrideAccess:false`; chỉ system jobs được phép nâng quyền và phải có audit reason.

Public content functions bắt buộc nhận typed `Locale = 'vi' | 'en'`, truyền `locale`, đặt `fallbackLocale:false` và serialize theo publication/rights policy. Không cho component tự gọi Payload với fallback mặc định.

## 9. Migration sequence song ngữ

1. Khóa Payload/adapter versions và tạo database backup/snapshot test.
2. Chốt localized field matrix, slug policy và publication state model.
3. Cấu hình `vi`, `en`, default `vi`, public fallback false.
4. Cập nhật collections/globals và locale-aware access/hooks.
5. Generate types/import map và generated migration.
6. Review physical SQL do adapter sinh; không tự tạo translation schema thứ hai.
7. Chạy migration trên database sạch; seed document mẫu đủ/thiếu hai locale.
8. Nếu migrate dữ liệu cũ, giữ content hiện có ở `vi`; khởi tạo English `missing`, không copy như bản dịch approved.
9. Backfill `submissionLocale/consentLocale/outbox locale` theo evidence được duyệt; bản ghi không suy luận được để nullable trong migration window và đánh dấu unresolved, không đưa `unknown` vào allowlist public `vi|en`.
10. Test REST, GraphQL, Local API, preview, publish, revalidation, sitemap và rollback/restore.

Trình tự cũ được thay thế bởi quy trình trên; S3/PostgreSQL local, staging snapshot và access tests vẫn là điều kiện bắt buộc.

## 10. Seed data song ngữ

- Một document có cả `vi/en` approved/published.
- Một document chỉ có `vi` published và `en` missing.
- Hai documents thử slug collision độc lập từng locale.
- Project có private/public metrics và media approved/expired.
- Contact samples cho `submissionLocale=vi` và `en`, dùng dữ liệu tổng hợp không chứa PII thật.

## 11. Commands dự kiến
2. Cấu hình PostgreSQL/S3 thật cho local test.
3. Generate types và import map.
4. Generate initial migration từ schema mới.
5. Chạy migration trên database sạch.
6. Seed admin và dữ liệu mẫu không chứa PII.
7. Test access qua REST, GraphQL và Local API.
8. Chạy migration trên staging snapshot và kiểm tra rollback.

```bash
npm run generate:types
npm run generate:importmap
npm run payload migrate:create -- --name initial_v3
npm run payload migrate
npm run typecheck
npm test
npm run build
```

Tên script và localization options phải được xác nhận theo `package.json` và Payload version đang khóa.

## 12. Test matrix song ngữ

| Test | Expected |
|---|---|
| Query same ID with `vi/en` | Đúng localized fields |
| Query missing English with fallback false | Not found/not publishable, không trả VI body |
| Localized slug collision | Bị chặn theo locale |
| Editor publish | Bị từ chối |
| Publisher publish incomplete locale | Bị từ chối |
| Publish English only | Chỉ English cache/listing revalidated |
| Public REST/GraphQL | Không lộ draft/private locale/metrics/media |
| Preview token wrong locale | Bị từ chối |
| Contact transaction | Locale đồng nhất ở contact/consent/outbox |
| Migration clean DB + snapshot | Thành công, không schema drift |

## 13. Exit criteria

- Có migration file được review và chạy thành công trên DB sạch.
- Generated types dùng ID nhất quán.
- Test chứng minh public create bị từ chối trên Payload routes.
- Test chứng minh private metrics/media không bị lộ.
- Docker app kết nối hostname `postgres`; S3 upload/delete/variant hoạt động.
- Generated Payload types thể hiện localized fields/locale contract nhất quán.
- Public queries không trộn `vi/en`; sitemap và alternates chỉ chứa locale đã publish.
- Editor thấy translation state/completeness; Publisher không thể publish locale thiếu content.
- Migration có review SQL, clean-database run, staging rehearsal và rollback/restore evidence.
