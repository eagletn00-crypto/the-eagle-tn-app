import React from 'react';

// تأكد من أن الـ props تطابق ما تستخدمه في DashboardPage.tsx
const MenuTab = ({ items, onToggle }: { items: any[], onToggle: (id: string) => void }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">قائمة الطعام</h2>
      {items.length === 0 ? (
        < القائمة حالياً.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-2 border-b">
              <span>{item.name}</span>
              <button 
                onClick={() => onToggle(item.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                تغيير الحالة
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuTab;
