import urllib.request
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
        'key': 'diabetes_masterclass',
        'productName': 'Diabetes Cooking Course Masterclass',
        'productId': 'b0ad737f-d24e-afa3-9390-bd9691cd5e67',
        'price': 89.0,
        'fileName': 'Diabetes_Cooking_Masterclass_Course_Revised.pdf',
        'filePath': 'scratch/adobe_downloads/Diabetes_Cooking_Masterclass_Course_Revised.pdf'
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
    }
]

uploaded_results = []

for item in files_to_upload:
    file_path = item['filePath']
    file_name = item['fileName']
    file_size = os.path.getsize(file_path)
    print(f"\n--- Processing {item['productName']} ({file_name}, {file_size / (1024*1024):.2f} MB) ---")

    # Step 1: Request upload URL from Wix Media
    gen_url = 'https://www.wixapis.com/site-media/v1/files/generate-upload-url'
    body = {'mimeType': 'application/pdf', 'fileName': file_name}
    req = urllib.request.Request(gen_url, data=json.dumps(body).encode('utf-8'), headers=headers)
    
    try:
        with urllib.request.urlopen(req) as res:
            res_data = json.loads(res.read().decode('utf-8'))
            upload_url = res_data.get('uploadUrl')
            print(f"Generated upload URL successfully.")
    except Exception as e:
        print(f"Error generating upload URL for {file_name}: {e}")
        continue

    # Step 2: PUT file binary to uploadUrl
    print(f"Uploading file bytes to Wix Media...")
    with open(file_path, 'rb') as f:
        file_bytes = f.read()

    up_req = urllib.request.Request(upload_url, data=file_bytes, headers={'Content-Type': 'application/pdf'}, method='PUT')
    try:
        with urllib.request.urlopen(up_req) as up_res:
            up_data = json.loads(up_res.read().decode('utf-8'))
            file_obj = up_data.get('file', {})
            file_id = file_obj.get('id')
            file_url = file_obj.get('url')
            print(f"Uploaded successfully! Wix File ID: {file_id}")
            print(f"Wix Media URL: {file_url}")
            item['wixFileId'] = file_id
            item['wixMediaUrl'] = file_url
            uploaded_results.append(item)
    except Exception as e:
        print(f"Error uploading file bytes for {file_name}: {e}")

    # Step 3: If productId exists, update price in Wix Stores
    if item['productId']:
        patch_url = f"https://www.wixapis.com/stores/v1/products/{item['productId']}"
        patch_body = {
            'product': {
                'priceData': {
                    'price': item['price']
                }
            }
        }
        patch_req = urllib.request.Request(patch_url, data=json.dumps(patch_body).encode('utf-8'), headers=headers, method='PATCH')
        try:
            with urllib.request.urlopen(patch_req) as patch_res:
                print(f"Updated product price to EUR {item['price']} (Status {patch_res.status})")
        except Exception as e:
            print(f"Error updating price for product {item['productId']}: {e}")

with open('scratch/uploaded_wix_files.json', 'w', encoding='utf-8') as f:
    json.dump(uploaded_results, f, indent=2)

print("\n=== UPLOAD SUMMARY ===")
print(f"Total uploaded files: {len(uploaded_results)} / {len(files_to_upload)}")
for r in uploaded_results:
    print(f"Product: {r['productName']}")
    print(f"  Price: EUR {r['price']}")
    print(f"  File ID: {r.get('wixFileId')}")
    print(f"  Media URL: {r.get('wixMediaUrl')}")
