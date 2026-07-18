# KHẢI THIÊN — TYPOGRAPHY

## Phương án đồng bộ cho website V3

| Vai trò | Font | Weight | Ghi chú |
|---|---|---:|---|
| Display/Hero | Montserrat | 600–700 | Nhận diện mạnh, gần hình dáng chữ trong logo |
| Heading | Montserrat | 600 | Dùng cho H1–H4 và tiêu đề section |
| Navigation/CTA | Montserrat | 500–600 | Rõ ràng ở kích thước nhỏ |
| Body | Be Vietnam Pro | 400–500 | Tối ưu nội dung dài tiếng Việt và English |
| Caption/Metadata | Be Vietnam Pro | 400–500 | Ngày, category, chú thích và helper text |

## Font stack

```css
--font-display: "Montserrat", Arial, sans-serif;
--font-body: "Be Vietnam Pro", Arial, sans-serif;
```

## Type scale đề xuất

| Token | Desktop | Mobile | Line height | Font |
|---|---:|---:|---:|---|
| Display | 72px | 44px | 1.05 | Montserrat 700 |
| H1 | 56px | 40px | 1.10 | Montserrat 700 |
| H2 | 40px | 32px | 1.15 | Montserrat 600 |
| H3 | 28px | 24px | 1.25 | Montserrat 600 |
| H4 | 22px | 20px | 1.30 | Montserrat 600 |
| Body large | 20px | 18px | 1.60 | Be Vietnam Pro 400 |
| Body | 16px | 16px | 1.70 | Be Vietnam Pro 400 |
| Small | 14px | 14px | 1.55 | Be Vietnam Pro 400 |
| Caption | 12px | 12px | 1.50 | Be Vietnam Pro 500 |

## Quy tắc sử dụng

- Chỉ dùng Montserrat cho nội dung ngắn: headline, navigation, CTA và số liệu nổi bật.
- Dùng Be Vietnam Pro cho đoạn văn, form, legal content và nội dung CMS.
- Không viết hoa toàn bộ đoạn văn. Uppercase chỉ áp dụng cho label ngắn khi cần.
- Body desktop giữ độ dài khoảng 55–75 ký tự mỗi dòng.
- Kiểm tra cả tiếng Việt và English; component phải chịu được English dài hơn tối thiểu 30%.
- Không dùng weight dưới 400 cho nội dung quan trọng.
- Không giả lập bold/italic nếu file font tương ứng chưa được tải.

## Trạng thái xác nhận

Montserrat là font gần nhất được nhận diện từ file JPG của logo, chưa phải xác nhận từ file thiết kế gốc. Trước khi khóa brand guideline, cần đối chiếu với file AI/SVG/EPS hoặc thông tin từ đơn vị thiết kế logo.
