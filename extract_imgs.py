import re

html = open('scraped.html', encoding='utf-8').read()

# find all img tags
img_tags = re.findall(r'<img[^>]+>', html)

results = []
for tag in img_tags:
    src_match = re.search(r'src="([^"]+)"', tag)
    alt_match = re.search(r'alt="([^"]*)"', tag)
    
    if src_match and 'wixstatic.com/media' in src_match.group(1):
        src = src_match.group(1)
        alt = alt_match.group(1) if alt_match else 'NO_ALT'
        results.append(f"{alt} | {src}")

print('\n'.join(set(results)))
