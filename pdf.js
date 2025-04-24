for (let i = 0; i < input.files.length; i++) {
  const file = input.files[i];
  const imageData = await readFileAsDataURL(file);

  const img = new Image();
  img.src = imageData;
  await img.decode(); // Wait for image to load

  // Set A4 page dimensions (in mm)
  const pageWidth = 210;
  const pageHeight = 297;

  // Calculate aspect ratio fit
  const imgAspectRatio = img.width / img.height;
  let imgWidth = pageWidth;
  let imgHeight = pageWidth / imgAspectRatio;

  if (imgHeight > pageHeight) {
    imgHeight = pageHeight;
    imgWidth = pageHeight * imgAspectRatio;
  }

  if (i !== 0) pdf.addPage();
  pdf.addImage(imageData, 'JPEG',
    (pageWidth - imgWidth) / 2, // center horizontally
    (pageHeight - imgHeight) / 2, // center vertically
    imgWidth,
    imgHeight
  );
}
