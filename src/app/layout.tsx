import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { VideoModalProvider } from "@/components/video-modal";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const display = localFont({
  src: "../fonts/Paperlogy-9Black.woff2",
  weight: "900",
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../fonts/Pretendard-SemiBold.woff2", weight: "600" },
    { path: "../fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../fonts/geist-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/geist-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — 이대건` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "이대건" }],
  keywords: ["모션그래픽", "모션그래픽 디자이너", "포트폴리오", "After Effects", "Unreal Engine", "키네틱 타이포그래피", "프로젝션매핑", "타이틀 시퀀스"],
  formatDetection: { email: false, telephone: false, address: false },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ko_KR", siteName: SITE_NAME, title: SITE_TITLE, description: SITE_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#111112", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* JS가 켜져 있을 때만 등장 애니메이션 시작 상태(숨김)를 쓴다 */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <VideoModalProvider>
          <a href="#main" className="skip">본문으로 건너뛰기</a>
          <Header />
          <main id="main">{children}</main>
        </VideoModalProvider>
      </body>
    </html>
  );
}
