# 1. 从原始邮件的 header 中提取信息；
# 2. 生成回复邮件 header；
# 3. 打印原始邮件信息，行首用 '|>' 缩进

# 处理 header
while($line =<>) { # 每次读入一行数据
  if($line =~ m/^\s*$/) { # 第一个空行之前的信息是 header，之后的则是正文部分
    last; # 停止 while 循环内的处理，跳出循环
  }
  # 处理 header 信息
  if ($line =~ m/^Subject: (.*)/i) {
    $subject = $1;
  }
  if ($line =~ m/^Date: (.*)/i) {
    $date = $1;
  }
  if ($line =~ m/^Reply-To: (.*)/i) {
    $reply_address = $1;
  }
  if ($line =~ m/^From: (\S+) \(([^()]*)\)/i) {
    $reply_address = $1;
    $from_name = $2;
  }
}

print "To: $reply_address ($from_name)\n";
print "From: jfriedl\@regex.info (Jeffrey Friedl)\n";
print "Subject: Re: $subject\n";
print "\n"; # blank line to separate the header from message body.
print "On $date $from_name wrote:\n"

# while($line = < >) { # 编译错误，待排查
#   print "|> $line"
# }