// Function to load and display all pages of the PDF
function loaderX() {
  jQuery('#pdf-loader').delay(750).fadeOut(400)
};

async function loadPDF(url) {
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdf = await pdfjsLib.getDocument(url).promise;
  const pagePromises = [];

  // Loop through all pages and create promises for rendering
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    pagePromises.push(renderPage(pdf, pageNumber));
  }

  // Wait for all page promises to resolve before appending to the viewer
  await Promise.all(pagePromises)
    .then(pages => {
      pages.forEach(canvas => {
        pdfViewer.appendChild(canvas);
      });
      //loaderX.setAttribute('hidden','hidden');
      loaderX();
    })
    .catch(error => {
      console.error('Error rendering PDF pages:', error);
    });
}

// Function to render a single page of the PDF
async function renderPage(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 3 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.className = 'pdf-page';
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  //stylez
const vpMath = page.getViewport({ scale: 1 });
let dpi = window.devicePixelRatio;
let vhDevice = window.innerHeight;
let vwDevice = window.innerWidth;
const vhInit = vpMath.height;
const vwInit = vpMath.width;
const vwVar1 = vwDevice / vwInit;
const vwVar2 = vwVar1 - 0.1;
const vwFinal = vwInit * vwVar2;
canvas.style.width = vwFinal + 'px';

//more stylez!
const nameX = document.getElementById('prcNameHolder');
nameX.style.width = vwFinal + 'px';
  
  
  // Render PDF page into canvas context
  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  await page.render(renderContext).promise;
  return canvas;
}

const prcName = document.getElementById('prcName');
//init filez
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
const pdfValue = params.f;
const pdfName = params.n;

// Load a sample PDF file
loadPDF(pdfValue); // Replace 'sample.pdf' with the path to your PDF file
prcName.innerText = pdfName;

// reload on screen orientation change 
screen.orientation.addEventListener("change", function(e) {
    location.reload();
});