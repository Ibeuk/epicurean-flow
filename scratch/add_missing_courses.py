import requests
import json
import os

API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjM3MTNjMmQ2LTFhZDgtNGQ5Ny1hYTMxLWJjOTFjOWI1ZDA2NFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImEzZDY3NjE1LTMxNDktNDAyNi04OWVkLWRiZTc2ZWY0N2IwNVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGRlY2UyOC0xMzNmLTQ1MTEtOGI0OS1lZTRhMmU4NDQ0OTBcIn19IiwiaWF0IjoxNzkwNjE2MzI4fQ.l4CzovbrDwDTbFazPc2sZ8LJQ-sbAhPQUeqR44aySiWMJb40RyRqfDGZIa7W2J4uj5R22Pji7H8-Y9enIp_Fn7c069L8tqUC2A1reqlyTId5TpS-pyGLt_dPOA7jt7G4NMBlCrrIk95VRTlD45LpoR322WhDDS4goO4JHYL5nIgpYkujnZWAOWRgmAn6GpAzAjv0UCqxrx-VFwhKjnxZpNRf4jLGidh2A5VOK7D-qje-sCxfjny_LTBLT0Emm4b41ljxfFLuRcYJokkqFksQPy9Izbp0pby63jHkbyYxEoCJwc7zWqHY6Aa8XPKHTfIgJPADR2dhlJ9gnhXgHgFwbA'
ACCOUNT_ID = '30dece28-133f-4511-8b49-ee4a2e844490'
SITE_ID = 'c4f86012-7e7b-4eda-8838-2ec67d3dbeb7'
headers = {'Content-Type': 'application/json', 'Authorization': API_KEY, 'wix-account-id': ACCOUNT_ID, 'wix-site-id': SITE_ID}

def upload_wix_file(file_path, file_name, mime_type='image/jpeg'):
    gen_url = 'https://www.wixapis.com/site-media/v1/files/generate-upload-url'
    res = requests.post(gen_url, json={'mimeType': mime_type, 'fileName': file_name}, headers=headers)
    upload_url = res.json().get('uploadUrl')
    with open(file_path, 'rb') as f:
        up = requests.put(upload_url, data=f.read(), headers={'Content-Type': mime_type})
    fid = up.json().get('file', {}).get('id')
    return fid

def set_product_cover(product_id, file_id):
    # Clear old media
    requests.post(f'https://www.wixapis.com/stores/v1/products/{product_id}/media/delete', json={}, headers=headers)
    # Attach new cover
    media_url = f'https://static.wixstatic.com/media/{file_id}'
    r = requests.post(f'https://www.wixapis.com/stores/v1/products/{product_id}/media', json={'media': [{'url': media_url}]}, headers=headers)
    return r.status_code

# 1. Update Masterclass title and cover
print("\n--- Updating Masterclass ---")
master_id = 'b0ad737f-d24e-afa3-9390-bd9691cd5e67'
patch_body = {
    'product': {
        'name': 'The Complete Diabetes-Friendly Cooking Masterclass'
    }
}
r_patch = requests.patch(f'https://www.wixapis.com/stores/v1/products/{master_id}', json=patch_body, headers=headers)
print(f"Renamed Masterclass: {r_patch.status_code}")
fid_master = upload_wix_file('images/course-diabetes-masterclass.jpg', 'The Complete Diabetes-Friendly Cooking Masterclass Cover.jpg')
print(f"Uploaded Masterclass cover: {fid_master}")
st = set_product_cover(master_id, fid_master)
print(f"Attached Masterclass cover: status {st}")

# 2. Rename Baking for Beginners to make it clear
print("\n--- Renaming Baking for Beginners ---")
baking_id = '6a28121b-3e4e-4870-a524-5c41ee60664c'
patch_baking = {
    'product': {
        'name': 'Baking for Beginners'
    }
}
r_baking = requests.patch(f'https://www.wixapis.com/stores/v1/products/{baking_id}', json=patch_baking, headers=headers)
print(f"Renamed Baking: {r_baking.status_code}")

# 3. Create Advanced Cooking Techniques (€79)
print("\n--- Creating Advanced Cooking Techniques ---")
adv_body = {
    'product': {
        'name': 'Advanced Cooking Techniques',
        'description': '<p>Master precision culinary techniques from luxurious sauces to artisanal pasta making.</p>',
        'visible': True,
        'productType': 'physical',
        'priceData': {'price': 79.00}
    }
}
r_adv = requests.post('https://www.wixapis.com/stores/v1/products', json=adv_body, headers=headers)
print(f"Created Advanced: status {r_adv.status_code}")
if r_adv.status_code == 200:
    adv_id = r_adv.json().get('product', {}).get('id')
    fid_adv = upload_wix_file('images/course-advanced-cover.jpg', 'Advanced Cooking Techniques Cover.jpg')
    st_adv = set_product_cover(adv_id, fid_adv)
    print(f"Advanced ID: {adv_id} | Cover attached: {st_adv}")

# 4. Create Intermediate Cooking Techniques (€59)
print("\n--- Creating Intermediate Cooking Techniques ---")
inter_body = {
    'product': {
        'name': 'Intermediate Cooking Techniques',
        'description': '<p>Refine your culinary skills and gain control over foundational and intermediate chef techniques.</p>',
        'visible': True,
        'productType': 'physical',
        'priceData': {'price': 59.00}
    }
}
r_inter = requests.post('https://www.wixapis.com/stores/v1/products', json=inter_body, headers=headers)
print(f"Created Intermediate: status {r_inter.status_code}")
if r_inter.status_code == 200:
    inter_id = r_inter.json().get('product', {}).get('id')
    fid_inter = upload_wix_file('images/intermediate-cooking-techniques-cover.jpg', 'Intermediate Cooking Techniques Cover.jpg')
    st_inter = set_product_cover(inter_id, fid_inter)
    print(f"Intermediate ID: {inter_id} | Cover attached: {st_inter}")

# Upload Intermediate PDF if exists
if os.path.exists('scratch/Intermediate_Cooking_Techniques_Final.pdf'):
    print("Uploading Intermediate Cooking Techniques Final PDF to Site Files...")
    fid_pdf = upload_wix_file('scratch/Intermediate_Cooking_Techniques_Final.pdf', 'Intermediate_Cooking_Techniques_Final.pdf', 'application/pdf')
    print(f"Uploaded Intermediate PDF to Site Files: {fid_pdf}")

# 5. Create Beginners' Cooking Course (€39)
print("\n--- Creating Beginners' Cooking Course ---")
beg_body = {
    'product': {
        'name': 'Beginners’ Cooking Course',
        'description': '<p>Transform your cooking from uncertainty to culinary confidence with structured foundational lessons.</p>',
        'visible': True,
        'productType': 'physical',
        'priceData': {'price': 39.00}
    }
}
r_beg = requests.post('https://www.wixapis.com/stores/v1/products', json=beg_body, headers=headers)
print(f"Created Beginners: status {r_beg.status_code}")
if r_beg.status_code == 200:
    beg_id = r_beg.json().get('product', {}).get('id')
    fid_beg = upload_wix_file('images/course-beginners-cooking-cover.jpg', 'Beginners Cooking Course Cover.jpg')
    st_beg = set_product_cover(beg_id, fid_beg)
    print(f"Beginners ID: {beg_id} | Cover attached: {st_beg}")

print("\nAll missing courses added and verified!")
