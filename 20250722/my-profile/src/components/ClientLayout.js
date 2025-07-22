'use client';

import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
} 