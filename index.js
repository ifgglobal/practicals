//anim
function loaderX() {
  jQuery('#preloader').delay(750).fadeOut(400)
};

window.addEventListener("load", loaderX);
//end anim

//modal + cookie
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};

var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: [],
    closeLabel: "Close",
    cssClass: ['warnClass'],
    onOpen: function() {
        console.log('agreement given');
    },
    onClose: function() {
        console.log('agreement completed');
        createCookie('agreed','yes',20);//cookies expires after 30 days
    },
});

modal.setContent('<h1>Attention!</h1><small>This website is FREE for all. If you paid to get access to this website, you have been SCAMMED!<br><br>This website runs under non-free network infrastructure and uses frameworks that are owned by public and/or private corporation. All contents of this website are owned by their respective owners. In order to function properly the website unanimously collects information and uses cookies<br><br>By continuing you automatically agree to the Licensing and Legal of this website and IFG Global<br><br><small><a class="tingleHref" href="/legal">Read more about Licensing and Legal here</small></a></small>');

modal.addFooterBtn('Agree and Close', 'tingle-btn tingle-btn--default', function() {
    modal.close();
});

//modal end

//warn
function warnMe() {
  var agreed = getCookie('agreed') || '';
                if (agreed != 'yes') {
                 modal.open();
                }
};

warnMe();
//end warn

//db
function dbLoadX(dbName) {
$.getJSON( "/database/"+dbName+".json?cache=0", function(data) {
  $.each( data, function(key, val) {
 var $clonePopulate = $("<a href='/pedestal/web/viewer?file=/practicals/"+dbName+"/"+val.objectUrl+"' class='"+val.objectClass+"'><li class='sites'>"+val.objectName+"</li></a>");
 $("#prcList").append($clonePopulate);            
 });
});
};

function bioExec() {
  console.log("bio");
  dbLoadX("biology");
};

function phyExec() {
  console.log("phy");
  dbLoadX("physics");
};

function hmExec() {
  console.log("hm");
  dbLoadX("highermath");
};

function chemExec() {
  console.log("chem");
  dbLoadX("chemistry");
};

function ictExec() {
  console.log("ict");
  dbLoadX("ict");
};
//end db
