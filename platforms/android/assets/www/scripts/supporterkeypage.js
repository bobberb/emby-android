define(["fetchHelper","jQuery"],function(e,t){function r(e){Dashboard.showLoadingMsg(),ApiClient.getPluginSecurityInfo().then(function(r){t("#txtSupporterKey",e).val(r.SupporterKey),r.SupporterKey&&!r.IsMBSupporter?(e.querySelector("#txtSupporterKey").classList.add("invalidEntry"),t(".notSupporter",e).show()):(e.querySelector("#txtSupporterKey").classList.remove("invalidEntry"),t(".notSupporter",e).hide()),Dashboard.hideLoadingMsg()})}function a(e){Dashboard.getPluginSecurityInfo().then(function(r){r.IsMBSupporter?t(".supporterContainer",e).addClass("hide"):t(".supporterContainer",e).removeClass("hide")})}function o(){Dashboard.showLoadingMsg();var r=this,a=t("#txtEmail",r).val(),o="https://mb3admin.com/admin/service/supporter/retrievekey?email="+a;return e.ajax({url:o,type:"POST",dataType:"json"}).then(function(e){Dashboard.hideLoadingMsg(),e.Success?require(["toast"],function(e){e(Globalize.translate("MessageKeyEmailedTo").replace("{0}",a))}):require(["toast"],function(t){t(e.ErrorMessage)})}),!1}function n(){return[{href:"about.html",name:Globalize.translate("TabAbout")},{href:"supporterkey.html",name:Globalize.translate("TabEmbyPremiere")}]}var i={updateSupporterKey:function(){Dashboard.showLoadingMsg();var e=this,a=t("#txtSupporterKey",e).val(),o={SupporterKey:a};return ApiClient.updatePluginSecurityInfo(o).then(function(){Dashboard.resetPluginSecurityInfo(),Dashboard.hideLoadingMsg(),Dashboard.alert(a?{message:Globalize.translate("MessageKeyUpdated"),title:Globalize.translate("HeaderConfirmation")}:{message:Globalize.translate("MessageKeyRemoved"),title:Globalize.translate("HeaderConfirmation")});var o=t(e).parents(".page")[0];r(o)}),!1},linkSupporterKeys:function(){Dashboard.showLoadingMsg();var r=this,a=t("#txtNewEmail",r).val(),o=t("#txtNewKey",r).val(),n=t("#txtOldKey",r).val(),i="https://mb3admin.com/admin/service/supporter/linkKeys";return e.ajax({url:i,type:"POST",dataType:"json",query:{email:a,newkey:o,oldkey:n}}).then(function(e){Dashboard.hideLoadingMsg(),e.Success?require(["toast"],function(e){e(Globalize.translate("MessageKeysLinked"))}):require(["toast"],function(t){t(e.ErrorMessage)})}),!1}};t(document).on("pageinit","#supporterKeyPage",function(){var e=this;t("#supporterKeyForm",this).on("submit",i.updateSupporterKey),t("#lostKeyForm",this).on("submit",o),t("#linkKeysForm",this).on("submit",i.linkSupporterKeys),t(".benefits",e).html(Globalize.translate("HeaderSupporterBenefit",'<a href="http://emby.media/premiere" target="_blank">',"</a>"))}).on("pageshow","#supporterKeyPage",function(){LibraryMenu.setTabs("helpadmin",1,n);var e=this;a(e),r(e)})});