import requests
import json
import os

API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjM3MTNjMmQ2LTFhZDgtNGQ5Ny1hYTMxLWJjOTFjOWI1ZDA2NFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImEzZDY3NjE1LTMxNDktNDAyNi04OWVkLWRiZTc2ZWY0N2IwNVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGRlY2UyOC0xMzNmLTQ1MTEtOGI0OS1lZTRhMmU4NDQ0OTBcIn19IiwiaWF0IjoxNzkwNjE2MzI4fQ.l4CzovbrDwDTbFazPc2sZ8LJQ-sbAhPQUeqR44aySiWMJb40RyRqfDGZIa7W2J4uj5R22Pji7H8-Y9enIp_Fn7c069L8tqUC2A1reqlyTId5TpS-pyGLt_dPOA7jt7G4NMBlCrrIk95VRTlD45LpoR322WhDDS4goO4JHYL5nIgpYkujnZWAOWRgmAn6GpAzAjv0UCqxrx-VFwhKjnxZpNRf4jLGidh2A5VOK7D-qje-sCxfjny_LTBLT0Emm4b41ljxfFLuRcYJokkqFksQPy9Izbp0pby63jHkbyYxEoCJwc7zWqHY6Aa8XPKHTfIgJPADR2dhlJ9gnhXgHgFwbA'
ACCOUNT_ID = '30dece28-133f-4511-8b49-ee4a2e844490'
SITE_ID = 'c4f86012-7e7b-4eda-8838-2ec67d3dbeb7'
headers = {'Content-Type': 'application/json', 'Authorization': API_KEY, 'wix-account-id': ACCOUNT_ID, 'wix-site-id': SITE_ID}

updates = [
    {
        'productId': 'b0ad737f-d24e-afa3-9390-bd9691cd5e67',
        'productName': 'Diabetes Cooking Course Masterclass',
        'imgPath': 'images/diabetes_cooking_masterclass_course_revised-cover.jpg',
        'imgName': 'diabetes_cooking_masterclass_course_revised-cover.jpg'
    },
    {
        'productId': '58c9b3a6-c50b-52d8-67f7-e2b1adf793de',
        'productName': 'A Symphony of Flavors',
        'imgPath': 'images/symphony-flavors-cover.jpg',
        'imgName': 'symphony-flavors-cover.jpg'
    },
    {
        'productId': 'c5d1456f-fbc3-c9c5-f0fe-520b3f1ef401',
        'productName': 'Holiday Dinner / Table Collection Bundle',
        'imgPath': 'images/three-cookbooks-mockup.jpg',
        'imgName': 'holiday-bundle-cover.jpg'
    }
]

for item in updates:
    pid = item['productId']
    pname = item['productName']
    img_path = item['imgPath']
    img_name = item['imgName']
    print(f"\n=== Processing cover for {pname} ({pid}) ===")

    # 1. Request upload URL
    gen_url = 'https://www.wixapis.com/site-media/v1/files/generate-upload-url'
    gen_res = requests.post(gen_url, json={'mimeType': 'image/jpeg', 'fileName': img_name}, headers=headers)
    upload_url = gen_res.json().get('uploadUrl')

    # 2. Upload bytes
    with open(img_path, 'rb') as f:
        up_res = requests.put(upload_url, data=f.read(), headers={'Content-Type': 'image/jpeg'})
    
    file_id = up_res.json().get('file', {}).get('id')
    print(f"Uploaded to Wix Media: {file_id}")

    # 3. Clear old media from product
    del_res = requests.post(f'https://www.wixapis.com/stores/v1/products/{pid}/media/delete', json={}, headers=headers)
    print(f"Cleared old media: status {del_res.status_code}")

    # 4. Attach new cover
    media_url = f'https://static.wixstatic.com/media/{file_id}'
    add_res = requests.post(f'https://www.wixapis.com/stores/v1/products/{pid}/media', json={'media': [{'url': media_url}]}, headers=headers)
    print(f"Attached new cover: status {add_res.status_code}")

print("\nAll cover updates finished!")
