#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8765  # If Firebase blocks this, allow http://localhost:8765/* in API key website restrictions.
ROOT = Path(__file__).resolve().parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/"
        print("Campus Cares Planner server running:")
        print(url)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()
