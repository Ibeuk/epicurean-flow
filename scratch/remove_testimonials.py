with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if 'id="testimonials"' in line:
        skip = True
        # also remove the comment header right before it if present
        if new_lines and 'TRANSFORMATION STORIES' in new_lines[-1] or 'SECTION 10' in new_lines[-1]:
            while new_lines and ('===' in new_lines[-1] or 'SECTION 10' in new_lines[-1] or 'TRANSFORMATION STORIES' in new_lines[-1] or '<!--' in new_lines[-1]):
                new_lines.pop()
        continue
    if skip:
        if 'id="limited-offer"' in line:
            skip = False
            new_lines.append(line)
        continue
    new_lines.append(line)

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("Successfully removed testimonials section!")
