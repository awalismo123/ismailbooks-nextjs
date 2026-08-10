const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const PRODUCTION_DIR = 'C:\\Users\\ismail abdi\\Downloads\\ismailbooks backup and whole files from production\\public';

async function createBucketIfNotExists(bucketName, isPublic = true) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets.find((b) => b.name === bucketName);
  if (!exists) {
    console.log(`Creating bucket: ${bucketName}...`);
    const { error } = await supabase.storage.createBucket(bucketName, { public: isPublic });
    if (error) console.error(`Failed to create bucket ${bucketName}:`, error.message);
  } else {
    console.log(`Bucket ${bucketName} already exists.`);
  }
}

async function uploadFile(bucket, filePath, destinationPath, contentType) {
  const fileContent = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from(bucket).upload(destinationPath, fileContent, {
    contentType,
    upsert: true,
  });
  if (error) {
    console.error(`Failed to upload ${destinationPath}:`, error.message);
  } else {
    console.log(`Uploaded ${destinationPath}`);
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.epub') return 'application/epub+zip';
  if (ext === '.html') return 'text/html; charset=UTF-8';
  if (ext === '.json') return 'application/json; charset=UTF-8';
  return 'application/octet-stream';
}

async function main() {
  await createBucketIfNotExists('covers', true);
  await createBucketIfNotExists('book-content', true);

  // Upload Covers
  const uploadsDir = path.join(PRODUCTION_DIR, 'uploads');
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      if (file.startsWith('cover_') || file.startsWith('summary_cover_')) {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          await uploadFile('covers', filePath, file, getContentType(file));
        }
      }
    }
  }

  // Upload Book Content
  const bookContentDir = path.join(PRODUCTION_DIR, 'book-content');
  if (fs.existsSync(bookContentDir)) {
    const folders = fs.readdirSync(bookContentDir);
    for (const folder of folders) {
      const folderPath = path.join(bookContentDir, folder);
      const stats = fs.statSync(folderPath);
      if (stats.isDirectory()) {
        const bookFiles = fs.readdirSync(folderPath);
        for (const file of bookFiles) {
          const filePath = path.join(folderPath, file);
          const fileStats = fs.statSync(filePath);
          if (fileStats.isFile()) {
            await uploadFile('book-content', filePath, `${folder}/${file}`, getContentType(file));
          }
        }
      }
    }
  }

  console.log("Uploads complete!");
}

main().catch(console.error);
