// ============================================================
// Portfolio Data — Nguyễn Ngọc Huy
// ============================================================

const personal = {
  name: "Nguyễn Ngọc Huy",
  alias: "Ngọc Huy",
  tagline: "Kỹ sư phần mềm & Nhà sáng lập",
  subtitle: "Nhà phát triển nền tảng độc lập",
  bio: "Xin chào, tôi là Nguyễn Ngọc Huy. Đam mê lớn nhất của tôi là đơn giản hóa sự phức tạp. Thay vì cố gắng tạo ra những cỗ máy khổng lồ, tôi tập trung thiết kế các giải pháp phần mềm tinh gọn, ổn định và thực sự giải quyết được bài toán thực tế.",
  bio2: "Tôi không tin vào sự phô trương của công nghệ. Một đoạn code xuất sắc không phải là đoạn code dùng công nghệ phức tạp nhất, mà là đoạn code dễ đọc nhất để đồng nghiệp sau này hiểu được. Quan điểm làm việc của tôi khá đơn giản: Tập trung sâu vào gốc rễ, giữ vững sự tĩnh lặng giữa nhịp độ nhanh của công việc, và luôn xem sản phẩm tạo ra như một phần mở rộng của chính góc làm việc của mình.",
  email: "contact@nghuy.vn",
  website: "nghuy.vn",
  location: "Vietnam",
  links: {
    github: "https://github.com/",
    zalo: "https://zalo.me/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    telegram: "https://t.me/",
  },
};

const stats = [
  { label: "Dự Án Lõi", value: "15", icon: "code", description: "Các dự án hệ thống cốt lõi" },
  { label: "Nền Tảng Độc Lập", value: "5", icon: "award", description: "Nền tảng đã triển khai" },
  { label: "Năm Kinh Nghiệm", value: "7", icon: "globe", description: "Thời gian làm việc và phát triển" },
];

const skills = ["React", "JavaScript", "Node.js", "MongoDB", "PHP", "Laravel", "Python"];

const techStack = [
  {
    category: "Front-End",
    techs: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vite", icon: "https://vitejs.dev/logo.svg" },
    ]
  },
  {
    category: "Back-End & API",
    techs: [
      { name: "Node JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ]
  },
  {
    category: "Database Layer",
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ]
  },
  {
    category: "Công Cụ & Server",
    techs: [
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ]
  }
];

const projects = [
  {
    id: 1,
    title: "Nghuy.vn",
    description: "Portfolio cá nhân và blog công nghệ. Thiết kế mang đậm phong cách tối giản và khẳng định bản sắc.",
    extendedDescription: "Một nơi để phản chiếu tư duy thiết kế tối giản và sự kỷ luật trong nghiệp lập trình của tôi.",
    tags: ["Profile", "UI/UX", "Minimalist"],
    image: "Images/image.png",
    liveUrl: "https://nghuy.vn",
    status: "Hoạt động",
    color: "#F43F5E",
    span: 2,
  },
  {
    id: 2,
    title: "Subgiasale.vn",
    description: "Trang hỗ trợ phân phối dịch vụ tiện ích truyền thông mạng xã hội giá rẻ.",
    extendedDescription: "Trang hỗ trợ phân phối dịch vụ tiện ích truyền thông mạng xã hội giá rẻ. Hệ thống xử lý tự động với tốc độ cao.",
    tags: ["SMM", "Automate", "Tốc độ"],
    image: "Images/image.png",
    liveUrl: "https://subgiasale.vn",
    status: "Hoạt động",
    color: "#10B981",
    span: 1,
  },
  {
    id: 3,
    title: "Gachthevip.vn",
    description: "Dấu ấn tự học Backend với hệ thống xử lý gạch thẻ tốc độ cao.",
    extendedDescription: "Cổng thanh toán tự động xử lý giao dịch điện tử với tốc độ và độ tin cậy được thiết kế tối ưu.",
    tags: ["Payment", "Integrations", "API"],
    image: "Images/image.png",
    liveUrl: "https://gachthevip.vn",
    status: "Hoạt động",
    color: "#F59E0B",
    span: 1,
  },
  {
    id: 4,
    title: "Submxh.vn",
    description: "Chiếc web quản lý phân phối dịch vụ tương tác MXH hoàn toàn tự động.",
    extendedDescription: "Giải pháp cho việc quản lý hàng chục ngàn luồng dữ liệu song song và chia sẻ tác vụ mạng xã hội.",
    tags: ["Automation", "Dashboard", "System"],
    image: "Images/image copy.png",
    liveUrl: "https://submxh.vn",
    status: "Bảo trì",
    color: "#8B5CF6",
    span: 1,
  },
  {
    id: 5,
    title: "Gachcard.vn",
    description: "Giải pháp quy đổi thẻ cào với luồng dữ liệu an toàn và hiện đại.",
    extendedDescription: "Hệ thống gateway đổi thẻ trực tuyến kết nối thẳng vào hệ thống đối tác viễn thông.",
    tags: ["System", "Gateway", "Security"],
    image: "Images/image.png",
    liveUrl: "https://gachcard.vn",
    status: "Hoạt động",
    color: "#EC4899",
    span: 1,
  },
  {
    id: 6,
    title: "Apimmo.vn",
    description: "Cổng chia sẻ kết nối API cho một vài ứng dụng web cơ bản. Tinh gọn và ổn định.",
    extendedDescription: "Kiến trúc API trung tâm xử lý dữ liệu và chia sẻ các route cho những hệ thống vệ tinh.",
    tags: ["API Routes", "Data Flow", "Core"],
    image: "Images/image copy.png",
    liveUrl: "https://apimmo.vn",
    status: "Hoạt động",
    color: "#06B6D4",
    span: 1,
  },
  {
    id: 7,
    title: "Cloudsale.vn",
    description: "Mô hình vận hành web bán hàng và quản lý server hỗ trợ người dùng - Tối đa hóa hiệu năng và mang lại tương tác mượt mà nhất.",
    extendedDescription: "Một nền tảng nơi tôi tự tay thiết kế lại cách thức cung cấp máy chủ đám mây tự động, định hình hạ tầng tinh gọn nhất. IaaS và PaaS.",
    tags: ["Server Setup", "Cloud Architecture", "IaaS/PaaS"],
    image: "Images/image.png",
    liveUrl: "https://cloudsale.vn",
    status: "Hoạt động",
    color: "#3B82F6",
    span: 2,
  }
];

const certificates = [
  {
    title: "Gemini Certified Student",
    level: "University",
    issuer: "Google for Education",
    issued: "20/02/2026",
    validUntil: "20/02/2029",
    recipient: "Nguyễn Ngọc Huy",
    url: "https://edu.google.accredible.com/c535899c-9797-42b9-9f77-35ca33a343e8#acc.0heOgyXV"
  },
];

const academic = {
  degree: "Software Engineer",
  major: "Kỹ Sư Phần Mềm",
  institution: "Phát Triển Độc Lập",
  period: "Hành Trình Kỷ Luật",
  timeline: [
    {
      id: "01",
      year: "Thiết Kế Kiến Trúc",
      title: "Thiết Kế Dữ Liệu Tận Gốc",
      focus: "Ngăn nắp từ gốc rễ",
      concepts: ["Database Design", "Sắp xếp thư mục", "Kiến trúc Backend"],
      stack: ["Thiết kế hệ thống", "Clean Architecture"],
      project: "Tôi yêu thích việc sắp xếp cấu trúc thư mục, thiết kế dữ liệu backend trước khi viết dòng code UI đầu tiên.",
      icon: "code"
    },
    {
      id: "02",
      year: "Trải Nghiệm Tối Giản",
      title: "Tư Duy Ít Là Nhiều",
      focus: "Loại bỏ sự rườm rà",
      concepts: ["Typography", "Khoảng trắng", "UI/UX Tối Giản"],
      stack: ["Thiết kế trắng đen", "Chọn lọc hiển thị"],
      project: "Thay vì lấp đầy màn hình với quá nhiều chi tiết, tôi học cách bỏ đi những thứ không cần thiết.",
      icon: "layers"
    },
    {
      id: "03",
      year: "Tự Động Hóa",
      title: "Tối Ưu Hóa & Tích Hợp",
      focus: "Giảm tải sức người",
      concepts: ["API Integration", "Background Jobs", "Quy trình nền"],
      stack: ["Tự động hóa kịch bản", "Xử lý hàng loạt"],
      project: "Mọi công việc lặp đi lặp lại đều xứng đáng được tự động hóa để tăng độ chính xác và tiết kiệm thời gian.",
      icon: "activity"
    }
  ]
};

const navLinks = [
  { label: "Trang Chủ", href: "#home" },
  { label: "Về Tôi", href: "#about" },
  { label: "Tư Duy", href: "#academic" },
  { label: "Dự Án", href: "#portfolio" },
  { label: "Kết Nối", href: "#contact" },
];

// ⚠️ QUAN TRỌNG: Thay YOUR_GEMINI_API_KEY bằng key thật của bạn
// Nhớ để repo là PRIVATE trước khi push lên GitHub!
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
