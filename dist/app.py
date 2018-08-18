import zmq
import sys
import os
import argparse
from zmq.eventloop.zmqstream import ZMQStream
from zmq.eventloop import ioloop
ioloop.install()

from tornado.websocket import WebSocketHandler
from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop

static_path = sys.path[0] + '/static'
print(static_path)
default_socket_port = 5560
default_http_port = 8888

class ZMQPair:
    def __init__(self,callback,socket_port):
        self.callback = callback
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PAIR)
        self.socket.bind('tcp://127.0.0.1:{}'.format(socket_port))
        self.stream = ZMQStream(self.socket)
        self.stream.on_recv(self.callback)

class WSHandler(WebSocketHandler):
    def initialize(self,socket_port=default_socket_port):
        self.socket_port = socket_port

    def open(self):
        print('initializing zmq socket on {}'.format(self.socket_port))
        self.pair = ZMQPair(self.on_data,self.socket_port)
        print('connection initialized')

    def on_message(self,message):
        print(message)
        self.pair.socket.send_string(message)

    def on_close(self):
        self.pair.socket.close()
        print('connection closed')

    def on_data(self,data):
        self.write_message(data[0])

    def check_origin(self,origin):
        return True

class MainHandler(RequestHandler):
    def get(self):
        self.render('index.html')

def get_application(socket_port):
    application = Application([
        (r'/',MainHandler),
        (r'/static/(.*)', StaticFileHandler, {'path':static_path}),
        (r'/ws',WSHandler,{'socket_port':socket_port}),
    ])
    return application

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--socket-port',type=int,default=default_socket_port,
            help='port to use for zmq socket')
    parser.add_argument('--http-port',type=int,default=default_http_port,
            help='port to use for serving frontend')
    args = parser.parse_args()
    print('Using {} as zmq port and {} as frontend port'.format(args.socket_port,args.http_port))

    application=get_application(args.socket_port)
    application.listen(args.http_port)
    IOLoop.instance().start()
