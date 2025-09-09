Caffeine Tracker
=================

A tiny static web app to log coffee consumption and track daily caffeine toward a 400 mg limit.

Files added:
- `index.html` — main UI
- `style.css` — styling and progress visuals
- `script.js` — tracking logic, history, localStorage persistence

How to run (PowerShell):

Open `index.html` directly in your default browser:

```powershell
Start-Process .\index.html
```

Or serve with Python (if installed) and open http://localhost:8000:

```powershell
python -m http.server 8000; Start-Process http://localhost:8000
```

Behavior:
- Buttons for Espresso (60 mg), Americano (150 mg), Cappuccino (80 mg)
- Progress bar shows proximity to 400 mg; color changes as you approach/exceed the limit
- RESET button clears stored entries (asks for confirmation)
- Entries are saved in `localStorage` so reloads persist

Next ideas: add per-day grouping, editable entries, or export CSV.
