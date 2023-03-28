import fs from 'fs';
import path from 'path';
import randomItem from 'random-item';

const audioFolder = path.join(process.cwd(), 'Songs');

export default function handler(req, res) {
  const files = fs.readdirSync(audioFolder);
  const randomFile = randomItem(files);
  const filePath = path.join(audioFolder, randomFile);
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size,
  });
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}
