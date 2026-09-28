#!/usr/bin/env python3
"""
GATE CSE 2027 Training Platform - Local Dev Server
Serves the interactive portal and launches in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable caching for smooth local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    handler = CustomHandler
    
    # Try preferred port, fallback to alternatives if in use
    for port in [8080, 8081, 3000, 5000, 0]:
        try:
            with socketserver.TCPServer(("", port), handler) as httpd:
                actual_port = httpd.server_address[1]
                url = f"http://localhost:{actual_port}"
                print("=" * 60)
                print("  🚀 GATE CSE 2027 TRAINING PLATFORM")
                print("  Target Exam: GATE 2027 (CSE & IT)")
                print("  Start Date : October 1, 2026")
                print(f"  Live Server: {url}")
                print("=" * 60)
                print("Press Ctrl+C to stop the server.")
                
                # Launch browser automatically
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            if port == 0:
                print("Failed to bind to any available port.")
                sys.exit(1)
            continue

if __name__ == '__main__':
    run_server()
