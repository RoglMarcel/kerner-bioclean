from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
css = (root / 'style.css').read_text(encoding='utf-8')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{}:;,])\s*', r'\1', css).strip()
(root / 'style.min.css').write_text(css + '\n', encoding='utf-8')
# Keep newlines and all token spacing inside each line, including template literals.
# This conservative minifier removes only full-line comments and outer indentation.
js = (root / 'script.js').read_text(encoding='utf-8')
js = re.sub(r'^/\*[^\n]*\*/\n', '', js)
js = '\n'.join(line.strip() for line in js.splitlines() if line.strip() and not line.lstrip().startswith('//'))
(root / 'script.min.js').write_text(js + '\n', encoding='utf-8')
print('CSS:', (root/'style.css').stat().st_size, '->', (root/'style.min.css').stat().st_size)
print('JavaScript:', (root/'script.js').stat().st_size, '->', (root/'script.min.js').stat().st_size)
