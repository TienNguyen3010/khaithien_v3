# CONTACT DATA — USAGE GUIDELINES

## Dùng trên website

- Header CTA dẫn đến `/{locale}/contact`, không gọi điện ngoài ý muốn.
- Footer hiển thị địa chỉ, hotline, email và Maps link.
- Mobile có thể dùng `tel:+84764898969` cho nút gọi.
- Email dùng `mailto:khaithienmande@gmail.com`.
- Maps link mở tab mới và có accessible label nói rõ sẽ mở Google Maps.
- Contact form vẫn gửi qua API; không dùng email link thay thế form chính.

## Structured data

- Dùng `PostalAddress` từ các trường trong JSON.
- Không thêm `openingHours` khi chưa được doanh nghiệp cung cấp.
- Không tự suy luận latitude/longitude từ URL rút gọn.
- Không dùng địa chỉ cũ hoặc số điện thoại trên banner fanpage.

## Dữ liệu đã thay thế

Các dữ liệu sau không còn là nguồn chính cho Website V3:

- Hotline trên banner cũ: `037 912 5458`.
- Số điện thoại từ nguồn đăng ký công khai khác.
- Cách viết địa chỉ rút gọn trên artwork fanpage.

## Cần bổ sung

- [ ] Giờ làm việc.
- [ ] Tọa độ latitude/longitude nếu cần bản đồ nhúng.
- [ ] Ảnh mặt tiền hoặc lối vào văn phòng.
- [ ] Hướng dẫn gửi xe/đến văn phòng nếu cần.
- [ ] Email theo domain doanh nghiệp nếu được thiết lập sau này.
- [ ] Ngày review định kỳ thông tin liên hệ.
