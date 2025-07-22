import "./globals.css";
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: "My Profile",
  description: "개인 프로필 웹사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
