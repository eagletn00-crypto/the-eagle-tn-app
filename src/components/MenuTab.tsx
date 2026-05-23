import React from 'react';

const MenuTab = ({ items, onToggle }: { items: any[], onToggle: (id: string) => void }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">قائمة الطعام</h2>
      {/* تأكد من أن أي وسم تفتحه هنا تغلقه مباشرة */}
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default MenuTab;
