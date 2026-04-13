import os
import urllib.request
from fpdf import FPDF

font_url_regular = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Regular.ttf"
font_url_bold = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Bold.ttf"
font_url_italic = "https://github.com/google/fonts/raw/main/ofl/bevietnampro/BeVietnamPro-Italic.ttf"

if not os.path.exists("BeVietnamPro-Regular.ttf"):
    urllib.request.urlretrieve(font_url_regular, "BeVietnamPro-Regular.ttf")
if not os.path.exists("BeVietnamPro-Bold.ttf"):
    urllib.request.urlretrieve(font_url_bold, "BeVietnamPro-Bold.ttf")
if not os.path.exists("BeVietnamPro-Italic.ttf"):
    urllib.request.urlretrieve(font_url_italic, "BeVietnamPro-Italic.ttf")

class CV(FPDF):
    def header(self):
        # Header banner
        self.set_fill_color(0, 102, 255) # Primary color
        self.rect(0, 0, 210, 40, 'F')
        
        self.set_font("BeVietnamPro", "B", 26)
        self.set_text_color(255, 255, 255)
        self.set_xy(15, 10)
        self.cell(0, 10, "NGUYỄN NGỌC HUY", ln=1)

        self.set_font("BeVietnamPro", "", 12)
        self.set_text_color(200, 230, 255)
        self.set_xy(15, 22)
        self.cell(0, 8, "Kỹ Sư Phần Mềm (Software Engineer)", ln=1)
        
        # Contact info on the right inside header
        self.set_font("BeVietnamPro", "", 10)
        self.set_xy(120, 12)
        self.cell(80, 5, "Email: contact@nghuy.vn", ln=1, align="R")
        self.set_xy(120, 18)
        self.cell(80, 5, "Website: nghuy.vn", ln=1, align="R")
        self.set_xy(120, 24)
        self.cell(80, 5, "Khu Vực: Vietnam", ln=1, align="R")

    def footer(self):
        self.set_y(-15)
        self.set_font("BeVietnamPro", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Trang {self.page_no()}/{{nb}} - NGHUY.VN", align="C")

# Generate PDF
pdf = CV()
pdf.add_font("BeVietnamPro", "", "BeVietnamPro-Regular.ttf")
pdf.add_font("BeVietnamPro", "B", "BeVietnamPro-Bold.ttf")
pdf.add_font("BeVietnamPro", "I", "BeVietnamPro-Italic.ttf")
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# --- SUMMARY ---
pdf.set_y(45)
pdf.set_font("BeVietnamPro", "B", 16)
pdf.set_text_color(0, 50, 150)
pdf.cell(0, 10, "GIỚI THIỆU CHUNG", ln=1)
pdf.set_draw_color(0, 102, 255)
pdf.line(15, 53, 195, 53)

pdf.ln(3)
pdf.set_font("BeVietnamPro", "", 11)
pdf.set_text_color(50, 50, 50)
summary = "Xin chào, tôi là Nguyễn Ngọc Huy. Đam mê lớn nhất của tôi là đơn giản hóa sự phức tạp. Thay vì cố gắng tạo ra những cỗ máy khổng lồ, tôi tập trung thiết kế các giải pháp phần mềm tinh gọn, ổn định và thực sự giải quyết được bài toán thực tế. Tôi luôn mở lòng với các dự án tự do hoặc cơ hội hợp tác mới."
pdf.multi_cell(0, 6, summary)

# --- TECHNICAL SKILLS ---
pdf.ln(8)
pdf.set_font("BeVietnamPro", "B", 16)
pdf.set_text_color(0, 50, 150)
pdf.cell(0, 10, "KỸ NĂNG CÔNG NGHỆ", ln=1)
pdf.line(15, pdf.get_y(), 195, pdf.get_y())

pdf.ln(3)
pdf.set_font("BeVietnamPro", "B", 11)
pdf.set_text_color(30, 30, 30)
pdf.cell(40, 7, "Ngôn Ngữ:", border=0)
pdf.set_font("BeVietnamPro", "", 11)
pdf.cell(0, 7, "JavaScript, HTML/CSS, PHP, Python", ln=1)

pdf.set_font("BeVietnamPro", "B", 11)
pdf.cell(40, 7, "Frameworks:", border=0)
pdf.set_font("BeVietnamPro", "", 11)
pdf.cell(0, 7, "React, Node.js", ln=1)

pdf.set_font("BeVietnamPro", "B", 11)
pdf.cell(40, 7, "Kỹ Năng Khác:", border=0)
pdf.set_font("BeVietnamPro", "", 11)
pdf.cell(0, 7, "Tối ưu hóa UI/UX, Phát triển Independent, Clean Code", ln=1)

# --- EXPERIENCE & PROJECTS ---
pdf.ln(8)
pdf.set_font("BeVietnamPro", "B", 16)
pdf.set_text_color(0, 50, 150)
pdf.cell(0, 10, "HÀNH TRÌNH & DỰ ÁN", ln=1)
pdf.line(15, pdf.get_y(), 195, pdf.get_y())

pdf.ln(5)
pdf.set_font("BeVietnamPro", "B", 12)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 6, "Kỹ Sư Phần Mềm (Phát Triển Độc Lập)", ln=1)
pdf.set_font("BeVietnamPro", "I", 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, "Hành Trình Kỷ Luật", ln=1)

pdf.ln(2)
pdf.set_font("BeVietnamPro", "", 11)
pdf.set_text_color(50, 50, 50)
exp_desc = "- Phát triển các dự án cá nhân nổi bật, từ hệ thống backend đến giao diện frontend hiện đại.\n- Xây dựng trải nghiệm người dùng cao cấp với animations tinh tế, hiệu suất cao.\n- Tự học hỏi và nghiên cứu tự do các chuẩn mực công nghệ để theo kịp tiến độ bảo trì và kiến trúc."
pdf.multi_cell(0, 6, exp_desc)

pdf.ln(8)
pdf.set_font("BeVietnamPro", "B", 14)
pdf.set_text_color(0, 50, 150)
pdf.cell(0, 8, "CÁC NỀN TẢNG LIÊN KẾT", ln=1)
pdf.line(15, pdf.get_y(), 195, pdf.get_y())
pdf.ln(2)
pdf.set_font("BeVietnamPro", "", 11)
pdf.set_text_color(50, 50, 50)
pdf.cell(0, 6, "- GitHub: github.com/ngngochuy", ln=1)
pdf.cell(0, 6, "- Liên Hệ Công Việc: contact@nghuy.vn", ln=1)

pdf.output("CV_NguyenNgocHuy.pdf")
print("PDF CV Generated successfully.")
