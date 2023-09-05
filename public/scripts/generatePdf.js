async function generatePdf(content) {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const pageWidth = 600; // Set a custom page width (adjust as needed)
    const pageHeight = 800; // Set a custom page height (adjust as needed)
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  
    const lines = content.split('\n'); // Split content into lines
    const fontSize = 12;
    const lineHeight = font.heightAtSize(fontSize);
    let y = page.getHeight() - 50; // Adjust the starting y position
  
    for (const line of lines) {
      const wrappedLines = wordWrap(line, font, pageWidth - 100, fontSize);
      for (const wrappedLine of wrappedLines) {
        page.drawText(wrappedLine, { // Print the wrapped line without numbering
          x: 50,
          y,
          size: fontSize,
          font,
        });
        y -= lineHeight + 5;
      }
    }
  
    return pdfDoc.save();
}

function wordWrap(text, font, maxWidth, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
  
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
  
        if (width <= maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
  
    lines.push(currentLine);
    return lines;
}
