/**
 * Telegram Bot Service
 * Handles sending cart order notifications to Telegram
 */

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode: 'HTML' | 'Markdown' | 'MarkdownV2';
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  totalPrice: number;
  currencySymbol: string;
  customerInfo?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

/**
 * Format cart items for Telegram message
 */
const formatCartItems = (items: CartItem[]): string => {
  return items
    .map(
      (item) =>
        `• <b>${item.name}</b>\n  Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`
    )
    .join('\n\n');
};

/**
 * Create a professional formatted Telegram message
 */
const createOrderMessage = (orderData: OrderData): string => {
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  let message = `
<b>🍽️ NEW ORDER RECEIVED</b>
━━━━━━━━━━━━━━━━━━━━

<b>📋 Order Details:</b>
⏰ Time: ${timestamp}

<b>📦 Items:</b>
${formatCartItems(orderData.items)}

━━━━━━━━━━━━━━━━━━━━
<b>💰 Order Summary:</b>
Total Items: ${orderData.items.reduce((sum, item) => sum + item.quantity, 0)}
<b>Total Amount: ${orderData.totalPrice.toFixed(3)} ${orderData.currencySymbol}</b>
`;

  if (orderData.customerInfo) {
    message += `
━━━━━━━━━━━━━━━━━━━━
<b>👤 Customer Information:</b>`;
    if (orderData.customerInfo.name) {
      message += `\nName: ${orderData.customerInfo.name}`;
    }
    if (orderData.customerInfo.phone) {
      message += `\nPhone: ${orderData.customerInfo.phone}`;
    }
    if (orderData.customerInfo.address) {
      message += `\nAddress: ${orderData.customerInfo.address}`;
    }
  }

  message += `
━━━━━━━━━━━━━━━━━━━━
✅ Status: Pending Confirmation`;

  return message;
};

/**
 * Send order to Telegram Bot
 */
export const sendOrderToTelegram = async (orderData: OrderData): Promise<boolean> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // Validation
  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is not configured');
    console.warn('Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file');
    return false;
  }

  try {
    const message = createOrderMessage(orderData);
    const telegramPayload: TelegramMessage = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    };

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Order sent to Telegram successfully:', result.result.message_id);
    return true;
  } catch (error) {
    console.error('Failed to send order to Telegram:', error);
    return false;
  }
};

/**
 * Send test message to Telegram (for debugging)
 */
export const sendTestMessage = async (): Promise<boolean> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is not configured');
    return false;
  }

  try {
    const testMessage = `
<b>🧪 TEST MESSAGE</b>
━━━━━━━━━━━━━━━━━━━━
<b>Eagle.TN Restaurant Bot</b>

✅ Bot connection is working!
⏰ Time: ${new Date().toLocaleString()}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: testMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram Test Error:', errorData);
      return false;
    }

    console.log('Test message sent successfully!');
    return true;
  } catch (error) {
    console.error('Failed to send test message:', error);
    return false;
  }
};
