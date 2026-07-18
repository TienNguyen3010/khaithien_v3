# KHẢI THIÊN — LEGAL & RIGHTS REGISTER

**Trạng thái:** Working register — chưa phải xác nhận pháp lý  
**Phạm vi:** Tài sản thương hiệu thu thập từ fanpage và nguồn nội bộ cho Website V3

## Nguyên tắc

- Nội dung công khai trên fanpage không mặc nhiên đồng nghĩa được phép tái sử dụng trên website.
- Mọi ảnh có nhân sự, talent, khách hàng hoặc logo bên thứ ba phải có bằng chứng quyền sử dụng phù hợp.
- Tài sản chưa có bằng chứng được đặt trạng thái `pending`, không được đưa lên production.
- File gốc, nguồn, owner, photographer, thời hạn và phạm vi sử dụng phải được lưu cùng asset ID.
- Không lưu giấy tờ chứa PII nhạy cảm trong thư mục public của website.
- Business/Legal Owner chịu trách nhiệm phê duyệt cuối cùng.

## Trạng thái

| Status | Ý nghĩa | Website production |
|---|---|---|
| `pending` | Chưa có hoặc chưa kiểm tra bằng chứng | Không |
| `restricted` | Chỉ dùng trong phạm vi cụ thể | Theo điều kiện |
| `approved` | Đã có bằng chứng và phê duyệt | Có |
| `expired` | Quyền đã hết hạn | Không |
| `rejected` | Không được phép sử dụng | Không |

## Cấu trúc bằng chứng

```text
08-Legal-Rights/
├── Media-Consent/
├── Font-Licenses/
├── Client-Logo-Approvals/
├── Talent-Releases/
├── Photographer-Credits/
├── Evidence/
├── asset-rights-register.csv
├── asset-rights-register.json
└── README.md
```

## Facebook Cover

- Asset ID: `LR-001`.
- File dự kiến: `../07-Social-Identity/Facebook-Cover/Original/khai-thien-facebook-cover-original.jpg`.
- Nguồn quan sát: fanpage Khải Thiên.
- Trạng thái: `pending`.
- Cần xác minh: quyền với bốn ảnh sự kiện, người xuất hiện, logo/bối cảnh khách hàng, đơn vị thiết kế banner và thông tin liên hệ.
- Ảnh trong cuộc trò chuyện chưa tồn tại dưới dạng file trên máy; không được đánh dấu `approved/present` trước khi bổ sung file thật.

## Quy trình phê duyệt

1. Lưu file gốc và tính checksum.
2. Ghi nguồn, ngày nhận, owner và người cung cấp.
3. Xác định mọi người/logo/tài sản bên thứ ba xuất hiện.
4. Gắn evidence ID tương ứng.
5. Brand Owner và Business/Legal Owner phê duyệt phạm vi.
6. Cập nhật status, expiry và credit requirement.
7. CMS chỉ cho publish asset có status `approved` và chưa hết hạn.

## Bằng chứng chấp nhận được

- Hợp đồng hoặc phụ lục cho phép sử dụng truyền thông/website.
- Email hoặc văn bản đồng ý từ chủ sở hữu.
- Model/talent release.
- Xác nhận của khách hàng về logo, địa điểm và hình ảnh dự án.
- Giấy phép font cho web hoặc license mã nguồn mở phù hợp.
- Xác nhận photographer/agency về quyền chỉnh sửa, crop và xuất bản.

## Checklist trước khi launch

- [ ] Facebook Cover gốc đã được lưu và checksum.
- [ ] Bảy Brand Photos có file gốc.
- [ ] Nhân sự/talent trong ảnh có consent phù hợp.
- [ ] Khách hàng duyệt case study và logo.
- [ ] Photographer/agency credit được ghi nhận.
- [ ] Montserrat và Be Vietnam Pro có license/file nguồn hợp lệ.
- [ ] Logo vector thuộc quyền sử dụng của Khải Thiên.
- [ ] Không có asset `pending`, `expired` hoặc `rejected` trên public website.
