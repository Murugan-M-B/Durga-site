const fs = require("fs");
const path = require("path");

// Predefined metadata for categories to give them a premium feel
const CATEGORY_METADATA = {
  "visiting-cards": {
    title: "Visiting Cards",
    accentColor: "#06B6D4", // Cyan
    description: "Premium business cards with matte, linen, or gold foil finishes that make a lasting professional statement."
  },
  "invitations": {
    title: "Wedding Invitations",
    accentColor: "#EF4444", // Crimson Red
    description: "Elegant wedding and celebration invitations featuring intricate borders, gold foil, and premium textures."
  },
  "kovil-invitation": {
    title: "Temple Cards",
    accentColor: "#EAB308", // Gold
    description: "Traditional devotional temple festival invitations printed with rich ink density and sacred motifs."
  },
  "brouchers": {
    title: "Brochures",
    accentColor: "#8B5CF6", // Violet
    description: "Sophisticated multi-fold corporate brochures designed to showcase your products and services with high-resolution clarity."
  },
  "hotel-menu-card": {
    title: "Hotel Menu Cards",
    accentColor: "#EC4899", // Pink
    description: "Durable, high-quality printed menu cards with custom lamination to elevate the dining experience."
  },
  "signature-card": {
    title: "Signature Cards",
    accentColor: "#6366F1", // Indigo
    description: "Executive signature cards on ultra-premium heavy-weight textured stocks for personal or professional branding."
  },
  "banners": {
    title: "Banners",
    accentColor: "#3B82F6", // Blue
    description: "High-impact outdoor and indoor banners with vibrant colors and durable, weather-resistant materials."
  },
  "car-pass": {
    title: "Car Passes",
    accentColor: "#F59E0B", // Amber
    description: "Custom car and vehicle passes with security printing, clear lettering, and durable finishes."
  },
  "pad": {
    title: "Writing Pads",
    accentColor: "#10B981", // Emerald Green
    description: "Branded office and prescription writing pads with clean grids, crisp logos, and premium easy-tear paper."
  },
  "stickers": {
    title: "Stickers",
    accentColor: "#14B8A6", // Teal
    description: "Precision-cut custom product and promotional stickers with gloss or matte weather-proof coatings."
  },
  "table-mate": {
    title: "Table Mates",
    accentColor: "#F97316", // Orange
    description: "Custom printed table mats, calendars, and organizers designed to keep your brand visible daily."
  },
  "wallposters": {
    title: "Wall Posters",
    accentColor: "#84CC16", // Lime
    description: "High-resolution large-format posters with brilliant color reproduction for advertising and display."
  }
};

// Fallback palette for new categories
const FALLBACK_COLORS = [
  "#3B82F6", "#8B5CF6", "#EC4899", "#EAB308", 
  "#10B981", "#F59E0B", "#EF4444", "#06B6D4"
];

// Helper to format names nicely (e.g. visiting-cards -> Visiting Cards)
function formatTitle(name) {
  return name
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateManifest() {
  // We scan public/durga-files or durga-files in root
  const rootDurgaFiles = path.join(__dirname, "../durga-files");
  const publicDurgaFiles = path.join(__dirname, "../public/durga-files");
  
  let sourceDir = "";
  if (fs.existsSync(publicDurgaFiles)) {
    sourceDir = publicDurgaFiles;
  } else if (fs.existsSync(rootDurgaFiles)) {
    sourceDir = rootDurgaFiles;
  } else {
    console.error("Error: Could not find 'durga-files' directory in root or public folder.");
    process.exit(1);
  }

  console.log(`Scanning directory: ${sourceDir}`);
  const items = fs.readdirSync(sourceDir);
  const categories = [];
  let fallbackColorIndex = 0;

  items.forEach((item) => {
    const itemPath = path.join(sourceDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const folderName = item;
      
      // Scan all image files in this folder
      const files = fs.readdirSync(itemPath);
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"];
      
      const images = files
        .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      if (images.length === 0) {
        console.log(`Skipping empty folder: ${folderName}`);
        return;
      }

      // Read metadata or generate fallbacks
      const meta = CATEGORY_METADATA[folderName] || {};
      const title = meta.title || formatTitle(folderName);
      const accentColor = meta.accentColor || FALLBACK_COLORS[fallbackColorIndex++ % FALLBACK_COLORS.length];
      const description = meta.description || `High-quality custom printing for ${title} items, crafted with attention to detail.`;

      // Map designs
      const designs = images.map((img) => {
        const ext = path.extname(img);
        const nameWithoutExt = path.basename(img, ext);
        
        // Clean name (replace URL escape codes if any, e.g., %20 -> space)
        let designTitle = decodeURIComponent(nameWithoutExt);
        // If the title is just a code like "VC1", let's split it nicely or format it: "VC1" -> "Design VC 1"
        // Let's keep it clean or make it a nice caption
        designTitle = formatTitle(designTitle);

        return {
          title: designTitle,
          imagePath: `/durga-files/${folderName}/${img}`
        };
      });

      // Cover image is the first image in the folder
      const coverImagePath = `/durga-files/${folderName}/${images[0]}`;

      categories.push({
        id: folderName,
        title,
        accentColor,
        description,
        coverImagePath,
        designs
      });
    }
  });

  // Sort categories by predefined metadata order to maintain a consistent landing layout
  const categoryOrder = Object.keys(CATEGORY_METADATA);
  categories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.id);
    const indexB = categoryOrder.indexOf(b.id);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const outputDir = path.join(__dirname, "../public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), "utf8");
  console.log(`Successfully generated manifest with ${categories.length} categories!`);
  console.log(`Saved to: ${outputPath}`);
}

generateManifest();
