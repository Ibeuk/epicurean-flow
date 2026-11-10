with open('index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 'id="testimonials"' in line or 'id="limited-offer"' in line or 'id="faqs"' in line:
            print(f"{i+1}: {line.strip()[:80]}")
