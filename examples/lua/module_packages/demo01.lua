-- 定义一个名为 module 的模块
jecyuModule = {};

-- 定义一个常量
jecyuModule.constant = "这是一个常量"

-- 定义一个函数
function jecyuModule.func1()
  io.write("这是一个公有函数！\n")
end

local function func2()
  print("这是一个私有函数！")
end

function jecyuModule.func3()
  func2()
end

return jecyuModule;