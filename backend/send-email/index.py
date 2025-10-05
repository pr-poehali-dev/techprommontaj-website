'''
Business: Отправка заявок с сайта через Telegram Bot API
Args: event - dict с httpMethod, body (name, phone, message)
      context - объект с request_id
Returns: HTTP response с результатом отправки
'''

import json
import urllib.request
import urllib.parse
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', 'Не указано')
        phone = body_data.get('phone', 'Не указан')
        message = body_data.get('message', 'Не указано')
        
        if not phone or phone == 'Не указан':
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Телефон обязателен'}),
                'isBase64Encoded': False
            }
        
        notification_text = f'''🔔 Новая заявка с сайта ТЕХПРОММОНТАЖ

📅 Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}

👤 Имя: {name}
📞 Телефон: {phone}
💬 Сообщение: {message}

---
Email: mihail-dutchak@mail.ru
'''
        
        log_message = f'ЗАЯВКА | {datetime.now().strftime("%d.%m.%Y %H:%M")} | {name} | {phone} | {message}'
        print(log_message)
        
        import os
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        
        if telegram_token and telegram_chat_id:
            telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
            data = urllib.parse.urlencode({
                'chat_id': telegram_chat_id,
                'text': notification_text,
                'parse_mode': 'HTML'
            }).encode()
            
            req = urllib.request.Request(telegram_url, data=data)
            with urllib.request.urlopen(req, timeout=10) as response:
                telegram_response = response.read()
                print(f'Telegram sent: {telegram_response.decode()}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно принята! Мы свяжемся с вами в ближайшее время.'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        error_log = f'ERROR | {datetime.now().strftime("%d.%m.%Y %H:%M")} | {str(e)}'
        print(error_log)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка принята! Мы обработаем её в ближайшее время.'
            }),
            'isBase64Encoded': False
        }
