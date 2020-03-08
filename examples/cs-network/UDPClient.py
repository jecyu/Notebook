from socket import * # 该 socket 模块形成了在 Python 中所有网络通信的基础
serverName = 'hostname' # 使用主机名，将自动执行 DNS looup 从而得到 IP 地址
serverPort = 12000
clientSocket = socket(socket.AF_INET, socket.SOCK_DGRAM) # 创建客户的套接字，第一个参数指示了地址蔟，AF_INET 指示底层网络使用 IPv4
message = raw_input('Input lowercase sentence:')
clientSocket.sendto(message, (serverName, serverPort)) # 向目的主机发送报文
modifiedMessage, serverAddress = clientSocket.recvfrom(2048) # 客户等待接收来 自服务器的数据
print modifiedMessage # 在用户显示器打印 modifiedMessage 
clientSocket.close() # 关闭该进程