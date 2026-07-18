# KHẢI THIÊN — BRAND PHOTOS

## Cấu trúc thư viện

```text
06-Brand-Photos/
├── Original/             # File gốc, không chỉnh sửa
├── Team/                 # Ảnh đội ngũ được duyệt
├── Founder/              # Chân dung Founder/CEO
├── Behind-the-Scenes/    # Hậu trường quay/chụp/sản xuất
├── Office/               # Không gian và hoạt động tại văn phòng
├── Social-Creatives/     # Artwork social có chữ/graphic
├── Derived/              # Crop/resize/WebP/AVIF đã duyệt
├── photo-inventory.md
└── asset-manifest.json
```

## Trạng thái file

Bảy ảnh được cung cấp trong cuộc trò chuyện chưa tồn tại dưới dạng file trong thư mục dự án. Hãy lưu file gốc theo tên trong `asset-manifest.json` vào `Original/`. Sau đó có thể sao chép hoặc xuất bản dẫn xuất vào nhóm tương ứng.

## Nguyên tắc

- Giữ nguyên file gốc và metadata nếu có.
- Không dùng ảnh tải từ Facebook khi có file máy ảnh chất lượng cao hơn.
- Không nhận diện hoặc ghi tên từng nhân sự nếu chưa được Business Owner xác nhận.
- Cần có quyền sử dụng hình ảnh của nhân sự, khách hàng và người xuất hiện trong ảnh.
- Không dùng ảnh social creative có chữ làm ảnh chân dung Founder trên website.
- Không xuất bản số điện thoại, logo khách hàng hoặc thông tin nhìn thấy trong ảnh khi chưa xác minh.
- Ảnh production phải có alt text theo locale và credit nếu quyền sử dụng yêu cầu.

## Quy trình xử lý

1. Đặt file gốc vào `Original/` đúng tên chuẩn.
2. Cập nhật `present: true`, kích thước, nguồn và owner trong manifest.
3. Xác minh consent/media rights.
4. Chọn crop phù hợp cho từng module website.
5. Xuất WebP/AVIF vào `Derived/`; không ghi đè file gốc.
6. Chỉ đưa vào CMS khi trạng thái là `approved`.
