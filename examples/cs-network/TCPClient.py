from socket import *
serverName = 'servername'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM) # 创建客户套接字 SOCK_STREAM 表面是 TCP 套接字
clientSocket.connect(serverName, serverPort) # 进行 TCP 连接
sentence = raw_input('Input lowercase sentence:') # 字符串 sentence 连续收集字符直到用户键入回撤以终止该行为为止
clientSocket.send(sentence) # 通过该客户的套接字并进入 TCP 连接发送字符串 sentence
modifiedSentence = clientSocket.recv(2048) # 等待接收来自服务器的字节
print 'From Server:' , modifiedSentence
clientSocket.close()

