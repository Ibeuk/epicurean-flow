import os
import re

ROOT = r"c:\Users\ibe88\Downloads\Epicurean Flow"

def update_file(filename, updater_fn):
    filepath = os.path.join(ROOT, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = updater_fn(content)
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {filename}")
    else:
        print(f"No changes: {filename}")

# Unified Footer Contact Block HTML
UNIFIED_FOOTER_CONTACT = """          <div class="footer-contact-info" style="font-size: 0.875rem; color: rgba(245, 240, 231, 0.78); margin-top: 14px;">
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px; font-weight: 600;">Epicurean Flow</p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">Sierra Grazalema 23<br>29016 Málaga, Spain</p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">WhatsApp: <a href="https://wa.me/31618571677" style="color: var(--color-gold);">+ 31618571677</a></p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">Telephone Spain: <a href="tel:+34626617282" style="color: var(--color-gold);">+34626617282</a></p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 0;">Email: <a href="mailto:info@epicureanflow.com" style="color: var(--color-gold);">info@epicureanflow.com</a></p>
          </div>"""

print("Base helper defined.")
