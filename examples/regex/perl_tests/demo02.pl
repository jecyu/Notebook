#!/usr/bin/perl
# 华氏温度与摄氏温度转换程序
print "Enter a temperature (e.g., 32F, 100C):\n";
$input = <STDIN>; # 从用户处接受一个输入
chomp($input); #  去掉文本末尾的换行符

if($input =~ m/^([-+]?[0-9]+)([CF])$/) { 
  # 如果程序运行到此，则已经匹配。$1 保存数字，$2 保存 “C” 或者 “F”
  $InputNum = $1; # 把数据保存到已命名变量中...
  $type = $2; # ...保证程序清晰易懂

  if ($type eq "C") { # eq 测试两个字符串是否相等
    # 输入为摄氏温度，则计算华氏温度
    $celsius = $InputNum;
    $fahrenheit = ($celsius * 9 / 5) + 32; # 计算华氏温度
  } else {
    # 如果不是 “C“，则必然是 “F”，计算摄氏温度
    $fahrenheit = $InputNum;
    $celsius = ($fahrenheit - 32) * 5 / 9;
  }
  # 现在得到了两个温度值，显示结果
  printf "%.2f C is %.2f F\n", $celsius, $fahrenheit;
} else {
  print "Expecting a number followed by \"C \" or \"F\", \n";
  print "so I don't understand \"$input\".\n";
}
