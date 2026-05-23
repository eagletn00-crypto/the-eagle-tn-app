export interface OrderData {
  items: any[];
  totalPrice: number;
  currencySymbol: string;
}

export const sendOrderToTelegram = async (data: OrderData): Promise<boolean> => {
  try {
    // ضع كود الإرسال الخاص بك هنا (مثل fetch أو axios)
    console.log("Sending to Telegram:", data);
    return true; 
  } catch (error) {
    console.error("Telegram service error:", error);
    return false;
  }
};
