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
        createCookie('ifg_consent_002','100y',20);//cookies expires after 20 days
    },
});

modal.setContent('<h1>Attention!</h1><br><small>This website is FREE for all. If you paid to get access to this website, you have been SCAMMED!<br><br>This website runs under non-free network infrastructure and uses frameworks that are owned by public and/or private corporations. All contents of this website are owned by their respective owners. In order to function properly the website uses cookies<br><br>By continuing you automatically agree to the Licensing, EULA & Privacy Policy of this website and IFG Global<br><br><small><a class="tingleHref" href="/LICENSE.txt">Read LICENSE here</a><br><a class="tingleHref" href="/EULA.txt">Read EULA here</a><br><a class="tingleHref" href="/PrivacyPolicy.txt">Read Privacy Policy here</a></small></small>');

modal.addFooterBtn('Agree and Close', 'tingle-btn tingle-btn--default', function() {
    modal.close();
});

//modal end

//warn
function warnMe() {
  var agreed = getCookie('ifg_consent_002') || '';
                if (agreed != '100y') {
                 modal.open();
                }
};

warnMe();
//end warn

//radom math
function getRandInt() {
  return Math.floor(Math.random() * 9000) + 1000;
}

//db main func
function dbLoadX(dbName, dbLevelID) {
$.getJSON( "/database/"+dbLevelID+"/"+dbName+".json?cache=0", function(data) {
  $.each( data, function(key, val) {
 //var objectUrlEnc = encodeURIComponent("/practicals/" + dbName + "/" + val.objectUrl);
 //var objectNameEnc = encodeURIComponent(val.objectName);
 //var $clonePopulate = $("<a href='/pedestal/viewer?f="+objectUrlEnc+"&n="+objectNameEnc+"' class='"+val.objectClass+" "+val.anchorClass+"'><li class='sites "+val.liClass+"'>"+val.objectName+"</li></a>");

var pdfUrl = "https://cdn.jsdelivr.net/gh/ifgglobal/cdn/practicals/" + dbLevelID + "/" + dbName + "/" + val.objectUrl;
var pdfUrlEnc = btoa(pdfUrl);
var linkId = "sv" + "_" + getRandInt() + key + Date.now(); // unique ID
sessionStorage.setItem(linkId, pdfUrlEnc); // store path safely

var $clonePopulate = $("<a href='/secureview/sview?pid=" + linkId + "' class='" + val.objectClass + " " + val.anchorClass + "'><li class='sites " + val.liClass + "'>" + val.objectName + "</li></a>");


 $("#prcList").append($clonePopulate);            
 });
});
};

//db helper func

//ssc db
function SSC_bioExec() {
  dbLoadX("biology", "SSC");
};
function SSC_phyExec() {
  dbLoadX("physics", "SSC");
};
function SSC_hmExec() {
  dbLoadX("highermath", "SSC");
};
function SSC_chemExec() {
  dbLoadX("chemistry", "SSC");
};
function SSC_ictExec() {
  dbLoadX("ict", "SSC");
};

//hsc db
function HSC_bioExec() {
  dbLoadX("biology", "HSC");
};
function HSC_phyExec() {
  dbLoadX("physics", "HSC");
};
function HSC_hmExec() {
  dbLoadX("highermath", "HSC");
};
function HSC_chemExec() {
  dbLoadX("chemistry", "HSC");
};
function HSC_ictExec() {
  dbLoadX("ict", "HSC");
};

//end db


// card height fix
  function setEqualHeights() {
  const listItems = document.getElementsByClassName("sites");
  if (listItems.length === 0) return;

  let maxHeight = 0;

  // Reset height for non-divider items
  for (let i = 0; i < listItems.length; i++) {
    const li = listItems[i];
    if (!li.classList.contains('divider')) {
      li.style.height = 'auto';
    }
  }

  // Measure max height (excluding dividers)
  for (let i = 0; i < listItems.length; i++) {
    const li = listItems[i];
    if (!li.classList.contains('divider')) {
      const height = li.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    }
  }

  // Apply max height to non-divider items
  for (let i = 0; i < listItems.length; i++) {
    const li = listItems[i];
    if (!li.classList.contains('divider')) {
      li.style.height = `${maxHeight}px`;
    }
  }
};


  // Observe changes in the document
  const observer = new MutationObserver((mutationsList, observer) => {
    let relevantChange = false;

    for (const mutation of mutationsList) {
      // If new nodes were added and any of them are .sites
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && node.classList?.contains('sites')) {
          relevantChange = true;
        }
        // Also check child nodes
        if (node.querySelectorAll) {
          if (node.querySelectorAll('.sites').length > 0) {
            relevantChange = true;
          }
        }
      }
    }

    if (relevantChange) {
      setTimeout(setEqualHeights, 50); // Small delay to ensure layout is updated
    }
  });

  // Start observing the whole body for added elements
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Optional: Run once initially
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setEqualHeights, 100);
    sessionStorage.clear()
  });
