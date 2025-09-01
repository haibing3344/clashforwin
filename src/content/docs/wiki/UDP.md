---
title: UDP
description: UDP（User Datagram Protocol，用户数据报协议）是传输层的一种简单、无连接的通信协议，与TCP相比，UDP更轻量、低延迟，但不提供可靠的传输服务。UDP适用于对数据传输速度和效率要求较高、对可靠性要求较低的应用场景。
---
# UDP

UDP（User Datagram Protocol，用户数据报协议）是传输层的一种简单、无连接的通信协议，与[TCP](/wiki/tcp)相比，UDP更轻量、低延迟，但不提供可靠的传输服务。UDP适用于对数据传输速度和效率要求较高、对可靠性要求较低的应用场景。

## UDP 的特点

- **无连接**：UDP不需要建立连接即可发送数据报文（Datagram），减少了通信开销和延迟。
- **不可靠传输**：UDP不保证数据包的顺序和完整性，不提供重传机制，数据包可能丢失、重复或乱序到达。
- **轻量级**：UDP头部只有8个字节，相比TCP的头部，UDP开销更小，适合实时性要求高的应用。
- **支持广播和多播**：UDP支持广播（Broadcast）和多播（Multicast），可以同时向多个目标发送数据。

## UDP 数据包结构

UDP数据包的结构非常简单，由以下几个字段组成：

- **源端口（Source Port，16位）**：发送方的端口号。
- **目的端口（Destination Port，16位）**：接收方的端口号。
- **长度（Length，16位）**：UDP头部和数据部分的总长度。
- **校验和（Checksum，16位）**：用于错误检测的校验和。

plaintext

```
+-------------------+-------------------+
| Source Port       | Destination Port  |
+-------------------+-------------------+
| Length            | Checksum          |
+-------------------+-------------------+
| Data (variable)                        |
+---------------------------------------+
```

## 使用场景

UDP适用于对实时性要求高但对可靠性要求不高的应用场景，包括：

- **实时音视频传输**：如VoIP、视频会议和在线直播，要求低延迟和高效率，即使有部分数据包丢失也能接受。
- **在线游戏**：如多人在线游戏，需要快速响应的通信，允许偶尔的数据丢失。
- **DNS查询**：域名系统（DNS）使用UDP进行查询，快速响应用户请求。
- **物联网（IoT）设备通信**：许多物联网设备使用UDP进行轻量级、低延迟的数据传输。

## 优缺点

**优点**：

- 低延迟：由于无连接和简单头部，UDP传输延迟较低。
- 开销小：UDP头部只有8个字节，通信开销小。
- 支持广播和多播：适合需要同时向多个目标发送数据的应用。

**缺点**：

- 不可靠：没有重传和确认机制，数据包可能丢失、重复或乱序。
- 无流量控制：不具备流量控制机制，容易导致网络拥塞。

## 示例：UDP通信

以下是一个简单的UDP客户端和服务器示例，使用Python实现。

### 服务器代码

python

```
import socket

# 创建UDP socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('localhost', 12345))

print("UDP服务器在端口12345监听...")

while True:
    data, addr = server_socket.recvfrom(1024)  # 接收数据
    print(f"收到来自{addr}的数据：{data.decode()}")
    response = f"已接收：{data.decode()}"
    server_socket.sendto(response.encode(), addr)  # 发送响应
```

### 客户端代码

python

```
import socket

# 创建UDP socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_address = ('localhost', 12345)

message = "Hello, UDP Server!"
client_socket.sendto(message.encode(), server_address)  # 发送数据

data, server = client_socket.recvfrom(1024)  # 接收响应
print(f"从服务器收到响应：{data.decode()}")

client_socket.close()
```

## 总结

UDP是一种简单、快速、低延迟的传输层协议，适用于实时性要求高的应用，如音视频传输、在线游戏和DNS查询。虽然UDP不提供可靠的传输服务，但其轻量级和支持广播、多播的特点使其在许多应用中非常有用。通过合理选择和配置，UDP可以在特定场景下提供高效的网络通信服务。


:::tip[🎉 节点推荐]
- 🚀 [Cyberguard: 解锁Netflix/Hbo/Disney+/Dazn等流媒体,18.00元/月](https://www.cyberguard.best/#/register?code=XsreC0T5)<br>
- 🚀 [优信云：IEPL/IPLC 高速专线，￥15.00/月](https://www.优信云.com/#/register?code=JRtE5uIV)<br>
- 🚀 [尔湾云：最大峰值1000Mbps，全流媒体及ChatGPT解锁！最低12元/月](https://erwan6.net/auth/register?code=BoObCd)<br>
- 🚀 [TNTCloud：新开机场，季付30，每月低至￥10.00/月](https://haibing822.tntvipaff.cc/#/register?code=GtjJVgml)<br>
- 🚀 [魔戒：不限时，不限制使用人数，直至套餐流量用完，低至￥14.9/130G流量](https://mojie.app/#/register?code=sSdtPtLo)<br>
- 🚀 [宝可梦星云：新用户首单：9折优惠码：9999，低至5.9/月 ](https://love.521pokemon.com/register?code=56ERkkxp)<br>
- 🚀 [NanoCloud: 绑定TG机器人每天领取免费流量，月付最低1元/月](https://edu.uodoo.bid/auth/register?code=JMiOQDHf)<br>
- 🚀 [肥猫云：全专线中转隧道，高速大宽带不限设备数，低至6元/月（年付）](https://fchb1188.fcvipaff.cc/register?aff=X1vZd2wf)<br>
- 🚀 [疾风云：包年 6.9折 优惠码: jf2025](https://homes.tr25.cn?code=ReCm)<br>
- 🚀 [闪狐云：不限速，不限设备。高速专线。20元/月](https://inv02.ffaff.cc/register?aff=WQApz2pv)
:::

:::note[💬 交流群]

- 🫂 Telegram:[@jichang360](https://t.me/jichang360)

:::