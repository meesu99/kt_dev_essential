'use client';

export default function Footer() {
  const SocialLink = ({ href, icon, children, isExternal = false }) => (
    <a 
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      className="flex items-center gap-2 text-primary hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
    >
      <span className="text-lg">{icon}</span>
      {children}
    </a>
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <SocialLink href="mailto:kim.developer@email.com" icon="📧">
              이메일
            </SocialLink>
            <SocialLink href="https://github.com/kim-developer" icon="🐙" isExternal>
              GitHub
            </SocialLink>
            <SocialLink href="#" icon="💬">
              카카오톡
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/kim-developer" icon="💼" isExternal>
              LinkedIn
            </SocialLink>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-300 mb-6"></div>
          
          {/* Copyright */}
          <p className="text-gray-600 text-sm mb-4">
            © 2024 My Profile. All rights reserved.
          </p>
          
          {/* Tech Stack */}
          <p className="text-gray-500 text-xs italic flex items-center justify-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> using 
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold">
              Next.js & Tailwind CSS
            </span>
          </p>
          
          {/* Fun Element */}
          <div className="mt-6 text-2xl animate-bounce">
            🚀
          </div>
        </div>
      </div>
    </footer>
  );
} 