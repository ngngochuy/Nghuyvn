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

# Determine the correct image precisely
img_path = "Images/ngochuy.JPEG"
if not os.path.exists(img_path):
    img_path = "Images/Nghuy.png"

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
        self.set_fill_color(0, 15, 40) # Even deeper navy blue
        self.rect(0, 0, 75, 297, 'F')

    def footer(self):
        pass

def draw_skill(pdf, x, y, skill_name, level_percent):
    pdf.set_font("BeVietnamPro", "", 8.5)
    pdf.set_text_color(220, 220, 220)
    pdf.set_xy(x, y)
    pdf.cell(24, 6, skill_name)
    
    bar_x = x + 24
    bar_y = y + 2.5
    bar_w = 31
    bar_h = 1.2 # slightly thinner for pro look
    pdf.set_fill_color(30, 45, 70)
    pdf.rect(bar_x, bar_y, bar_w, bar_h, 'F')
    pdf.set_fill_color(0, 212, 255)
    pdf.rect(bar_x, bar_y, bar_w * (level_percent / 100), bar_h, 'F')

pdf = PremiumCV()
pdf.set_auto_page_break(auto=False)
pdf.add_page()
pdf.add_font("BeVietnamPro", "", "BeVietnamPro-Regular.ttf")
pdf.add_font("BeVietnamPro", "B", "BeVietnamPro-Bold.ttf")
pdf.add_font("BeVietnamPro", "I", "BeVietnamPro-Italic.ttf")

# --- LEFT SIDEBAR (x: 0 to 75) ---
if os.path.exists("Images/avatar_circle.png"):
    pdf.image("Images/avatar_circle.png", x=21, y=12, w=33, h=33) # optimized layout size

pdf.set_text_color(255, 255, 255)

# Contact Info
pdf.set_y(50)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_x(10)
pdf.cell(55, 8, "LIÊN HỆ", align="L")
pdf.set_draw_color(0, 212, 255)
pdf.set_line_width(0.5)
pdf.line(10, 57, 25, 57)

pdf.set_y(60)
pdf.set_font("BeVietnamPro", "", 9)
pdf.set_x(10)
pdf.multi_cell(55, 4.5, "Email:\ncontact@nghuy.vn\n\nWebsite:\nnghuy.vn\n\nGitHub:\ngithub.com/ngngochuy\n\nLocation:\nVietnam", align="L")

# Skills
pdf.set_y(105)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_x(10)
pdf.cell(55, 8, "KỸ NĂNG CỐT LÕI", align="L")
pdf.line(10, 112, 25, 112)

pdf.set_y(115)
pdf.set_text_color(255, 255, 255)
pdf.set_font("BeVietnamPro", "B", 9)
pdf.set_x(10)
pdf.cell(55, 6, "Front-end")
draw_skill(pdf, 10, 121, "React / Next.js", 90)
draw_skill(pdf, 10, 126, "HTML5/CSS3", 95)
draw_skill(pdf, 10, 131, "JavaScript/TS", 85)

pdf.set_y(139)
pdf.set_font("BeVietnamPro", "B", 9)
pdf.set_x(10)
pdf.cell(55, 6, "Back-end")
draw_skill(pdf, 10, 145, "Node.js (Express)", 80)
draw_skill(pdf, 10, 150, "Python (FastAPI)", 75)
draw_skill(pdf, 10, 155, "PHP / Laravel", 70)

pdf.set_y(163)
pdf.set_font("BeVietnamPro", "B", 9)
pdf.set_x(10)
pdf.cell(55, 6, "Database & DevOps")
draw_skill(pdf, 10, 169, "MySQL/PostgreSQL", 85)
draw_skill(pdf, 10, 174, "MongoDB", 75)
draw_skill(pdf, 10, 179, "Git & GitHub CI", 85)
draw_skill(pdf, 10, 184, "Docker / cPanel", 80)

# Other Tech Tools (Tags style)
pdf.set_y(195)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_x(10)
pdf.cell(55, 8, "CHUYÊN MÔN", align="L")
pdf.line(10, 202, 25, 202)

pdf.set_y(205)
pdf.set_font("BeVietnamPro", "", 9)
pdf.set_text_color(220, 220, 220)
pdf.set_x(10)
pdf.multi_cell(55, 5, "• Microservices Architecture\n• RESTful API Design\n• Glassmorphism UI\n• Web Vitals Optimization\n• Nhạy bén với UI/UX\n• Data Modeling\n• Nắm vững Clean Code", align="L")

# --- RIGHT CONTENT (x: 85 to 200) ---
LEFT_MARGIN = 85
pdf.set_y(15)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 24)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 10, "NGUYỄN NGỌC HUY")

pdf.set_y(26)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 8, "SENIOR FULL-STACK SOFTWARE ENGINEER")

# VỀ TÔI
pdf.set_y(40)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "MỤC TIÊU NGHỀ NGHIỆP (EXECUTIVE SUMMARY)")
pdf.set_draw_color(0, 102, 255)
pdf.line(LEFT_MARGIN, 47, LEFT_MARGIN + 15, 47)

pdf.set_y(51)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_text_color(70, 70, 70)
summary = "Kỹ sư phần mềm toàn diện với chuyên môn chuyên sâu ở cả Frontend lẫn Backend. Có định hướng phát triển kiến trúc hệ thống (System Architecture) hiện đại và bền vững. Tôi khát khao đồng hành xây dựng những sản phẩm công nghệ không chỉ tối ưu về mặt thuật toán mà còn hoàn hảo trong trải nghiệm của người dùng cuối. Có khả năng tự chủ nghiên cứu công nghệ mới, tiếp quản các hạ tầng phức tạp và áp dụng DevOps (CI/CD) trong triển khai dự án tự động."
pdf.multi_cell(115, 4.8, summary)

# KINH NGHIỆM LÀM VIỆC
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "KINH NGHIỆM CHUYÊN MÔN")
pdf.line(LEFT_MARGIN, new_y + 7.5, LEFT_MARGIN + 15, new_y + 7.5)

# Exp 1
new_y = pdf.get_y() + 7
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 10.5)
pdf.set_text_color(30, 30, 30)
pdf.cell(75, 6, "Full-stack Developer Độc Lập")
pdf.set_font("BeVietnamPro", "I", 9)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, "2020 - Hiện tại", align="R")

pdf.set_y(new_y + 5)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 9.5)
pdf.set_text_color(0, 102, 255)
pdf.cell(0, 6, "Dự án Freelance & Doanh Nghiệp (Hành trình kỷ luật số)")

new_y = pdf.get_y() + 5
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_text_color(70, 70, 70)
exp1 = "• Trực tiếp làm việc với Business Analyst và Client để bóc tách yêu cầu nghiệp vụ phức tạp, thiết kế sơ đồ luồng dữ liệu (Entity-Relationship Diagrams) và cung cấp giải pháp Tech Stack tối ưu.\n• Xây dựng và mở rộng hệ thống bằng mô hình MVC / Component-based, cam kết các chuẩn Clean Architecture, SOLID trong mã nguồn.\n• Áp dụng mạnh mẽ tự động hóa (Automation) trong Server Deployment: Cấu hình FTP/Pipelines tự động build và release source lên cPanel hay máy chủ VPS.\n• Nhạy bén trong việc nâng cấp UX/UI và hiệu suất (Optimize SQL query, Memory leaks, giảm tải bundle size Frontend)."
pdf.multi_cell(115, 4.8, exp1)

# DỰ ÁN NỔI BẬT
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "DỰ ÁN KHÁCH HÀNG & CÁ NHÂN TIÊU BIỂU")
pdf.line(LEFT_MARGIN, new_y + 7.5, LEFT_MARGIN + 15, new_y + 7.5)

new_y = pdf.get_y() + 7
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Hệ sinh thái Portfolio (Nghuy.vn)")

new_y = pdf.get_y() + 5
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(115, 4.8, "• Hệ thống Website tĩnh cao cấp được thiết kế theo cấu trúc Dark Theme, áp dụng mượt mà thư viện ảnh động và kỹ thuật CSS Glassmorphism.\n• Tích hợp trực tiếp trợ lý ảo AI thông minh (Huybot) hỗ trợ trả lời khách hàng.\n• Thiết lập quy trình CI/CD tích hợp GitHub Actions, push file tĩnh qua FTP ngay khi code merge vào nhánh main, không down-time.")

new_y = pdf.get_y() + 3
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 6, "Ứng dụng Hệ thống Quản lý Doanh Nghiệp (SMBs)")
new_y = pdf.get_y() + 5
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(115, 4.8, "Cung cấp, bảo trì mã nguồn chuẩn RESTful, đảm bảo luồng Authentication/Authorization an toàn cho các tác vụ nội bộ đa luồng.")

# HỌC VẤN
new_y = pdf.get_y() + 6
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(10, 20, 40)
pdf.cell(0, 8, "HỌC VẤN & PHÁT TRIỂN NĂNG LỰC")
pdf.line(LEFT_MARGIN, new_y + 7.5, LEFT_MARGIN + 15, new_y + 7.5)

new_y = pdf.get_y() + 7
pdf.set_y(new_y)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "B", 10)
pdf.set_text_color(30, 30, 30)
pdf.cell(75, 6, "Tự Học Kỷ Luật Tới Chuyên Sâu (Self-taught)")
pdf.set_font("BeVietnamPro", "I", 9)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, "Thường xuyên", align="R")

pdf.set_y(new_y + 5)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "", 9.5)
pdf.set_text_color(70, 70, 70)
pdf.multi_cell(115, 4.8, "• Liên tục update công nghệ Frontend, xu hướng Web mới (Web3, UX Animations).\n• Sở hữu khả năng đọc, nghiên cứu gốc rễ Docs bằng tiếng Anh chuyên ngành.")

# Footer watermark
pdf.set_y(285)
pdf.set_x(LEFT_MARGIN)
pdf.set_font("BeVietnamPro", "I", 8)
pdf.set_text_color(180, 180, 180)
pdf.cell(0, 6, "Tạo tự động từ nghuy.vn | Bản quyền Nguyễn Ngọc Huy")

pdf.output("NguyenNgocHuy_CV.pdf")
print("Professional IT PDF CV Generated successfully.")
