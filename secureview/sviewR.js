const params = new URLSearchParams(window.location.search);
const pid = params.get('pid');
const pdfValueEnc = sessionStorage.getItem(pid);
const pdfValue = atob(pdfValueEnc);

WebViewer({
    path: '/secureview/lib/',
    licenseKey: 'i4FZA4xASofmQhDtyX4Z',
    disabledElements: [
        'selectToolButton', 'toolsButton', 'printButton', 'downloadButton', 'searchButton', 'themeChangeButton', 'languageButton', 'fullscreenButton', 'menuButton', 'viewControlsButton', 'leftPanelButton', 'moreButton'
    ],
    initialDoc: pdfValue,
    // initialDoc: '/path/to/my/file.pdf',  // You can also use documents on your server
}, document.getElementById('viewer'))
    .then(instance => {
        // now you can access APIs through the WebViewer instance
        const { Core, UI } = instance;

        UI.setTheme('dark');

    });


$(document).ready(function () {
    $("#webviewer-1").on("load", function () {
        const iframeDocument = $(this).contents()[0];
        const observer = new MutationObserver(function (mutations) {
            const divider = $(iframeDocument).find(".divider");
            if (divider.length) {
                divider.remove();
                observer.disconnect();
            }
        });
        observer.observe(iframeDocument.body, { childList: true, subtree: true });
    });
});

$(document).ready(function () {
    $("#webviewer-1").on("load", function () {
        const iframeDocument2 = $(this).contents()[0];
        const observer2 = new MutationObserver(function (mutations) {
            const errorM2 = $(iframeDocument2).find(".error-modal-content");
            if (errorM2.length) {
                errorM2.remove();
                observer2.disconnect();
            }
        });
        observer2.observe(iframeDocument2.body, { childList: true, subtree: true });
    });
});