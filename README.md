# OfflineTransfer 离线传输

一个基于二维码进行小量数据的离线传输的 web 项目。
用于离线设备向联网设备、网络隔离的设备之间传输小量数据。

- 这个项目是为了解决在特定场景下不能互相通信的设备之间传输数据需要拷贝来拷贝去的问题
- 两个设备都能联网就没必要用这种方法了
- 因为是基于二维码的，所以能传递数据的速率很低
  - 小文件或者小量文本(几十 KB 大小的)可以使用
  - 上百 K 的文件要读取上百次二维码，就不方便了（当然也能传输）

## 使用方式

### 1. 发送端

- 使用前需要先将文件复制到被网络隔离的设备上。
- 项目支持了浏览器的扩展，可以[以浏览器插件的方式安装发送端](./doc/%E6%B7%BB%E5%8A%A0%E6%89%A9%E5%B1%95.png)
- 或者直接用浏览器打开 `Sender\html\index.html` 文件也可以使用。

![发送端截图](./doc/%E5%8F%91%E9%80%81%E7%AB%AF.png)

### 2. 接收端

1. 可以使用[在线版](https://transfile.hugstars.top)进行接收（离线接收，不获取数据）
2. 也可自行配置，源码在 [Receiver] 目录下
   - 移动端需要在 `https` 协议下才能打开摄像头

![接收端截图](./doc/%E6%8E%A5%E6%94%B6%E7%AB%AF.jpg)

### 3.传输

1. 发送端选择文件 -> 开始转换 -> 页面生成若干张二维码
2. 打开接收端 -> 打开摄像头 -> 扫码
3. 每张二维码扫码成功后，页面会有提示，此时可以在发送端切换二维码进行下一张接收
   - 切换二维码可以手动点击页面按钮
   - 也可使用 方向键 ↓、方向键 →、空格、回车进行下一张切换
   - 使用 方向键 ↑、方向键 ← 进行上一张切换

![传输截图](./doc/%E4%BA%8C%E7%BB%B4%E7%A0%81.png)

### 4. 其他

- 二维码中包含了当前二维码的张数信息
- 支持重复扫码，会忽略掉
- 支持乱序扫码，漏扫时返回上一张扫上即可
- 当所有二维码都扫码完成后，再次扫到最后一张时，会直接生成文件
  - 也就是最后一张连续扫到两次 就可以结束扫码，完成文件传输
  - 也可以手动点击关闭摄像头进行结束（如果没有传输完毕，数据会丢失）

## 目录结构

```
┌─ Sender       发送端源码
└─ Receiver     接收端源码
```
