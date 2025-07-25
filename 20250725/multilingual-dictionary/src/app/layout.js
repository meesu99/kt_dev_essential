import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "다언어 사전 - 영어, 한국어, 일본어 학습",
  description: "영어, 한국어, 일본어 단어를 검색하고 학습할 수 있는 다언어 사전입니다. 오늘의 단어, 즐겨찾기, 퀴즈 기능을 제공합니다.",
  keywords: "사전, 영어, 한국어, 일본어, 단어학습, 어휘, 퀴즈",
  author: "Dictionary App",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
