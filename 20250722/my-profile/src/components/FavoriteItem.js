'use client';

export default function FavoriteItem({ id, title, description, icon = "⭐" }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-105 relative overflow-hidden animate-slide-up">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* ID Badge */}
      <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
        #{id}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <span className="text-3xl mb-4 block group-hover:animate-bounce">
          {icon}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
} 