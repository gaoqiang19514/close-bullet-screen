$(function () {
  $('.woo-pop-wrap-main button').click(() => {
    const text = $('.vue-recycle-scroller__item-wrapper .vue-recycle-scroller__item-view:first .wbpro-feed-ogText div').html();
    const arr = text.match(/[a-zA-Z]+|\d+/g);
    const [key1, key1Value, , key2, key2Value, key2Target] = arr;

    const newValue = `${key1} ${Number(key1Value) + 1}\n${key2} (${Number(key2Value) + 2}/${key2Target})`
    // TODO: 如何将内容写入到textarea中？
    // 获取不到vue的实例，那就换一个思路，将内容写入剪贴板
    navigator.clipboard.writeText(newValue)
  });
});
