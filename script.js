//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(img);
		img.onerror = () => reject(`Failed to load image: ${url}`);
	});
}

async function downloadImages() {
	const loadingDiv = document.getElementById("loading");
	const errorDiv = document.getElementById("error");
	const outputDiv = document.getElementById("output");
	
	loadingDiv.style.display = "block";
	errorDiv.innerHTML = "";
	outputDiv.innerHTML = "";

	try {
		const images = await Promise.all(imageUrls.map(downloadImage));
		images.forEach(img => outputDiv.appendChild(img));
	} catch (error) {
		console.log(error);
		errorDiv.innerHTML = error;
	} finally {
		loadingDiv.style.display = "none";
	}
}
