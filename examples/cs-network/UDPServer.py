from socket import * # 该 socket 模块形成了在 Python 中所有网络通信的基础
serverName = 'hostname' # 使用主机名，将自动执行 DNS looup 从而得到 IP 地址
serverPort = 12000
serverSocket = socket(socket.AF_INET, socket.SOCK_DGRAM) # 创建服务器的套接字
serverSocket.bind('', serverPort) # 将端口号与服务器的套接字绑定（即分配）在一起
while true: 
  message, clientAddress = serverSocket.recvfrom(2048) # UDP Server 等待一个分组的到达，获取客户的端口号
  modifiedMessage = message.upper() # 转为大写的报文
  serverSocket.sendto(modifiedMessage, clientAddress) # 发送到该客户地址