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
from email.mime.image import MIMEImage
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
        
        gmail_user = os.environ.get('GMAIL_USER', 'Tehprommontaj@gmail.com')
        gmail_password = os.environ.get('GMAIL_PASSWORD', '')
        recipient_email = os.environ.get('MAIL_NAME', 'mihail-dutchak@mail.ru')
        
        if not gmail_password:
            print('Gmail пароль не настроен - заявка сохранена в логах')
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
        
        email_subject = f'🔔 Новая заявка с сайта от {name}'
        
        html_body = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }}
        .container {{ max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
        .header {{ background: linear-gradient(135deg, #1e40af 0%, #f97316 100%); padding: 30px; text-align: center; color: white; }}
        .header h1 {{ margin: 0; font-size: 28px; font-weight: bold; }}
        .header p {{ margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }}
        .content {{ padding: 30px; }}
        .info-row {{ margin: 20px 0; padding: 15px; background: #f8fafc; border-left: 4px solid #f97316; border-radius: 5px; }}
        .info-label {{ font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }}
        .info-value {{ font-size: 16px; color: #1e293b; font-weight: 600; }}
        .message-box {{ background: #fff7ed; border: 2px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 20px 0; }}
        .message-box .label {{ color: #c2410c; font-weight: 600; margin-bottom: 10px; }}
        .message-box .text {{ color: #431407; line-height: 1.6; }}
        .footer {{ background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; }}
        .badge {{ display: inline-block; background: #22c55e; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚙️ ТЕХПРОММОНТАЖ</h1>
            <p>Новая заявка с сайта</p>
            <span class="badge">Требует обработки</span>
        </div>
        
        <div class="content">
            <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
                📅 {datetime.now().strftime('%d.%m.%Y в %H:%M:%S')}
            </p>
            
            <div class="info-row">
                <div class="info-label">👤 Имя клиента</div>
                <div class="info-value">{name}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">📞 Телефон</div>
                <div class="info-value">{phone}</div>
            </div>
            
            <div class="message-box">
                <div class="label">💬 Сообщение от клиента:</div>
                <div class="text">{message if message != 'Не указано' else 'Сообщение не оставлено'}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #ecfccb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #3f6212; font-weight: 600;">⚡ Рекомендуем связаться с клиентом в течение 15 минут</p>
            </div>
        </div>
        
        <div class="footer">
            <p style="margin: 5px 0;">Автоматическая система уведомлений</p>
            <p style="margin: 5px 0;">ТЕХПРОММОНТАЖ © 2025</p>
        </div>
    </div>
</body>
</html>'''
        
        msg = MIMEMultipart('alternative')
        msg['From'] = gmail_user
        msg['To'] = recipient_email
        msg['Subject'] = email_subject
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))
        
        with smtplib.SMTP('smtp.gmail.com', 587, timeout=10) as server:
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.send_message(msg)
        
        print(f'Email успешно отправлен с {gmail_user} на {recipient_email}')
        
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