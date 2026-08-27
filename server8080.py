import http.server
import socketserver

class UTF8Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        ct = self.headers.get('Content-Type', '')
        if 'charset' not in ct.lower():
            self.send_header('Content-Type', ct + '; charset=utf-8')
        super().end_headers()

PORT = 8080
with socketserver.TCPServer(('', PORT), UTF8Handler) as httpd:
    print(f'Serving at http://localhost:{PORT}')
    httpd.serve_forever()
