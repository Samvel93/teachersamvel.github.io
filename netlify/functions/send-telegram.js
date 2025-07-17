const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Format message for Telegram
    let message = `🎓 *Новая заявка на урок!*\n\n`;
    message += `👤 *Имя:* ${data.name}\n`;
    message += `📞 *Контакт:* ${data.contact}\n`;
    
    if (data.goal) {
      const goals = {
        'conversation': 'Разговорная практика',
        'exam_ege': 'Подготовка к ЕГЭ',
        'exam_oge': 'Подготовка к ОГЭ',
        'business': 'Деловой английский',
        'travel': 'Английский для путешествий',
        'beginner': 'Изучение с нуля',
        'intermediate': 'Повышение уровня',
        'other': 'Другое'
      };
      message += `🎯 *Цель:* ${goals[data.goal]}\n`;
    }
    
    if (data.comment && data.comment.trim()) {
      message += `💬 *Комментарий:* ${data.comment}\n`;
    }
    
    message += `\n📅 *Время заявки:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Ho_Chi_Minh' })}`;
    
    // Telegram bot credentials (will be set as environment variables)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
    }
    
    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramData = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(telegramData)
      }
    };
    
    // Make the request to Telegram API
    const telegramResponse = await new Promise((resolve, reject) => {
      const req = https.request(telegramUrl, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.write(telegramData);
      req.end();
    });
    
    if (telegramResponse.statusCode === 200) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      };
    } else {
      throw new Error(`Telegram API error: ${telegramResponse.statusCode}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message 
      })
    };
  }
};