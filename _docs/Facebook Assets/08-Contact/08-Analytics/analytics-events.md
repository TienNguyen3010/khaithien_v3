# CONTACT ANALYTICS

## Events

- `contact_start`: lần đầu tương tác với form.
- `contact_submit_success`: server trả `201`.
- `contact_submit_error`: stable error category.
- `click_contact_phone`.
- `click_contact_email`.
- `click_contact_map`.

## Allowed properties

- `locale`.
- `routeTemplate`.
- `serviceCode` nếu user đã chọn.
- `errorCode` ổn định.
- `formVersion`.

## Forbidden

- Họ tên, email, điện thoại, company hoặc message.
- Full source URL nếu có query chứa PII.
- Nội dung localized dài.
- Public reference nếu không có nhu cầu đo lường được duyệt.

Conversion phân tích riêng cho `vi` và `en`.
