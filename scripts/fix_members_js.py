import os

with open('js/members.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = '// MEMBER PORTAL MODAL'
end_marker = '// TOAST NOTIFICATIONS'

start_pos = text.find(start_marker)
# Find the line comment line before start_marker
start_pos = text.rfind('// ------------------------------------------------------------------------', 0, start_pos)
end_pos = text.rfind('// ------------------------------------------------------------------------', 0, text.find(end_marker))

print('Start pos:', start_pos)
print('End pos:', end_pos)
print('Snippet before start:\n', repr(text[start_pos-60:start_pos]))
print('Snippet before end:\n', repr(text[end_pos-60:end_pos]))
print('Snippet after end:\n', repr(text[end_pos:end_pos+80]))
