const colorPalettes = [
	["#F9D949", "#F45050", "#3C486B", "#F0F0F0"],
	["#1A5F7A", "#159895", "#002B5B", "#F9F5EB"],
	["#FF8787", "#F8C4B4", "#E5EBB2", "#BCE29E"],
	["#0081B4", "#FDF7C3", "#FFB100", "#FFDEB4"],
	["#7D6E83", "#DFD3C3", "#F8EDE3", "#D0B8A8"]
];

function generateRandomTileDesign() {
	const palette =
		colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
	return {
		backgroundColor: palette[Math.floor(Math.random() * palette.length)],
		colors: [...palette].sort(() => Math.random() - 0.5),
		pattern: Math.floor(Math.random() * 4)
	};
}

function renderPattern(design, size) {
	const { backgroundColor, colors, pattern } = design;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.style.width = size;
	svg.style.height = size;

	const patterns = [
		// Simple geometric
		() => {
			svg.innerHTML = `
            <rect width="100" height="100" fill="${backgroundColor}" />
            <rect x="10" y="10" width="80" height="80" fill="${colors[0]}" />
            <rect x="20" y="20" width="60" height="60" fill="${colors[1]}" />
            <rect x="30" y="30" width="40" height="40" fill="${colors[2]}" />
          `;
		},
		// Diagonal stripes
		() => {
			svg.innerHTML = `
            <rect width="100" height="100" fill="${backgroundColor}" />
            <path d="M0 0 L100 100" stroke="${colors[0]}" stroke-width="20" />
            <path d="M0 50 L50 100" stroke="${colors[1]}" stroke-width="15" />
            <path d="M50 0 L100 50" stroke="${colors[2]}" stroke-width="15" />
          `;
		},
		// Circles
		() => {
			svg.innerHTML = `
            <rect width="100" height="100" fill="${backgroundColor}" />
            <circle cx="50" cy="50" r="40" fill="${colors[0]}" />
            <circle cx="50" cy="50" r="30" fill="${colors[1]}" />
            <circle cx="50" cy="50" r="20" fill="${colors[2]}" />
          `;
		},
		// Triangles
		() => {
			svg.innerHTML = `
            <rect width="100" height="100" fill="${backgroundColor}" />
            <polygon points="50,10 90,90 10,90" fill="${colors[0]}" />
            <polygon points="50,30 80,80 20,80" fill="${colors[1]}" />
            <polygon points="50,50 70,70 30,70" fill="${colors[2]}" />
          `;
		}
	];

	patterns[pattern]();
	return svg;
}

let designs = Array(16).fill(null).map(generateRandomTileDesign);
let selectedTile = null;

function renderTiles() {
	const grid = document.getElementById("tileGrid");
	grid.innerHTML = "";
	designs.forEach((design, index) => {
		const tile = document.createElement("div");
		tile.className = "tile";
		tile.appendChild(renderPattern(design, "100%"));
		tile.addEventListener("click", () => selectTile(design));
		grid.appendChild(tile);
	});
}

function selectTile(design) {
	selectedTile = design;
	const selectedTileElement = document.getElementById("selectedTile");
	selectedTileElement.innerHTML = "";
	selectedTileElement.appendChild(renderPattern(design, "100px"));
	document.getElementById("saveBtn").textContent = "Save Wallpaper";
}

function generateNewTiles() {
	designs = Array(16).fill(null).map(generateRandomTileDesign);
	renderTiles();
	selectedTile = null;
	document.getElementById("selectedTile").innerHTML = "";
	document.getElementById("saveBtn").textContent = "Save Grid";
}

function createRepeatedTileWallpaper(tile) {
	const tileSize = 200;
	const wallpaperWidth = 1920;
	const wallpaperHeight = 1080;

	const canvas = document.createElement("canvas");
	canvas.width = wallpaperWidth;
	canvas.height = wallpaperHeight;
	const ctx = canvas.getContext("2d");

	const svgString = new XMLSerializer().serializeToString(
		renderPattern(tile, `${tileSize}px`)
	);
	const img = new Image();
	img.onload = () => {
		for (let y = 0; y < wallpaperHeight; y += tileSize) {
			for (let x = 0; x < wallpaperWidth; x += tileSize) {
				ctx.drawImage(img, x, y, tileSize, tileSize);
			}
		}
		downloadCanvas(canvas, "barcelona-tile-wallpaper.png");
	};
	img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

function saveGrid() {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const tileSize = 200;
	canvas.width = tileSize * 4;
	canvas.height = tileSize * 4;

	let loadedTiles = 0;
	designs.forEach((design, index) => {
		const row = Math.floor(index / 4);
		const col = index % 4;
		const x = col * tileSize;
		const y = row * tileSize;

		const svgString = new XMLSerializer().serializeToString(
			renderPattern(design, `${tileSize}px`)
		);
		const img = new Image();
		img.onload = () => {
			ctx.drawImage(img, x, y, tileSize, tileSize);
			loadedTiles++;
			if (loadedTiles === designs.length) {
				downloadCanvas(canvas, "beautiful-barcelona-tiles.png");
			}
		};
		img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
	});
}

function downloadCanvas(canvas, filename) {
	canvas.toBlob((blob) => {
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, "image/png");
}

document
	.getElementById("generateBtn")
	.addEventListener("click", generateNewTiles);
document.getElementById("saveBtn").addEventListener("click", () => {
	if (selectedTile) {
		createRepeatedTileWallpaper(selectedTile);
	} else {
		saveGrid();
	}
});

renderTiles();
