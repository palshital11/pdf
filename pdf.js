document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('convertBtn').addEventListener('click', async () => {
    const input = document.getElementById('imageInput');
    const status = document.getElementById('status');
    status.innerText = "";

    if (!input.files.length) {
      alert("Please select JPG images.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const imageData = await readFileAsDataURL(file);

      const img = new Image();
      img.src = imageData;
      await img.decode();

      const pageWidth = 210;
      const pageHeight = 297;
      const imgAspectRatio = img.width / img.height;

      let imgWidth = pageWidth;
      let imgHeight = pageWidth / imgAspectRatio;

      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = pageHeight * imgAspectRatio;
      }

      if (i !== 0) pdf.addPage();
      pdf.addImage(imageData, 'JPEG',
        (pageWidth - imgWidth) / 2,
        (pageHeight - imgHeight) / 2,
        imgWidth,
        imgHeight
      );
    }

    pdf.save("converted.pdf");
    status.innerText = "✅ PDF created successfully!";
  });
});

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
