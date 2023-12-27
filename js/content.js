// 检查元素不包含指定class
function notHaveClass($elem, className) {
  return !$elem.hasClass(className);
}

function closeDanmuBtn(selector) {
  var $closeBtn = $(selector);
  count += 1;
  console.log('尝试查找弹幕关闭按钮。。。', $closeBtn);
  if ($closeBtn.length && notHaveClass($closeBtn, 'danmu-hide-btn')) {
    $closeBtn.trigger('click');
    console.log('关闭弹幕成功');
  } else if (count < TRY_COUNT) {
    setTimeout(() => {
      closeDanmuBtn(selector);
    }, 500);
  }
}

var TRY_COUNT = 100;
var count = 0;
$(function () {
  // 关闭虎牙弹幕按钮
  // closeDanmuBtn("#player-danmu-btn");
  // 关闭B站弹幕
  // closeDanmuBtn(".bilibili-player-video-danmaku-switch .bui-checkbox");

  $('.woo-pop-wrap-main button').click(() => {
    const text = $('.vue-recycle-scroller__item-wrapper .vue-recycle-scroller__item-view:first .wbpro-feed-ogText div').html();
    const arr = text.match(/[a-zA-Z]+|\d+/g);
    const [key1, key1Value, , key2, key2Value, key2Target] = arr;

    const newValue = `${key1} ${key1Value + 1} <br /> ${key2} (${key2Value + 2}/${key2Target})`
    console.log('newValue', newValue)
    // TODO: 如何将内容写入到textarea中？
  });
});
