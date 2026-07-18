# CONTACT FORM STATES

## Success

- VI: `Khải Thiên đã nhận được yêu cầu của bạn. Mã tham chiếu: {reference}.`
- EN: `Khai Thien has received your enquiry. Reference: {reference}.`

Chỉ hiển thị khi server trả `201`. Không xóa input trước khi xác nhận thành công.

## Validation summary

- VI: `Vui lòng kiểm tra các thông tin được đánh dấu.`
- EN: `Please review the highlighted information.`

## Generic error

- VI: `Chưa thể gửi yêu cầu. Thông tin của bạn vẫn được giữ lại; vui lòng thử lại.`
- EN: `We couldn't send your enquiry. Your information has been kept; please try again.`

## Rate limited

- VI: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng chờ và thử lại sau.`
- EN: `Too many requests have been sent. Please wait and try again.`

## Duplicate retry

Nếu cùng idempotency key và cùng body, trả kết quả trước đó thay vì tạo lead mới. Body khác trả `409 IDEMPOTENCY_CONFLICT`.

Alerts phải dùng live region phù hợp; focus chuyển đến error summary hoặc success heading.
