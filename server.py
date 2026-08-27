import http.server
import socketserver

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        elif path.endswith('.css'):
            return 'text/css; charset=utf-8'
        elif path.endswith('.json'):
            return 'application/json; charset=utf-8'
        return super().guess_type(path)

PORT = 8080
with socketserver.TCPServer(('', PORT), MyHandler) as httpd:
    print(f'Serving at http://localhost:{PORT}')
    httpd.serve_forever()