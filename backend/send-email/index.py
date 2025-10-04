'''
Business: Отправка заявок с сайта на email
Args: event - dict с httpMethod, body (name, phone, message)
      context - объект с request_id
Returns: HTTP response с результатом отправки
'''

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
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
        
        # Валидация
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
        
        # Формирование email
        email_subject = f'Новая заявка с сайта от {name}'
        email_body = f'''
        Новая заявка с сайта ТЕХПРОММОНТАЖ
        
        Дата и время: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}
        
        Имя: {name}
        Телефон: {phone}
        Комментарий: {message}
        
        ---
        Заявка отправлена автоматически с сайта
        '''
        
        # Настройка SMTP (используем Gmail SMTP)
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        sender_email = 'noreply.tehprommontaj@gmail.com'
        receiver_email = 'mihail-dutchak@mail.ru'
        
        # Создание сообщения
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = email_subject
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        # Отправка через Gmail SMTP
        # Примечание: требуется пароль приложения Gmail в переменной окружения
        import os
        gmail_password = os.environ.get('EMAIL_SERVICE_API_KEY', '')
        
        if not gmail_password:
            # Если пароля нет - сохраняем в лог (временное решение)
            print(f'EMAIL LOG: {email_subject} | {name} | {phone} | {message}')
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заявка принята (сохранена в логах)'
                }),
                'isBase64Encoded': False
            }
        
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, gmail_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f'Error sending email: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Ошибка отправки заявки',
                'details': str(e)
            }),
            'isBase64Encoded': False
        }
