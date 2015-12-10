function openDialog() {
  $('.overlay').fadeIn(200);
}

function closeDialog() {
  $('.overlay').fadeOut(200,function(){
    $(this).removeAttr('style');
  });
}

function cancelAdd() {
  closeDialog();
}

function confirmAdd() {
  var bookmark = new Object();
  bookmark.title = $("#bookmark-title").val();
  bookmark.url = $("#bookmark-url").val();
  if (bookmark.title == "") {
    alert("请输入书签名称！");
  } else {
    bookmark.created = new Date().valueOf();
    addBookmark.call(bookmark);
    closeDialog();
  } 
}

function addBookmark() {
  addBookmarkOnLocal.call(this);
  addBookmarkOnUI();
  //TODO addBookmarkOnRemote();
}

function addBookmarkOnLocal() {
  window.bookmarks.push(this);
}

function addBookmarkOnUI() {
  initializeUI();
}