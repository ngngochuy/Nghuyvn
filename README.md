# Nghuy.vn — Portfolio HTML/CSS/JS

Portfolio cá nhân của **Nguyễn Ngọc Huy**, chuyển đổi từ React sang HTML/CSS/JS thuần túy.

## 🗂 Cấu trúc thư mục

```
Nghuy.vn-HTML/
├── index.html          ← File chính — sửa HTML tại đây
├── css/
│   └── style.css       ← Toàn bộ CSS — sửa style tại đây
├── js/
│   ├── data.js         ← ⭐ Dữ liệu cá nhân (tên, email, dự án...)
│   ├── main.js         ← Khởi động ứng dụng
│   ├── intro.js        ← Màn hình chào
│   ├── navbar.js       ← Thanh điều hướng
│   ├── hero.js         ← Phần hero
│   ├── sections.js     ← About, Portfolio, Contact, Footer
│   ├── chatbot.js      ← HuyBot (Gemini AI)
│   ├── cursor.js       ← Custom cursor
│   └── scroll.js       ← Scroll animations
└── Images/             ← Ảnh và logo
```

## ✏️ Cách cập nhật nội dung

### Sửa thông tin cá nhân
Mở file **`js/data.js`** → sửa object `personal`:
```js
const personal = {
  name: "Nguyễn Ngọc Huy",
  email: "contact@nghuy.vn",
  // ...
};
```

### Thêm / Sửa dự án
Mở file **`js/data.js`** → sửa mảng `projects`:
```js
const projects = [
  {
    id: 1,
    title: "Tên Dự Án",
    description: "Mô tả ngắn",
    tags: ["React", "Node.js"],
    liveUrl: "https://example.com",
    status: "Hoạt động",  // hoặc "Bảo trì"
    color: "#3B82F6",
    span: 1,  // 1 hoặc 2 (cột)
  },
  // ...
]
```

### Cấu hình Gemini API Key
1. Mở **`js/data.js`**
2. Tìm dòng: `const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";`
3. Thay `YOUR_GEMINI_API_KEY` bằng key thật

> ⚠️ **Quan trọng:** Đảm bảo GitHub repo ở chế độ **PRIVATE** trước khi push!

---

## 🚀 Quy trình cập nhật & đẩy lên GitHub

### Lần đầu (setup):
```bash
cd /path/to/Nghuy.vn-HTML
git init
git add .
git commit -m "Initial HTML portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Những lần tiếp theo:
```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

### Nếu dùng GitHub Pages (hosting miễn phí):
1. Vào **GitHub Repo → Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` / `(root)`
4. Website sẽ live tại: `https://your-username.github.io/repo-name/`

---

## 🔧 Preview local

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc dùng Live Server:
```bash
npx live-server .
```

---

## 📱 Responsive
- Mobile: ✅
- Tablet: ✅  
- Desktop: ✅

## 🎨 Customize màu sắc
Mở `css/style.css` → sửa `:root` variables:
```css
:root {
  --primary: #0066FF;
  --accent: #00D4FF;
  --bg-base: #020510;
}
```
