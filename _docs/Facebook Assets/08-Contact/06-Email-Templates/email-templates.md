# CONTACT EMAIL TEMPLATES

## Internal notification VI source

**Subject:** `[Khải Thiên] Yêu cầu mới {reference} — {serviceCode}`

- Reference.
- Received at.
- Submission locale.
- Name/company.
- Email/phone.
- Service code.
- Message nguyên văn.
- Source URL.

Không đưa secret, consent payload đầy đủ hoặc analytics identifier không cần thiết.

## Acknowledgement VI

**Subject:** `Khải Thiên đã nhận được yêu cầu {reference}`

Chào {name},

Khải Thiên đã nhận được thông tin bạn gửi. Mã tham chiếu của yêu cầu là **{reference}**. Đội ngũ sẽ xem xét và phản hồi qua thông tin liên hệ bạn đã cung cấp.

Trân trọng,  
Khải Thiên Communication & Entertainment

## Acknowledgement EN

**Subject:** `Khai Thien has received your enquiry {reference}`

Hello {name},

Khai Thien has received your enquiry. Your reference is **{reference}**. Our team will review the information and follow up using the contact details provided.

Kind regards,  
Khai Thien Communication & Entertainment

Template key và locale phải thuộc allowlist server-side. Email failure được retry từ outbox và không xóa lead.
