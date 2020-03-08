from socket import *
serverPort = 12000
serveSocket = socket(AF_INET, SOCK_STREAM)
serveSocket.bind('', serverPort)# serverSocket 是我们的欢迎套接字（三次握手），在创建这扇欢迎之门后，我们将等待并聆听某个客户敲门 
serveSocket.listen(1) # 让服务器聆听来自客户的 TCP 连接请求，其中参数定义了请求连接的最大数（至少为1）
print 'The server is ready to receive'
while 1:
  connectionSocket, addr = serveSocket.accept() # 在服务器中创建了一个称为 connectionSocket 的新套接字，由这个特定的客户专用
  sentence = connectionSocket.recv(1024)
  capitalizedSentence = sentence.upper()
  connectionSocket.send(capitalizedSentence)
  connectionSocket.close()
