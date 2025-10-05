'''
Business: Отправка заявок с сайта на email через SMTP
Args: event - dict с httpMethod, body (name, phone, message)
      context - объект с request_id
Returns: HTTP response с результатом отправки
'''

import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
        
        log_message = f'ЗАЯВКА | {datetime.now().strftime("%d.%m.%Y %H:%M")} | {name} | {phone} | {message}'
        print(log_message)
        
        smtp_host = os.environ.get('SMTP_HOST', '')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if not all([smtp_host, smtp_user, smtp_password]):
            print('SMTP настройки не заполнены - заявка сохранена в логах')
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Заявка принята! Мы свяжемся с вами в ближайшее время.'
                }),
                'isBase64Encoded': False
            }
        
        email_subject = f'Новая заявка с сайта от {name}'
        email_body = f'''Новая заявка с сайта ТЕХПРОММОНТАЖ

Дата и время: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}

Имя: {name}
Телефон: {phone}
Сообщение: {message}

---
Заявка отправлена автоматически с сайта
'''
        
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = 'mihail-dutchak@mail.ru'
        msg['Subject'] = email_subject
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        print(f'Email успешно отправлен на mihail-dutchak@mail.ru')
        
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
        error_log = f'ОШИБКА ОТПРАВКИ | {datetime.now().strftime("%d.%m.%Y %H:%M")} | {str(e)}'
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