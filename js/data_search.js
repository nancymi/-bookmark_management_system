var bookmarks;

var bookmarkOnFilters;

var bookmarkHtmlList;

var bookmarkOnFilterHtmlList;

var inoutKeyword;

var BOOKMARK_URL = "https://raw.githubusercontent.com/nancymi/-bookmark_management_system/master/sources/bookmarks.json";

function downloadData() {
	$.ajaxSettings.async = false;
	$.getJSON(BOOKMARK_URL, function(data) {
		bookmarks = data;
		bookmarkHtmlList = _.chain(bookmarks).map(function(bookmark) {
			return getBookmarkStr(bookmark.title, bookmark.created, bookmark.url);
		});
	});
}


function runSearchEvent() {
	bindInputEvent();
}

function bindInputEvent() {
	$(".input").bind("input propertychange", function() {
		inputKeyword = $(this).val();
		if (inputKeyword != "") {
			startFilter();
		} else {
			stopFilter();
		}
	});
}

function startFilter() {
	clearSearchResult();
	loadFilterData();
	setSearchResult();
}

function stopFilter() {
	clearSearchResult();
	updatePageByFilter.call(bookmarkHtmlList);
}

function loadFilterData() {
	var keywordRE = new RegExp(inputKeyword, "ig");
	bookmarkOnFilters = bookmarks.filter(function(bookmark) {
		return keywordRE.test(bookmark.title);
	});
	bookmarkOnFilterHtmlList = bookmarkOnFilters.map(function(bookmarkOnFilter) {
		var highlightBookmarkOnFilter = bookmarkOnFilter.title.replace(
						keywordRE, '<span style="background-color:#F24A98">$&</span>');
		return getBookmarkStr(highlightBookmarkOnFilter, bookmarkOnFilter.created, bookmarkOnFilter.url);
	});
}

function clearSearchResult() {
	clearSearchSum();
	clearContent();
	initializePagnation();
}

function setSearchResult() {
	setSearchSum(bookmarkOnFilters.length);
	updatePageByFilter.call(bookmarkOnFilterHtmlList);
	updatePagnation();
}

function setSearchSum(bookmarkOnFilterSum) {
	document.getElementById("search_sum").innerHTML="共搜索到 " + bookmarkOnFilterSum + " 种结果";
}

function clearSearchSum() {
	$("#search_sum").html("");
}

function clearContent() {
	$("#content").html("");
}

function getBookmarkStr(title, created, url) {
	var bookmark_url = url || "";
	if (bookmark_url == "") {
		return '<div id="bookmark">' +
				'<div class="bookmark_content">' + 
	        '<p class="title">' + title + '</p>' +
	        '<p class="created">Created @ ' + getLocalTime(created) +'</p>' +
	        '</div>' +
	        '<div class="delete_button">' + 
						'<a onclick="openDeleteDialog($(this))" class="button button-primary button-small">删除</a>' + 
					'</div>' +  
		    '</div>' + 
		    '<div class="line"></div>';
	} else {
		return '<div id="bookmark">' +
				'<div class="bookmark_content">' + 
	        '<a class="title" target="_blank" href="' + bookmark_url + '">' + title + '</a>' +
	        '<p class="created">Created @ ' + getLocalTime(created) +'</p>' +
	        '</div>' +
	        '<div class="delete_button">' + 
						'<a onclick="openDeleteDialog()" class="button button-primary button-small">删除</a>' + 
					'</div>' +  
		    '</div>' + 
		    '<div class="line"></div>';
	}
}

function getLocalTime(timestamp) {
	var now = new Date();
	now.setTime(timestamp);
	return now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
}

