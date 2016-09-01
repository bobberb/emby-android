define(["libraryBrowser","cardBuilder","dom","scrollStyles","emby-itemscontainer","emby-tabs","emby-button"],function(e,t,a){function r(){var e=a.getWindowSize().innerWidth;return e>=1920?9:e>=1200?12:e>=1e3?10:8}function n(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function i(){return n()?"overflowSquare":"square"}function o(e,a){Dashboard.showLoadingMsg();var o=Dashboard.getCurrentUserId(),s={IncludeItemTypes:"Audio",Limit:r(),Fields:"PrimaryImageAspectRatio,BasicSyncInfo",ParentId:a,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getJSON(ApiClient.getUrl("Users/"+o+"/Items/Latest",s)).then(function(a){var r=e.querySelector("#recentlyAddedSongs");r.innerHTML=t.getCardsHtml({items:a,showUnplayedIndicator:!1,showLatestItemsPopup:!1,shape:i(),showTitle:!0,showParentTitle:!0,lazy:!0,centerText:!0,overlayPlayButton:!0,allowBottomPadding:!n()}),ImageLoader.lazyChildren(r),Dashboard.hideLoadingMsg()})}function s(e,a){var o={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Audio",Limit:r(),Recursive:!0,Fields:"PrimaryImageAspectRatio,AudioInfo",Filters:"IsPlayed",ParentId:a,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getItems(Dashboard.getCurrentUserId(),o).then(function(a){var r=e.querySelector("#recentlyPlayed");a.Items.length?r.classList.remove("hide"):r.classList.add("hide");var o=r.querySelector(".itemsContainer");o.innerHTML=t.getCardsHtml({items:a.Items,showUnplayedIndicator:!1,shape:i(),showTitle:!0,showParentTitle:!0,action:"instantmix",lazy:!0,centerText:!0,overlayMoreButton:!0,allowBottomPadding:!n()}),ImageLoader.lazyChildren(o)})}function d(e,a){var o={SortBy:"PlayCount",SortOrder:"Descending",IncludeItemTypes:"Audio",Limit:r(),Recursive:!0,Fields:"PrimaryImageAspectRatio,AudioInfo",Filters:"IsPlayed",ParentId:a,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getItems(Dashboard.getCurrentUserId(),o).then(function(a){var r=e.querySelector("#topPlayed");a.Items.length?r.classList.remove("hide"):r.classList.add("hide");var o=r.querySelector(".itemsContainer");o.innerHTML=t.getCardsHtml({items:a.Items,showUnplayedIndicator:!1,shape:i(),showTitle:!0,showParentTitle:!0,action:"instantmix",lazy:!0,centerText:!0,overlayMoreButton:!0,allowBottomPadding:!n()}),ImageLoader.lazyChildren(o)})}function l(e){var a={SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Playlist",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName,CumulativeRunTimeTicks,CanDelete",StartIndex:0,Limit:r(),EnableTotalRecordCount:!1};ApiClient.getItems(Dashboard.getCurrentUserId(),a).then(function(a){var r=e.querySelector("#playlists");a.Items.length?r.classList.remove("hide"):r.classList.add("hide");var o=r.querySelector(".itemsContainer");o.innerHTML=t.getCardsHtml({items:a.Items,shape:i(),showTitle:!0,lazy:!0,coverImage:!0,showItemCounts:!0,centerText:!0,overlayPlayButton:!0,allowBottomPadding:!n()}),ImageLoader.lazyChildren(o)})}function c(e,t){var a=LibraryMenu.getTopParentId();o(t,a),l(t,a),s(t,a),d(t,a),require(["components/favoriteitems"],function(e){e.render(t,Dashboard.getCurrentUserId(),a,["favoriteArtists","favoriteAlbums","favoriteSongs"])})}return pageIdOn("pagebeforeshow","musicRecommendedPage",function(){var e=this;if(!e.getAttribute("data-title")){var t=LibraryMenu.getTopParentId();t?ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(function(t){e.setAttribute("data-title",t.Name),LibraryMenu.setTitle(t.Name)}):(e.setAttribute("data-title",Globalize.translate("TabMusic")),LibraryMenu.setTitle(Globalize.translate("TabMusic")))}}),function(t,a){function r(){Dashboard.showLoadingMsg();var e=t.querySelector(".pageTabContent[data-index='0']");c(t,e)}function n(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function i(e,r,n){var i=[];switch(r){case 0:break;case 1:i.push("scripts/musicalbums");break;case 2:i.push("scripts/musicartists");break;case 3:i.push("scripts/musicartists");break;case 4:i.push("scripts/songs");break;case 5:i.push("scripts/musicgenres");break;case 6:i.push("scripts/musicfolders")}require(i,function(e){var i;0==r&&(i=t.querySelector(".pageTabContent[data-index='"+r+"']"),d.tabContent=i);var o=l[r];o||(i=t.querySelector(".pageTabContent[data-index='"+r+"']"),o=r?new e(t,a,i):d,2==r?o.mode="albumartists":3==r&&(o.mode="artists"),l[r]=o,o.initTab&&o.initTab()),n(o)})}function o(e,t){i(e,t,function(e){-1==u.indexOf(t)&&e.preRender&&e.preRender()})}function s(e,t){i(e,t,function(e){-1==u.indexOf(t)&&(u.push(t),e.renderTab())})}var d=this;d.initTab=function(){for(var e=t.querySelector(".pageTabContent[data-index='0']"),a=e.querySelectorAll(".itemsContainer"),r=0,i=a.length;i>r;r++)n()?(a[r].classList.add("hiddenScrollX"),a[r].classList.remove("vertical-wrap")):(a[r].classList.remove("hiddenScrollX"),a[r].classList.add("vertical-wrap"))},d.renderTab=function(){r()};var l=[],u=[],m=t.querySelector(".libraryViewNav");e.configurePaperLibraryTabs(t,m,t.querySelectorAll(".pageTabContent"),[0,4,5,6]),m.addEventListener("beforetabchange",function(e){o(t,parseInt(e.detail.selectedTabIndex))}),m.addEventListener("tabchange",function(e){s(t,parseInt(e.detail.selectedTabIndex))}),require(["headroom-window"],function(e){e.add(m),d.headroom=e}),t.addEventListener("viewdestroy",function(){d.headroom&&d.headroom.remove(m),l.forEach(function(e){e.destroy&&e.destroy()})})}});