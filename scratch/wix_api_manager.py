import urllib.request
import json
import os

API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjM3MTNjMmQ2LTFhZDgtNGQ5Ny1hYTMxLWJjOTFjOWI1ZDA2NFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImEzZDY3NjE1LTMxNDktNDAyNi04OWVkLWRiZTc2ZWY0N2IwNVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGRlY2UyOC0xMzNmLTQ1MTEtOGI0OS1lZTRhMmU4NDQ0OTBcIn19IiwiaWF0IjoxNzkwNjE2MzI4fQ.l4CzovbrDwDTbFazPc2sZ8LJQ-sbAhPQUeqR44aySiWMJb40RyRqfDGZIa7W2J4uj5R22Pji7H8-Y9enIp_Fn7c069L8tqUC2A1reqlyTId5TpS-pyGLt_dPOA7jt7G4NMBlCrrIk95VRTlD45LpoR322WhDDS4goO4JHYL5nIgpYkujnZWAOWRgmAn6GpAzAjv0UCqxrx-VFwhKjnxZpNRf4jLGidh2A5VOK7D-qje-sCxfjny_LTBLT0Emm4b41ljxfFLuRcYJokkqFksQPy9Izbp0pby63jHkbyYxEoCJwc7zWqHY6Aa8XPKHTfIgJPADR2dhlJ9gnhXgHgFwbA'
ACCOUNT_ID = '30dece28-133f-4511-8b49-ee4a2e844490'
SITE_ID = 'c4f86012-7e7b-4eda-8838-2ec67d3dbeb7'

headers = {
    'Content-Type': 'application/json',
    'Authorization': API_KEY,
    'wix-account-id': ACCOUNT_ID,
    'wix-site-id': SITE_ID
}

url = 'https://www.wixapis.com/stores/v1/products/query'
req = urllib.request.Request(url, data=json.dumps({'query': {'paging': {'limit': 50}}}).encode('utf-8'), headers=headers)

try:
    with urllib.request.urlopen(req) as res:
        print('Products query status:', res.status)
        data = json.loads(res.read().decode('utf-8'))
        products = data.get('products', [])
        print(f'Total products: {len(products)}')
        for p in products:
            p_id = p.get('id')
            p_name = p.get('name')
            p_type = p.get('productType')
            p_price = p.get('priceData', {}).get('formatted', {}).get('price')
            print(f'ID: {p_id} | Name: {p_name} | Type: {p_type} | Price: {p_price}')
        with open('scratch/live_wix_products.json', 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=2)
except urllib.error.HTTPError as e:
    print('HTTPError:', e.code, e.read().decode('utf-8'))
except Exception as e:
    print('Error:', e)
