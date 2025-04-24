document.getElementById('convertBtn').addEventListener('click', async () => {
  const input = document.getElementById('imageInput');
  const status = document.getElementById('status');
  status.innerText = "";

  if (!input.files.length) {
    alert("Please select JPG images.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    const imageData = await readFileAsDataURL(file);

    const img = new Image();
    img.src = imageData;
    await img.decode(); // Wait for image to load

    const width = pdf.internal.pageSize.getWidth();
    const height = (img.height * width) / img.width;
    if (i !== 0) pdf.addPage();
    pdf.addImage(imageData, 'JPEG', 0, 0, width, height);
  }

  pdf.save("converted.pdf");
  status.innerText = "PDF created successfully!";
});

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
