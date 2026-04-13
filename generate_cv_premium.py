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

# Determine the correct image
img_path = "Images/ngochuy.JPEG"
if not os.path.exists(img_path):
    img_path = "Images/image.png"

# Mask image to circle
if os.path.exists(img_path):
    img = Image.open(img_path).convert("RGBA")
    size = min(img.size)
    img = img.crop(((img.size[0] - size) // 2, (img.size[1] - size) // 2, (img.size[0] + size) // 2, (img.size[1] + size) // 2))
    img = img.resize((400, 400), Image.Resampling.LANCZOS)
    mask = Image.new('L', (400, 400), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + (400, 400), fill=255)
    img.putalpha(mask)
    img.save("Images/avatar_circle.png")

class PremiumCV(FPDF):
    def header(self):
        # Draw Left Sidebar
        self.set_fill_color(0, 15, 45) # Deep navy blue
        self.rect(0, 0, 75, 297, 'F')

    def footer(self):
        pass

def draw_skill(pdf, x, y, skill_name, level_percent):
    pdf.set_font("BeVietnamPro", "", 9)
    pdf.set_text_color(220, 220, 220)
    pdf.set_xy(x, y)
    pdf.cell(24, 6, skill_name)
    
    bar_x = x + 24
    bar_y = y + 2.5
    bar_w = 31
    bar_h = 1.5
    pdf.set_fill_color(40, 50, 75)
    pdf.rect(bar_x, bar_y, bar_w, bar_h, 'F')
    pdf.set_fill_color(0, 200, 255)
    pdf.rect(bar_x, bar_y, bar_w * (level_percent / 100), bar_h, 'F')

pdf = PremiumCV()
pdf.set_auto_page_break(auto=False)
pdf.add_page()
pdf.add_font("BeVietnamPro", "", "BeVietnamPro-Regular.ttf")
pdf.add_font("BeVietnamPro", "B", "BeVietnamPro-Bold.ttf")
pdf.add_font("BeVietnamPro", "I", "BeVietnamPro-Italic.ttf")

# --- LEFT SIDEBAR (x: 0 to 75) ---
if os.path.exists("Images/avatar_circle.png"):
    pdf.image("Images/avatar_circle.png", x=17.5, y=15, w=40, h=40)

pdf.set_text_color(255, 255, 255)

# Contact Info
pdf.set_y(62)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_x(10)
pdf.cell(55, 10, "THÔNG TIN", align="L")
pdf.set_draw_color(0, 212, 255) # Accent cyan
pdf.set_line_width(0.5)
pdf.line(10, 70, 25, 70)

pdf.set_y(74)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_x(10)
pdf.multi_cell(55, 5, "Email:\ncontact@nghuy.vn\n\nWebsite:\nnghuy.vn\n\nKhu Vực:\nViệt Nam\n\nGitHub:\ngithub.com/ngngochuy", align="L")

# Skills
pdf.set_y(135)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_x(10)
pdf.cell(55, 10, "KỸ NĂNG IT", align="L")
pdf.line(10, 143, 25, 143)

pdf.set_y(148)
pdf.set_text_color(255, 255, 255)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_x(10)
pdf.cell(55, 6, "Ngôn Ngữ Lập Trình")

draw_skill(pdf, 10, 154, "HTML/CSS", 95)
draw_skill(pdf, 10, 160, "JavaScript", 90)
draw_skill(pdf, 10, 166, "PHP", 75)
draw_skill(pdf, 10, 172, "Python", 80)

pdf.set_y(181)
pdf.set_text_color(255, 255, 255)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_x(10)
pdf.cell(55, 6, "Frameworks & Tools")
draw_skill(pdf, 10, 187, "React", 85)
draw_skill(pdf, 10, 193, "Node.js", 80)
draw_skill(pdf, 10, 199, "Git/GitHub", 85)
draw_skill(pdf, 10, 205, "Figma/UI", 75)

pdf.set_y(216)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_text_color(255, 255, 255)
pdf.set_x(10)
pdf.cell(55, 10, "NGOẠI NGỮ", align="L")
pdf.line(10, 224, 25, 224)

draw_skill(pdf, 10, 228, "Tiếng Anh", 75)
pdf.set_y(234)
pdf.set_font("BeVietnamPro", "I", 8)
pdf.set_text_color(180, 180, 180)
pdf.set_x(10)
pdf.multi_cell(55, 4, "(Đọc hiểu tài liệu CNTT tốt)")

# --- RIGHT CONTENT (x: 85 to 200) ---
LEFT_MARGIN = 85
pdf.set_y(20)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 26)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 10, "NGUYỄN NGỌC HUY")

pdf.set_y(32)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 8, "KỸ SƯ PHẦN MỀM (SOFTWARE ENGINEER)")

# VỀ TÔI
pdf.set_y(48)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "HỒ SƠ CÁ NHÂN")
pdf.set_draw_color(0, 102, 255)
pdf.line(LEFT_MARGIN, 56, LEFT_MARGIN + 15, 56)

pdf.set_y(60)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10)
pdf.set_text_color(70, 70, 70)
summary = "Đam mê lớn nhất của tôi là nghệ thuật biến sự phức tạp thành những hệ thống trực quan và tinh gọn. Tôi tin rằng một phần mềm xuất sắc không phải là một giải pháp cồng kềnh với nhiều công nghệ thừa thãi, mà là giải pháp giúp người dùng giải quyết bài toán thực tế một cách dễ dàng nhất.\n\nSứ mệnh của tôi là thiết kế, xây dựng những sản phẩm công nghệ có trải nghiệm người dùng hiện đại, tối ưu hiệu suất, và có kiến trúc code sạch sẽ để hệ thống dễ dàng mở rộng và bảo trì về sau. Tôi có khả năng phát triển trọn gói từ Frontend tới Backend (Full-stack) và khả năng thích ứng linh hoạt với các dự án."
pdf.multi_cell(115, 5.5, summary)

# HÀNH TRÌNH PHÁT TRIỂN
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "KINH NGHIỆM LÀM VIỆC")
pdf.line(LEFT_MARGIN, new_y + 8, LEFT_MARGIN + 15, new_y + 8)

new_y = pdf.get_y() + 8
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Kỹ Sư Phần Mềm Độc Lập / Freelancer")

new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 9.5)
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 6, "Hành Trình Kỷ Luật Số (2020 - Hiện tại)")

new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10)
pdf.set_text_color(70, 70, 70)
desc1 = "• Trực tiếp làm việc với các khách hàng cá nhân và doanh nghiệp vừa/nhỏ để phân tích yêu cầu nghiệp vụ và tư vấn giải pháp công nghệ toàn diện.\n• Xây dựng và thiết kế các ứng dụng web dạng Full-stack, chú trọng vào chuẩn thiết kế Glassmorphism và UX/UI.\n• Đảm nhiệm toàn bộ quy trình phát triển: từ vẽ wireframe, lập trình giao diện Frontend, quản lý database Backend, tới việc setup server CI/CD tự động deploy lên cPanel/VPS.\n• Tối ưu hệ thống Web Core Vitals, áp dụng quy chuẩn SEO, nâng cấp hiệu suất tải hình ảnh, rút ngắn thời gian phản hồi API."
pdf.multi_cell(115, 5.5, desc1)

# DỰ ÁN NỔI BẬT
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 13)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "DỰ ÁN TIÊU BIỂU")
pdf.line(LEFT_MARGIN, new_y + 8, LEFT_MARGIN + 15, new_y + 8)

new_y = pdf.get_y() + 8
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 10.5)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Portfolio Cá Nhân & Tích hợp trợ lý AI - Nghuy.vn")
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 10)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(115, 5.5, "Trang chủ mang cấu trúc UX cao cấp kết hợp dark theme. Điển hình là việc tự lập trình tích hợp Chatbot AI và tự động hóa quy trình Deploy FTP.")

# Footer watermark
pdf.set_y(283)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 8)
pdf.set_text_color(180, 180, 180)
pdf.cell(0, 6, "Tạo từ nghuy.vn | Bản quyền Nguyễn Ngọc Huy")

pdf.output("NguyenNgocHuy_CV.pdf")
print("Professional IT PDF CV Generated successfully.")
