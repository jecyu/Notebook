<!--
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-02-27 21:13:07
 * @LastEditTime: 2020-02-28 15:57:15
 * @LastEditors: Jecyu
 -->
# wireshark

[[toc]]

## Chapter 3. User Interface

3.1. Introduction
3.2. Start Wireshark
3.3. The Main window

Wireshark抓包和分析时的用户界面

Wireshark界面有五个主要组件：

- **命令菜单(command menus)**是位于窗口顶部的标准下拉菜单。我们现在感兴趣的是文件和捕获菜单。文件菜单允许您保存捕获的分组数据或打开先前捕获的分组数据的文件，并退出Wireshark应用程序。捕获菜单允许您开始分组捕获。

- **Wireshark界面的顶部是分组显示过滤器(packet display filter field)**，可以向其中输入协议名称或其他信息，以过滤分组列表窗口中显示的信息（分组首部窗口和分组内容窗口同理）。

- **分组列表窗口(packet-listing window)**为每个捕获的分组显示一行摘要，包括分组编号（由Wireshark分配；任何协议首部并不包含该编号），分组的时间，源地址和目的地址，协议类型以及分组中包含的协议特定信息。可以通过单击列名称或者其他类似栏目对分组列表进行排序。协议类型字段列出了发送或接收该分组的最高级协议，即作为该分组的源或最终接收的协议。

- **分组首部详细信息窗口(packet-header details window)**提供分组列表窗口中被选中（高亮显示）分组的详细信息。 （要在分组列表窗口中选择分组，请将光标放在分组列表窗口中的单行摘要中，然后单击鼠标左键。）这些细节包括有关以太网帧的信息（假定分组通过以太网接口发送/接收）和包含该分组的IP数据报。通过在分组详细信息窗口中单击以太网帧左侧的加减号框或IP数据报行，可以扩展或最小化显示的以太网和IP层详细信息。如果分组通过TCP或UDP传输，TCP或UDP的详细信息也将被显示，同样可以扩展或最小化。最后还提供了有关发送或接收此分组的最高级别协议的详细信息。

- **分组正文窗口(packet-contents window)以ASCII和十六进制格式显示捕获帧的全部内容。** 


### 3.3.1. Main Window Navigation

Wireshark抓包和分析时的用户界面

- The menu (see Section 3.4, “The Menu”) is used to start actions.
- The main toolbar (see Section 3.16, “The “Main” Toolbar”) provides quick access to frequently used items from the menu.
- The filter toolbar (see Section 3.17, “The “Filter” Toolbar”) allows users to set display filters to filter which packets are displayed (see Section 6.3, “Filtering Packets While Viewing”).
- The packet list pane (see Section 3.18, “The “Packet List” Pane”) displays a summary of each packet captured. By clicking on packets in this pane you control what is displayed in the other two panes.
- The packet details pane (see Section 3.19, “The “Packet Details” Pane”) displays the packet selected in the packet list pane in more detail.
- The packet bytes pane (see Section 3.20, “The “Packet Bytes” Pane”) displays the data from the packet selected in the packet list pane, and highlights the field selected in the packet details pane.
- The statusbar (see Section 3.21, “The Statusbar”) shows some detailed information about the current program state and the captured data.

### 3.4. The Menu

- File
- Edit
- View
- Go
- Capture
- Aanalyze
- Statistics
- Telephony
- Wireless
- Tools
- Help

### 3.5. The “File” Menu

3.6. The “Edit” Menu
3.7. The “View” Menu
3.8. The “Go” Menu
3.9. The “Capture” Menu
3.10. The “Analyze” Menu
3.11. The “Statistics” Menu
3.12. The “Telephony” Menu
3.13. The “Wireless” Menu
3.14. The “Tools” Menu
3.15. The “Help” Menu
3.16. The “Main” Toolbar
3.17. The “Filter” Toolbar
3.18. The “Packet List” Pane
3.19. The “Packet Details” Pane
3.20. The “Packet Bytes” Pane
3.21. The Statusbar

## 实验

### 用 Wireshark 做一次运行测试

## FQA

### wireshark 无法抓包

1. 排查接口是否选择正确，例如 wifi 、以太网。还有要注意 vpn 的影响。

## 参考资料

- [wireShark 官方文档](https://www.wireshark.org/docs/wsug_html_chunked/ChUseMainWindowSection.html)
- [《Wireshark实验 》](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-Intro/Wireshark%E5%AE%9E%E9%AA%8C-Intro.md)