import requests
import json
import os
import sys

API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjM3MTNjMmQ2LTFhZDgtNGQ5Ny1hYTMxLWJjOTFjOWI1ZDA2NFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImEzZDY3NjE1LTMxNDktNDAyNi04OWVkLWRiZTc2ZWY0N2IwNVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGRlY2UyOC0xMzNmLTQ1MTEtOGI0OS1lZTRhMmU4NDQ0OTBcIn19IiwiaWF0IjoxNzkwNjE2MzI4fQ.l4CzovbrDwDTbFazPc2sZ8LJQ-sbAhPQUeqR44aySiWMJb40RyRqfDGZIa7W2J4uj5R22Pji7H8-Y9enIp_Fn7c069L8tqUC2A1reqlyTId5TpS-pyGLt_dPOA7jt7G4NMBlCrrIk95VRTlD45LpoR322WhDDS4goO4JHYL5nIgpYkujnZWAOWRgmAn6GpAzAjv0UCqxrx-VFwhKjnxZpNRf4jLGidh2A5VOK7D-qje-sCxfjny_LTBLT0Emm4b41ljxfFLuRcYJokkqFksQPy9Izbp0pby63jHkbyYxEoCJwc7zWqHY6Aa8XPKHTfIgJPADR2dhlJ9gnhXgHgFwbA'
ACCOUNT_ID = '30dece28-133f-4511-8b49-ee4a2e844490'
SITE_ID = 'c4f86012-7e7b-4eda-8838-2ec67d3dbeb7'

headers = {
    'Content-Type': 'application/json',
    'Authorization': API_KEY,
    'wix-account-id': ACCOUNT_ID,
    'wix-site-id': SITE_ID
}

files_to_upload = [
    {
        'key': 'diabetes_course',
        'productName': 'Diabetes Cooking Course',
        'productId': '160f5527-13c1-9ef9-3e2e-1b0f07a94abb',
        'price': 49.0,
        'fileName': 'Diabetes_Cooking_Course_Regular_Version_Corrected.pdf',
        'filePath': 'scratch/adobe_downloads/Diabetes_Cooking_Course_Regular_Version_Corrected.pdf'
    },
    {
        'key': 'symphony_flavors',
        'productName': 'A Symphony of Flavors: Mediterranean & Middle Eastern Spice Essentials',
        'productId': '58c9b3a6-c50b-52d8-67f7-e2b1adf793de',
        'price': 16.95,
        'fileName': 'A_Symphony_of_Flavors_Final.pdf',
        'filePath': 'scratch/adobe_downloads/A_Symphony_of_Flavors_Final.pdf'
    },
    {
        'key': 'thanksgiving_guide',
        'productName': 'Stress-Free Thanksgiving: A Complete Cooking Guide',
        'productId': None,
        'price': 14.95,
        'fileName': 'Stress_Free_Thanksgiving_Premium_Guide_Final_Contrast_Corrected_Interactive.pdf',
        'filePath': 'scratch/adobe_downloads/Stress_Free_Thanksgiving_Premium_Guide_Final_Contrast_Corrected_Interactive.pdf'
    },
    {
        'key': 'baking_beginners',
        'productName': 'Epicurean Flow: Baking for Beginners',
        'productId': None,
        'price': 39.0,
        'fileName': 'Epicurean_Flow_Baking_for_Beginners_Publication_Ready-1-1.pdf',
        'filePath': 'scratch/adobe_downloads/Epicurean_Flow_Baking_for_Beginners_Publication_Ready-1-1.pdf'
    },
    {
        'key': 'diabetes_masterclass',
        'productName': 'Diabetes Cooking Course Masterclass',
        'productId': 'b0ad737f-d24e-afa3-9390-bd9691cd5e67',
        'price': 89.0,
        'fileName': 'Diabetes_Cooking_Masterclass_Course_Revised.pdf',
        'filePath': 'scratch/adobe_downloads/Diabetes_Cooking_Masterclass_Course_Revised.pdf'
    }
]

uploaded_results = []

for item in files_to_upload:
    file_path = item['filePath']
    file_name = item['fileName']
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    print(f"\n[START] {item['productName']} ({file_name}, {file_size_mb:.2f} MB)", flush=True)

    # Step 1: Request upload URL
    gen_url = 'https://www.wixapis.com/site-media/v1/files/generate-upload-url'
    res = requests.post(gen_url, json={'mimeType': 'application/pdf', 'fileName': file_name}, headers=headers, timeout=30)
    if res.status_code != 200:
        print(f"Failed to generate upload URL: {res.status_code} {res.text}", flush=True)
        continue
    upload_url = res.json().get('uploadUrl')
    print("Upload URL received. Streaming file...", flush=True)

    # Step 2: PUT file
    with open(file_path, 'rb') as f:
        up_res = requests.put(upload_url, data=f, headers={'Content-Type': 'application/pdf'}, timeout=300)
    
    if up_res.status_code == 200:
        data = up_res.json()
        file_obj = data.get('file', {})
        item['wixFileId'] = file_obj.get('id')
        item['wixMediaUrl'] = file_obj.get('url')
        print(f"Uploaded! Wix File ID: {item['wixFileId']}", flush=True)
        uploaded_results.append(item)
    else:
        print(f"Upload failed: {up_res.status_code} {up_res.text}", flush=True)

    # Step 3: Update price if productId exists
    if item['productId']:
        patch_url = f"https://www.wixapis.com/stores/v1/products/{item['productId']}"
        patch_res = requests.patch(patch_url, json={'product': {'priceData': {'price': item['price']}}}, headers=headers, timeout=30)
        print(f"Price updated to EUR {item['price']} (Status {patch_res.status_code})", flush=True)

with open('scratch/uploaded_wix_files.json', 'w', encoding='utf-8') as f:
    json.dump(uploaded_results, f, indent=2)

print(f"\n[DONE] Successfully uploaded {len(uploaded_results)} / {len(files_to_upload)} files.", flush=True)
