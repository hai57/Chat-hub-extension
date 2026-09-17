# 🚀 AI Chat Hub - Side Panel Copilot

> **AI Chat Hub** is a modern browser extension (Chrome Manifest V3) designed with a sleek **Dark Mode Side Panel** interface (inspired by _Sonsery Flow_). It empowers developers and power users to seamlessly connect, assign tab roles, inject system contexts, and perform quick actions across multiple AI chat platforms such as **DeepSeek, ChatGPT, Claude, Gemini**, and more.

---

## 🌐 Language Selector / Ngôn Ngữ

- 🇻🇳 [Tiếng Việt (Vietnamese)](#-tiếng-việt)
- 🇬🇧 [English](#-english)

---

## 🤖✨ Vibe Coding with AI (Phát Triển Bằng AI Agent)

Dự án này được xây dựng 100% theo tinh thần **Vibe Coding** — sự kết hợp nhịp nhàng giữa ý tưởng của người dùng và khả năng lập trình tự động của AI Agent (Google Antigravity / Gemini 3.6 Flash):

- **💡 Idea & UI Blueprint:** Người dùng chỉ cần nêu ý tưởng và gửi một tấm ảnh chụp màn hình mẫu giao diện (Sonsery Flow). AI tự động phân tích bố cục Card UI, tách các khối chức năng (`Quick Actions`, `Tab Role`, `Inject Context`, `Danger Zone`).
- **🏗 Architecture & Adapter Pattern:** AI tự động thiết kế mô hình **Adapter Pattern** hỗ trợ đa nền tảng AI web (`DeepSeekAdapter`, `ChatGPTAdapter`) để bóc tách DOM selector linh hoạt.
- **⚡ Automated Generation & Build:** AI tự tạo bộ khung Vite + React + TypeScript + TailwindCSS, tự động viết mã nguồn các components, xử lý messaging giữa Content Script - Service Worker - Side Panel, và chạy build thành công ra gói `dist` chỉ trong vài phút.

---

<a name="-tiếng-việt"></a>

# 🇻🇳 BẢN TIẾNG VIỆT

## 📸 1. Giao Diện & Mẫu Tham Khảo

![AI Chat Hub Side Panel Reference](link/.gemini/antigravity/brain/df11a3d6-2f8d-4bdc-815e-38da8566f9ef/.user_uploaded/media_1789609880391.jpg)

Giao diện Side Panel hiển thị ở lề phải trình duyệt, tự động nhận diện trang chat AI đang mở và phân chia chức năng theo khối Card trực quan.

---

## 🛠 2. Công Nghệ Sử Dụng

| Công Nghệ / Thư Viện                    | Phiên Bản  | Vai Trò & Lý Do Lựa Chọn                                                                                       |
| :-------------------------------------- | :--------: | :------------------------------------------------------------------------------------------------------------- |
| **Manifest V3 & Chrome Side Panel API** |     V3     | Chuẩn extension mới nhất của Chrome, hỗ trợ hiển thị lề Side Panel mượt mà không che khuất nội dung trang web. |
| **React 18**                            | `^18.2.0`  | Thư viện UI xây dựng giao diện dạng thẻ (Card UI) linh hoạt.                                                   |
| **TypeScript**                          |  `^5.2.2`  | Đảm bảo an toàn kiểu dữ liệu (Type Safety) cho các thông điệp truyền tin (Message Passing).                    |
| **TailwindCSS**                         |  `^3.4.1`  | Styling nhanh chóng với chủ đề Dark Mode chuyên nghiệp theo mẫu Sonsery Flow.                                  |
| **Vite 5 & `@crxjs/vite-plugin`**       |  `^5.1.6`  | Công cụ build siêu tốc, hỗ trợ Hot Module Replacement (HMR) cho Chrome Extension.                              |
| **Lucide React Icons**                  | `^0.344.0` | Bộ biểu tượng icon tối giản, sắc nét.                                                                          |
| **DOM Adapter Pattern Engine**          |   Custom   | Tự động trích xuất ô nhập liệu, nút Gửi và câu trả lời mới nhất của từng web AI.                               |

---

## ✨ 3. Các Chức Năng Chính

1. **Connected Status & Power Switch:** Tự động phát hiện trang AI web đang kết nối (`Connected: DeepSeek/ChatGPT`) và nút công tắc bật/tắt Power (`ON/OFF`).
2. **Automation Mode:** Bật/tắt chế độ tự động hóa luồng trao đổi giữa các tab AI.
3. **Quick Actions (Thao tác 1-Click):**
   - **Copy:** Sao chép câu trả lời mới nhất của AI vào Clipboard.
   - **Paste:** Lấy nội dung từ Clipboard dán vào khung chat AI mà không cần dùng chuột.
   - **Send:** Kích hoạt nút Gửi từ xa.
4. **Tab Role Management (Quản Lý Vai Trò Tab):** Gán nhãn vai trò (`Dev`, `Reviewer`, `Summary`) cho từng tab AI và nút chuyển đổi tab nhanh (`Switch to Dev`, `Switch to Reviewer`).
5. **Inject Context:** Chọn vai trò mẫu (Senior Dev, Code Reviewer, Summarizer, Translator...) và nhúng câu System Prompt vào ô chat với 1-Click.
6. **Prompt Library:** Quản lý, thêm mới, tìm kiếm và lưu trữ thư viện Prompt cá nhân.
7. **Danger Zone:** Nút màu đỏ xóa sạch Clipboard và nội dung tạm.

---

## 📥 4. Hướng Dẫn Cài Đặt Vào Chrome

1. Mở Google Chrome, truy cập: `chrome://extensions`.
2. Ở góc trên bên phải, bật công tắc **Chế độ dành cho nhà phát triển (Developer mode)** sang **ON**.
3. Click vào nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trên bên trái.
4. Chọn đường dẫn thư mục: `C:\dev_ank\chat-hub\dist`.
5. Mở [chat.deepseek.com](https://chat.deepseek.com) hoặc [chatgpt.com](https://chatgpt.com), click vào icon **AI Chat Hub** trên thanh công cụ để mở Side Panel!

---

<a name="-english"></a>

# 🇬🇧 ENGLISH VERSION

## 📸 1. Visual Reference & UI Overview

![AI Chat Hub Side Panel Reference](link/.gemini/antigravity/brain/df11a3d6-2f8d-4bdc-815e-38da8566f9ef/.user_uploaded/media_1789609880391.jpg)

The Side Panel docks neatly on the right margin of your browser window, automatically detecting active AI chat tabs and organizing controls into intuitive Card components.

---

## 🛠 2. Technology Stack

| Technology / Library                    |  Version   | Purpose & Rationale                                                                                      |
| :-------------------------------------- | :--------: | :------------------------------------------------------------------------------------------------------- |
| **Manifest V3 & Chrome Side Panel API** |     V3     | Modern extension architecture allowing smooth side panel overlay without breaking host site DOM layouts. |
| **React 18**                            | `^18.2.0`  | Flexible component framework for modular Card UI rendering.                                              |
| **TypeScript**                          |  `^5.2.2`  | Type-safe runtime message passing between Content Scripts, Service Worker, and Side Panel.               |
| **TailwindCSS**                         |  `^3.4.1`  | Utility-first styling for dark-themed Card components matching Sonsery Flow style.                       |
| **Vite 5 & `@crxjs/vite-plugin`**       |  `^5.1.6`  | Blazing-fast build tool with Hot Module Replacement (HMR) for extension bundles.                         |
| **Lucide React Icons**                  | `^0.344.0` | Clean, crisp UI icons (Power, Zap, Copy, Send, Syringe, Settings).                                       |
| **DOM Adapter Pattern Engine**          |   Custom   | Extensible architecture matching DOM selectors for DeepSeek, ChatGPT, Claude, and Gemini.                |

---

## ✨ 3. Key Features Breakdown

1. **Connected Status & Power Switch:** Auto-detects connected AI site (`Connected: DeepSeek` / `ChatGPT`) with an instant `ON/OFF` master toggle.
2. **Automation Mode:** Toggle switch for orchestrating multi-agent workflow loops between tabs.
3. **Quick Actions (1-Click Productivity):**
   - **Copy:** Instantly extracts and copies the latest AI response.
   - **Paste:** Inserts current clipboard text directly into the chat input area.
   - **Send:** Triggers the native Send button remotely.
4. **Tab Role Management:** Assign role tags (`Dev`, `Reviewer`, `Summary`) to active AI tabs with instant tab-switching buttons (`Switch to Dev`, `Switch to Reviewer`).
5. **Context Injection:** Select system personas (e.g., _Senior Fullstack Dev_, _Code Reviewer_, _Tech Translator_) and inject prompts directly into the AI chatbox.
6. **Prompt & Agent Library:** Full CRUD, search, and storage for custom prompt templates in `chrome.storage.local`.
7. **Danger Zone:** Instant reset button to clear clipboard and transient data.

---

## 📥 4. Installation Guide (Chrome / Edge)

1. Open Google Chrome and navigate to `chrome://extensions`.
2. In the top right corner, enable **Developer mode** (**ON**).
3. In the top left corner, click **Load unpacked**.
4. Browse to and select the built folder:
   ```text
   link\chat-hub\dist
   ```
5. Open [chat.deepseek.com](https://chat.deepseek.com) or [chatgpt.com](https://chatgpt.com), click the puzzle icon in Chrome toolbar, pin **AI Chat Hub**, and click to open the Side Panel!

---

## 🧑‍💻 Developer Setup & Commands

```bash
# Navigate to the project root
cd link\chat-hub

# Install dependencies
npm install

# Run hot-reloading development server
npm run dev

# Build production extension bundle to dist/
npm run build
```
