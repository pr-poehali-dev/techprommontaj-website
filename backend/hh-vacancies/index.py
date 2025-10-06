"""
Business: Fetch job vacancies from HH.ru employer page
Args: event with httpMethod GET, queryStringParameters with employer_id
Returns: JSON array of vacancies with title, salary, location, url
"""

import json
import urllib.request
import urllib.error
from typing import Dict, Any, List
import re

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    employer_id = '12178128'
    
    try:
        api_url = f'https://api.hh.ru/vacancies?employer_id={employer_id}&area=2&per_page=20'
        
        req = urllib.request.Request(
            api_url,
            headers={'User-Agent': 'Mozilla/5.0 (compatible; VacancyFetcher/1.0)'}
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        vacancies: List[Dict[str, Any]] = []
        
        for item in data.get('items', []):
            salary_info = item.get('salary')
            salary_text = 'По договорённости'
            
            if salary_info:
                salary_from = salary_info.get('from')
                salary_to = salary_info.get('to')
                currency = salary_info.get('currency', 'RUB')
                currency_symbol = '₽' if currency == 'RUR' or currency == 'RUB' else currency
                
                if salary_from and salary_to:
                    salary_text = f'{salary_from:,} - {salary_to:,} {currency_symbol}'.replace(',', ' ')
                elif salary_from:
                    salary_text = f'от {salary_from:,} {currency_symbol}'.replace(',', ' ')
                elif salary_to:
                    salary_text = f'до {salary_to:,} {currency_symbol}'.replace(',', ' ')
            
            area_name = item.get('area', {}).get('name', 'Не указано')
            
            vacancy = {
                'id': item.get('id'),
                'title': item.get('name', 'Без названия'),
                'salary': salary_text,
                'location': area_name,
                'url': item.get('alternate_url', ''),
                'employer': item.get('employer', {}).get('name', 'ТехПромМонтаж'),
                'published': item.get('published_at', '')
            }
            
            vacancies.append(vacancy)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'vacancies': vacancies,
                'total': len(vacancies)
            }, ensure_ascii=False)
        }
    
    except urllib.error.HTTPError as e:
        return {
            'statusCode': e.code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'HH.ru API error: {e.code}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
