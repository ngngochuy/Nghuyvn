import os
import urllib.request
from fpdf import FPDF
from PIL import Image, ImageDraw

font_url_regular = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Regular.ttf"
font_url_bold = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Bold.ttf"
font_url_italic = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Italic.ttf"

for f in ["BeVietnamPro-Regular.ttf", "BeVietnamPro-Bold.ttf", "BeVietnamPro-Italic.ttf"]:
    if not os.path.exists(f):
        url = globals()[f"font_url_{f.split('-')[1].split('.')[0].lower()}"]
        urllib.request.urlretrieve(url, f)

# Mask image to circle
if os.path.exists("Images/image.png"):
    img = Image.open("Images/image.png").convert("RGBA")
    size = min(img.size)
    img = img.crop(((img.size[0] - size) // 2, (img.size[1] - size) // 2, (img.size[0] + size) // 2, (img.size[1] + size) // 2))
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + img.size, fill=255)
    img.putalpha(mask)
    img.save("Images/avatar_circle.png")

class PremiumCV(FPDF):
    def header(self):
        # Draw Left Sidebar
        self.set_fill_color(0, 15, 45) # Deep navy blue
        self.rect(0, 0, 75, 297, 'F')

    def footer(self):
        pass

pdf = PremiumCV()
pdf.add_page()
pdf.add_font("BeVietnamPro", "", "BeVietnamPro-Regular.ttf")
pdf.add_font("BeVietnamPro", "B", "BeVietnamPro-Bold.ttf")
pdf.add_font("BeVietnamPro", "I", "BeVietnamPro-Italic.ttf")

# --- LEFT SIDEBAR (x: 0 to 75) ---
if os.path.exists("Images/avatar_circle.png"):
    pdf.image("Images/avatar_circle.png", x=17.5, y=20, w=40, h=40)

pdf.set_text_color(255, 255, 255)

# Contact Info
pdf.set_y(70)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_x(10)
pdf.cell(55, 10, "THÔNG TIN", ln=1, align="L")
pdf.set_draw_color(0, 212, 255) # Accent cyan
pdf.set_line_width(0.5)
pdf.line(10, 80, 25, 80)

pdf.set_y(85)
pdf.set_font("BeVietnamPro", "", 10)
pdf.set_x(10)
pdf.multi_cell(55, 6, "Email:\ncontact@nghuy.vn\n\nWebsite:\nnghuy.vn\n\nKhu Vực:\nViệt Nam\n\nGitHub:\ngithub.com/ngngochuy", align="L")

# Skills
pdf.set_y(150)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_x(10)
pdf.cell(55, 10, "KỸ NĂNG", ln=1, align="L")
pdf.line(10, 160, 25, 160)

pdf.set_y(165)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_x(10)
pdf.cell(55, 6, "Ngôn Ngữ", ln=1)
pdf.set_font("BeVietnamPro", "", 9)
pdf.set_text_color(200, 200, 200)
pdf.set_x(10)
pdf.multi_cell(55, 5.5, "JavaScript, HTML/CSS,\nPHP, Python", align="L")

pdf.set_y(195)
pdf.set_text_color(255, 255, 255)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_x(10)
pdf.cell(55, 6, "Công Nghệ / Framework", ln=1)
pdf.set_font("BeVietnamPro", "", 9)
pdf.set_text_color(200, 200, 200)
pdf.set_x(10)
pdf.multi_cell(55, 5.5, "React, Node.js", align="L")

pdf.set_y(220)
pdf.set_text_color(255, 255, 255)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_x(10)
pdf.cell(55, 6, "Chuyên Môn Cốt Lõi", ln=1)
pdf.set_font("BeVietnamPro", "", 9)
pdf.set_text_color(200, 200, 200)
pdf.set_x(10)
pdf.multi_cell(55, 5.5, "Phát triển phần mềm tinh gọn\nTối ưu hóa UI/UX\nClean Code & Architecture", align="L")

# --- RIGHT CONTENT (x: 85 to 200) ---
LEFT_MARGIN = 85

# Title
pdf.set_y(25)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 26)
pdf.set_text_color(10, 20, 40)
# Tracking equivalent
pdf.cell(0, 10, "NGUYỄN NGỌC HUY", ln=1)

pdf.set_y(38)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 13)
# Primary brand color
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 8, "KỸ SƯ PHẦN MỀM (SOFTWARE ENGINEER)", ln=1)

# Summary
pdf.set_y(55)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "VỀ TÔI", ln=1)
pdf.set_draw_color(0, 102, 255)
pdf.line(LEFT_MARGIN, 64, LEFT_MARGIN + 15, 64)

pdf.set_y(68)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10.5)
pdf.set_text_color(70, 70, 70)
summary = "Đam mê lớn nhất của tôi là nghệ thuật biến sự phức tạp thành những hệ thống trực quan và tinh gọn. Tôi tin rằng một phần mềm xuất sắc không phải là một giải pháp cồng kềnh với nhiều công nghệ thừa thãi, mà là giải pháp giúp người dùng giải quyết bài toán thực tế một cách dễ dàng nhất.\n\nSứ mệnh của tôi là thiết kế, xây dựng những sản phẩm công nghệ có trải nghiệm người dùng hiện đại, tối ưu hiệu suất, và có kiến trúc code sạch sẽ để đồng nghiệp dễ dàng bảo trì về sau. Hiện tại tôi đang hoàn toàn sẵn sàng nhận dự án mới."
pdf.multi_cell(110, 6.5, summary)

# Experience
pdf.set_y(120)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "HÀNH TRÌNH PHÁT TRIỂN", ln=1)
pdf.line(LEFT_MARGIN, 129, LEFT_MARGIN + 15, 129)

pdf.set_y(135)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Nhà Phát Triển Độc Lập / Freelancer", ln=1)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 10)
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 6, "Hành Trình Kỷ Luật Số", ln=1)

pdf.ln(3)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10.5)
pdf.set_text_color(70, 70, 70)
desc1 = "• Tự nghiên cứu và xây dựng toàn bộ quy trình phát triển website từ Frontend đến Backend.\n• Triển khai portfolio cá nhân với thiết kế glassmorphism hiện đại, responsive hoàn chỉnh trên các thiết bị.\n• Tối ưu hệ thống Web Core Vitals, áp dụng quy chuẩn SEO, nâng cấp hiệu suất tải hình ảnh.\n• Tích hợp tính năng tự động hóa (cPanel Deploy pipelines) cùng hệ thống AI hỗ trợ (HuyBot)."
pdf.multi_cell(110, 6.5, desc1)

# Projects
pdf.set_y(185)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "DỰ ÁN NỔI BẬT", ln=1)
pdf.line(LEFT_MARGIN, 194, LEFT_MARGIN + 15, 194)

pdf.set_y(200)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Nghuy.vn - Portfolio Cá Nhân", ln=1)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10.5)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(110, 6.5, "Trang chủ mang cấu trúc UX cao cấp, tích hợp Chatbot AI và dark theme. Deploy qua FTP với workflow CI/CD.")

pdf.set_y(225)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Dự án Khách Hàng / Freelance", ln=1)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10.5)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(110, 6.5, "Cung cấp, đảm bảo mã nguồn cho nhiều hệ thống kinh doanh nhỏ gọn, tối ưu API và kiến trúc phần mềm.")

# Footer watermark
pdf.set_y(285)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 8)
pdf.set_text_color(180, 180, 180)
pdf.cell(0, 6, "Tạo từ nghuy.vn | Bản quyền Nguyễn Ngọc Huy")

pdf.output("CV_NguyenNgocHuy_Premium.pdf")
print("Premium PDF CV Generated successfully.")
