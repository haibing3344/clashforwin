---
title: TProxy TCP/UDP
description: TProxy（Transparent Proxy，透明代理）是Linux内核中的一个模块，用于透明地代理TCP和UDP流量。透明代理的主要特点是，客户端并不知道其流量正在通过代理服务器，这使得它在某些应用场景中非常有用，如负载均衡、安全监控和网络优化。
---

# TProxy TCP/UDP

TProxy（Transparent Proxy，透明代理）是Linux内核中的一个模块，用于透明地代理[TCP](/wiki/tcp)和[UDP](/wiki/udp)流量。透明代理的主要特点是，客户端并不知道其流量正在通过代理服务器，这使得它在某些应用场景中非常有用，如负载均衡、安全监控和网络优化。以下是对TProxy的详细介绍：

## TProxy 的特点

- **透明性**：客户端无需进行任何配置或意识到代理的存在，代理服务器可以截获并处理流量。
- **TCP/UDP支持**：TProxy同时支持[TCP](/wiki/tcp)和[UDP](/wiki/udp)流量，可以代理各种类型的网络通信。
- **灵活性**：与iptables结合使用，可以灵活地定义流量重定向和处理规则。
- **无中断**：由于TProxy在网络层工作，流量的代理过程对客户端是无缝的，不会中断通信。

## 工作原理

TProxy工作在Linux内核的网络层，通过修改IP包的目的地址，将流量透明地重定向到代理服务器进行处理。具体步骤如下：

- **捕获流量**：使用iptables将流量捕获并重定向到TProxy模块。
- **代理处理**：TProxy接收到重定向的流量，对其进行处理后转发到目标服务器。
- **返回响应**：目标服务器的响应流量通过TProxy返回给客户端，客户端认为其直接与目标服务器通信。

## 配置步骤

以下是配置TProxy以透明代理TCP和UDP流量的示例步骤：

### 前提条件

- 安装并配置好Linux操作系统。
- 确保内核版本支持TProxy（Linux内核2.6.28及以上）。
- 安装iptables和iproute2工具。

### 内核模块加载

bash

```
modprobe xt_TPROXY
modprobe nf_tproxy_core
```

### 配置iptables

- **创建mangle表规则**： 捕获并重定向流量到本地的代理端口。

  bash

  ```
  iptables -t mangle -N DIVERT
  iptables -t mangle -A PREROUTING -p tcp -m socket -j DIVERT
  iptables -t mangle -A PREROUTING -p udp -m socket -j DIVERT
  iptables -t mangle -A DIVERT -j MARK --set-mark 1
  iptables -t mangle -A DIVERT -j ACCEPT
  ```

- **添加PREROUTING规则**： 将流量重定向到TProxy。

  bash

  ```
  iptables -t mangle -A PREROUTING -p tcp -j TPROXY --tproxy-mark 0x1/0x1 --on-port 12345
  iptables -t mangle -A PREROUTING -p udp -j TPROXY --tproxy-mark 0x1/0x1 --on-port 12345
  ```

### 配置ip rule和ip route

- **设置ip rule**： 为标记流量设置路由规则。

  bash

  ```
  ip rule add fwmark 1 lookup 100
  ```

- **设置路由表**： 配置路由表100，将流量重定向到本地。

  bash

  ```
  ip route add local 0.0.0.0/0 dev lo table 100
  ```

## 示例：使用TProxy代理HTTP流量

假设你有一个运行在本地12345端口的HTTP代理服务器，可以使用以下配置来透明代理HTTP流量：

### 配置iptables

bash

```
iptables -t mangle -A PREROUTING -p tcp --dport 80 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 12345
iptables -t mangle -A PREROUTING -p tcp --dport 443 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 12345
```

## 应用场景

- **负载均衡**：TProxy可以将流量透明地分发到多个服务器，实现负载均衡。
- **安全监控**：透明代理可以监控和过滤网络流量，检测和阻止恶意行为。
- **网络优化**：通过代理服务器缓存和优化流量，提升网络性能。
- **访问控制**：基于流量特征进行访问控制和权限管理。

## 优缺点

**优点**：

- 对客户端透明，无需修改客户端配置。
- 支持TCP和UDP流量，适用范围广。
- 与iptables结合，规则配置灵活。

**缺点**：

- 需要较高的网络配置和维护技巧。
- 增加了代理服务器的负载，对硬件要求较高。

## 总结

TProxy是一种强大的透明代理工具，适用于需要透明代理和处理网络流量的各种场景。通过与iptables和iproute2结合使用，TProxy可以灵活地捕获和重定向TCP和UDP流量，实现负载均衡、安全监控和网络优化等功能。尽管配置复杂，但其强大的功能和灵活性使其成为网络管理员和开发者的重要工具。


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