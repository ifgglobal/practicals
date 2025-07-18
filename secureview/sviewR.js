document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('pid');
    const pdfValueEnc = sessionStorage.getItem(pid);
    const pdfValue = atob(pdfValueEnc);

    // initialize WebViewer
    let webviewerInstance;
    let documentViewer;
    WebViewer({
        path: '/secureview/lib/',
        licenseKey: 'Ne3JB5Om7iKQD4pl6C0e',
        disabledElements: [
            'selectToolButton', 'toolsButton', 'printButton', 'downloadButton', 'searchButton',
            'themeChangeButton', 'languageButton', 'fullscreenButton', 'menuButton',
            'viewControlsButton', 'leftPanelButton', 'moreButton'
        ],
        initialDoc: pdfValue,
    }, document.getElementById('viewer'))
        .then(instance => {
            webviewerInstance = instance;
            documentViewer = instance.Core.documentViewer;
            const { UI } = instance;
            UI.setTheme('dark');
        })
        .catch(error => {
            console.error('WebViewer initialization failed:', error);
        });

    // clean up WebViewer on page unload
    window.addEventListener('unload', async () => {
        if (documentViewer) {
            try {
                documentViewer.getDocument()?.unloadResources();
                await documentViewer.closeDocument();
                await documentViewer.dispose();
            } catch (error) {
                console.error('Error during documentViewer cleanup:', error);
            }
        }
        if (webviewerInstance?.UI) {
            try {
                await webviewerInstance.UI.dispose();
            } catch (error) {
                console.error('Error during UI dispose:', error);
            }
        }
    });

    // manage MutationObservers for iframe
    let observers = [];
    const iframe = document.getElementById('webviewer-1');
    iframe.addEventListener('load', () => {
        // clean up existing observers
        observers.forEach(obs => obs.disconnect());
        observers = [];

        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDocument) return; // Exit if iframe document is inaccessible

        // observer for divider
        const observer = new MutationObserver((mutations) => {
            const divider = iframeDocument.querySelector('.divider');
            if (divider) {
                divider.remove();
                observer.disconnect();
            }
        });
        observer.observe(iframeDocument.body, { childList: true, subtree: true });
        observers.push(observer);
        setTimeout(() => observer.disconnect(), 10000); // Fallback cleanup

        // observer for error modal
        const observer2 = new MutationObserver((mutations) => {
            const errorM2 = iframeDocument.querySelector('.error-modal-content');
            if (errorM2) {
                errorM2.remove();
                observer2.disconnect();
            }
        });
        observer2.observe(iframeDocument.body, { childList: true, subtree: true });
        observers.push(observer2);
        setTimeout(() => observer2.disconnect(), 10000); // Fallback cleanup
    });

    // clean up observers on page unload
    window.addEventListener('unload', () => {
        observers.forEach(obs => obs.disconnect());
        observers = [];
    });
});