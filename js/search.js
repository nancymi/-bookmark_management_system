var bookmarks;
var bookmark_sum;
var bookmarkOnFilterSum;
var bookmarkOnFilterHTML;
var bookmarkUrl = "https://raw.githubusercontent.com/nancymi/twhomework/gh-pages/2015-11-14/sources/bookmarks.json";

$(document).ready(function() {

	startConfiguration();
	startInitiation();
	runContentFilter();
});

function startConfiguration() {
		$.ajaxSettings.async = false;
		$.getJSON(bookmarkUrl, function(data) {
			bookmarks = data;
			bookmark_sum = bookmarks.length;
			bookmarkOnFilterSum = bookmark_sum;
		});
	}

	function startInitiation() {
		var contentStr = _.chain(bookmarks).map(function(bookmark) {
			return getBookmarkStr(bookmark.title, bookmark.created);
		}).value();
		$("#content").html(contentStr);
		$("#search_sum").html("");
		runPagnation();
	}

	function runContentFilter() {
		$(".input").bind("input propertychange", function() {
			var keyword = $(this).val();
			if (keyword != "") {
				var keywordRE = new RegExp(keyword, "ig");

				$("#content").html("");

				var bookmarksOnFilter = bookmarks.filter(function(bookmark) {
					return keywordRE.test(bookmark.title);
				});

				bookmarkOnFilterSum = bookmarksOnFilter.length;
				document.getElementById("search_sum").innerHTML="共搜索到 " + bookmarkOnFilterSum + " 种结果";

				bookmarkOnFilterHTML = bookmarksOnFilter.map(function(bookmarkOnFilter) {
					var highlightBookmarkOnFilter = bookmarkOnFilter.title.replace(
						keywordRE, '<span style="background-color:#F24A98">$&</span>');
					return getBookmarkStr(highlightBookmarkOnFilter, bookmarkOnFilter.created);
				});

				$("#content").html(bookmarkOnFilterHTML);
			} else {
				startInitiation();
				bookmarkOnFilterSum = bookmark_sum;
			}

			runPagnation();			
		});
	}

	function getLocalTime(timestamp) {
		var now = new Date();
		now.setTime(timestamp);
		return now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
	}

	function getBookmarkStr(title, created) {
		return '<div id="bookmark">' +
						'<div class="bookmark_content">' + 
		        '<p id="title">' + title + '</p>' +
		        '<p id="created">Created @ ' + getLocalTime(created) +'</p>' +
		        '</div>' +
		        '<div class="delete_button">' + 
   						 '<a href="http://www.bootcss.com/" class="button button-primary button-small">删除</a>' + 
 						 '</div>' +  
		        '</div>' + 
		        '<div class="line"></div>';
	}