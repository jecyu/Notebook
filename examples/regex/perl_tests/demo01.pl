#!/usr/bin/perl
# 运行命令 perl demo01.pl -w 
print "Enter a temperature in Celsius:\n";
$celsius = <STDIN>; # 从用户处接受一个输入
chomp($celsius); #  去掉 $celsius 后面的换行符

# if($celsius =~ m/^[0-9]+$/) {
if($celsius =~ m/^[-+]?[0-9]+(\.[0-9]*)?$/) { # 允许输入负数和可能出现的小数部分
  $fahrenheit = ($celsius * 9 / 5) + 32; # 计算华氏温度
  print "$celsius C is $fahrenheit F\n";
} else {
  print "Expecting a number, so I don't understand \"$celsius \".\n";
}
