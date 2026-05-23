import React from 'react';

const SettingsTab = ({ restaurant, onSave }: { restaurant: any, onSave: () => void }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الإعدادات</h2>
      <p>هنا يمكنك إدارة إعدادات المطعم.</p>
      {/* تأكد من إغلاق الـ div هنا */}
    </div>
  );
};

export default SettingsTab;
