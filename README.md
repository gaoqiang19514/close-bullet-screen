# my-chrome-plugins
- 半自动发微博
- 自动删除历史记录

## 目录介绍
- `js/content.js` 监听微博的按钮点击事件，读取读取最新的微博内容，并自动将内容插入到`textarea`中
- `js/background.js` historyManager(1/4)监听tab的切换事件，并从黑名单中移除历史记录
- `js/popup.js` historyManager(2/4)弹窗业务逻辑：黑名单的增删改查
- `popup.html` historyManager(3/4)弹窗UI
- `popup.css` historyManager(4/4)弹窗样式

