import zmq
import sys
import os
from zmq.eventloop.zmqstream import ZMQStream
from zmq.eventloop import ioloop
ioloop.install()

from tornado.websocket import WebSocketHandler
from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop

static_path = sys.path[0] + '/static'
print(static_path)

class ZMQPair:
    def __init__(self,callback):
        self.callback = callback
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PAIR)
        self.socket.bind('tcp://127.0.0.1:5560')
        self.stream = ZMQStream(self.socket)
        self.stream.on_recv(self.callback)

class WSHandler(WebSocketHandler):
    def open(self):
        self.pair = ZMQPair(self.on_data)
        print('connection initialized')

    def on_message(self,message):
        print(message)
        self.pair.socket.send_string(message)

    def on_close(self):
        print('connection closed')

    def on_data(self,data):
        self.write_message(data[0])

    def check_origin(self,origin):
        return True

class MainHandler(RequestHandler):
    def get(self):
        self.render('index.html')

application = Application([
    (r'/',MainHandler),
    (r'/static/(.*)', StaticFileHandler, {'path':static_path}),
    (r'/ws',WSHandler),
])
if __name__ == "__main__":
    application.listen(8888)
    IOLoop.instance().start()
