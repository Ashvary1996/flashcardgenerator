import jsPDF from "jspdf";

const options = {
  image: { type: "jpeg", quality: 0.6 }, // reduce the size of image
};

function createPDFForAllTerms(flashcardData) {
  const doc = new jsPDF(options);

  // Set background color for the entire PDF
  doc.setFillColor(255, 255, 255); // white background
  doc.rect(0, 0, 210, 297, "F");

  // Add group image (as a circle)
  if (flashcardData.groupImage) {
    const imageSize = 40; // Width and height of the group image
    const x = 10;
    const y = 10;

    doc.addImage(flashcardData.groupImage, "JPEG", x, y, imageSize, imageSize);
  }

  // Add group name at the right of group image
  doc.setFontSize(40);
  doc.setTextColor(29, 53, 87); // Red text color
  doc.setFont("helvetica", "bold");
  doc.text(flashcardData.groupName, 90, 30);

  // Add group description below group name and group image
  doc.setFontSize(16);
  doc.setTextColor(64, 61, 57); // Reset text color
  doc.text(doc.splitTextToSize(flashcardData.groupDescription, 200), 10, 65);

  let yPos = 120; // Initial Y position

  flashcardData.term.forEach((term, termIndex) => {
    // Calculate term content height dynamically
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255); // white background
    const termDefinitionLines = doc.splitTextToSize(term.termDefinition, 100);
    const termImageHeight = term.termImage ? 60 : 0; // Adjust based on your image size
    const totalHeight = Math.max(
      termImageHeight + termDefinitionLines.length * 10, // Height of the image and definition
      70 // Minimum height for a term
    );

    // Check if there's enough space for the current term on the current page
    if (yPos + 50 > 290) {
      doc.addPage(); // If not, add a new page
      yPos = 20; // Reset Y position
    }
    
    // Add serial number
    doc.setFontSize(15);
    doc.setTextColor(64, 61, 57); // set text color
    doc.text(`${termIndex + 1}. ${term.termName}`, 10, yPos);

    // Add term image (if it exists)
    if (term.termImage) {
      doc.addImage(term.termImage, "JPEG", 15, yPos + 10, 45, 45); // Display term image
    }

    // Add term definition
    doc.setFontSize(12);
    // doc.setFont("Times", "Roman");
    doc.setTextColor(0, 48, 73);
    doc.text(termDefinitionLines, 83, yPos + 10);

    // Update the Y position for the next term content
    yPos += totalHeight;
  });

  // Save the PDF with all terms
  doc.save("flashcard-details-all-terms.pdf");
}

function PdfDownload({ buttonLabel, flashcardData }) {
  const handleDownload = () => {
    createPDFForAllTerms(flashcardData);
  };

  return (
    <div>
      <button onClick={handleDownload}>{buttonLabel}</button>
    </div>
  );
}

export default PdfDownload;
