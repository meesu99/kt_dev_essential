'use client';

import FavoriteItem from './FavoriteItem';

export default function FavoriteList({ 
  title, 
  items = [], 
  icon = "📝",
  columns = "repeat(auto-fit, minmax(320px, 1fr))" 
}) {
  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-pulse">{icon}</span>
          <h2 className="text-2xl font-bold text-gray-800 gradient-text">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
            {items.length}개
          </span>
          <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">✨</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4 opacity-50">😔</div>
          <p className="text-gray-600 text-lg mb-2">
            아직 등록된 {title.toLowerCase()}이/가 없습니다.
          </p>
          <small className="text-gray-500">새로운 항목을 추가해보세요!</small>
        </div>
      ) : (
        <div 
          className="grid gap-6"
          style={{ gridTemplateColumns: columns }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FavoriteItem
                id={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon || "⭐"}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 