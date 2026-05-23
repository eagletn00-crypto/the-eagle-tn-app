import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendOrderToTelegram } from '../services/telegramService';

// تم حذف تعريفات الواجهات (Interfaces) التي كانت تسبب خطأ TS2345

export const FloatingCartBar = ({
  itemCount,
  totalPrice,
  onCheckout,
  isLoading = false,
  currencySymbol = 'DT',
  items = [],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // ... (باقي كود الـ useEffect كما هو)

  const handleCheckoutClick = async () => {
    try {
      setIsSendingToTelegram(true);

      // تمرير البيانات مباشرة دون فرض واجهة OrderData الصارمة
      const telegramSuccess = await sendOrderToTelegram({
        items: items,
        totalPrice: totalPrice,
        currencySymbol: currencySymbol || 'DT',
      });

      if (telegramSuccess) {
        setOrderSent(true);
        // ... (باقي كود النجاح)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingToTelegram(false);
    }
  };

  // ... (باقي كود الـ return كما هو)
};
