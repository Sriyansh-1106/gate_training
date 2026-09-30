#!/usr/bin/env python3
"""
GATE CSE 2027 Training Platform - Dedicated Local Server
Uses dedicated port 2027 (matching GATE 2027) to avoid any port conflicts
with other localhost projects (e.g. interview training on 8080).
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output encoding on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PREFERRED_PORTS = [2027, 2028, 2029, 8765, 0]
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

class GateServerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Enforce serving strictly from Gate Prep directory
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def end_headers(self):
        # Anti-cache headers to prevent mixing assets with any other apps
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(ROOT_DIR)
    
    for port in PREFERRED_PORTS:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            with socketserver.TCPServer(("", port), GateServerHandler) as httpd:
                actual_port = httpd.server_address[1]
                url = f"http://localhost:{actual_port}/index.html"
                print("=" * 65)
                print("   [+] GATE CSE 2027 INTERACTIVE TRAINING PLATFORM")
                print("   Target Exam: GATE 2027 (CSE & IT) | Prep Start: Oct 1, 2026")
                print(f"   Root Directory: {ROOT_DIR}")
                print(f"   Dedicated Portal URL: {url}")
                print("=" * 65)
                print("Press Ctrl+C to stop the server.")
                
                # Automatically open browser
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError as e:
            if port == 0:
                print(f"Failed to bind server: {e}")
                sys.exit(1)
            continue

if __name__ == '__main__':
    run_server()
