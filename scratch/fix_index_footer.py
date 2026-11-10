with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

bad_part = """          <li><a href="refund-policy.html">Refund Policy</a></li>
         <div class="footer-developer-bar" style="border-top: 1px solid rgba(245, 240, 231, 0.1); padding: 18px 0; text-align: center;">
        <span style="font-size: 0.8125rem; color: rgba(245, 240, 231, 0.65);">Website designed by <a href="https://ibtex.ibe88agwu.workers.dev/" target="_blank" rel="noopener" style="color: var(--color-gold, #c5a059); text-decoration: none;">IBTEX</a></span>
      </div>
          <span>Chat with Developer on WhatsApp</span>
        </a>
      </div>
    </div>
  </footer>"""

good_part = """          <li><a href="refund-policy.html">Refund Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="footer-developer-bar" style="border-top: 1px solid rgba(245, 240, 231, 0.1); padding: 18px 0; text-align: center;">
        <span style="font-size: 0.8125rem; color: rgba(245, 240, 231, 0.65);">Website designed by <a href="https://ibtex.ibe88agwu.workers.dev/" target="_blank" rel="noopener" style="color: var(--color-gold, #c5a059); text-decoration: none;">IBTEX</a></span>
      </div>
    </div>
  </footer>"""

if bad_part in content:
    content = content.replace(bad_part, good_part)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced bad footer in index.html")
else:
    print("bad_part not found directly, checking lines around footer...")
    # Find position of refund-policy.html
    idx = content.find('href="refund-policy.html">Refund Policy</a></li>')
    end_idx = content.find('<!-- Wix Authentic Member Sign Up')
    print("Found region:", repr(content[idx:end_idx]))
