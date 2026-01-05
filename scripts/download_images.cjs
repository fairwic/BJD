
const fs = require('fs');
const path = require('path');
const https = require('https');

const data = [
  {
    "category": "Japanese IP",
    "name": "鬼灭之刃",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/E6pVvp8CS1.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "火影忍者",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/EFJcwT97J0.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "Hello Kitty",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/EFwOWOvTHl.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "名侦探柯南",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/EaExvYtbSY.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "吉伊卡哇",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/E6p2uISH8q.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "VOCALOID",
    "imageUrl": "https://cdn.qiandaoapp.com/interior/images/ritPyueNSeNuybsRiCPg7kqiSanmbeay.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "蜡笔小新",
    "imageUrl": "https://cdn.qiandaoapp.com/interior/images/ojdOi8ThihH3uOheuyaAetFChQ338hKg.jpg!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "文豪野犬",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/E6pqzMV0bo.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "咒术回战",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/E6pzR55q4K.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "魔法少女小圆",
    "imageUrl": "https://cdn.qiandaoapp.com/interior/images/ieiXh471nnngnonlMfGknbgOjVfbwiFj.png!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "排球少年",
    "imageUrl": "https://public.qiandaocdn.com/interior/images/E5Ba3tuHvN.jpeg!lfit_w240"
  },
  {
    "category": "Japanese IP",
    "name": "间谍过家家",
    "imageUrl": "https://cdn.qiandaoapp.com/interior/images/iKWz0ewWu2Pp0ivnadocoqa0mialRdnd.png!lfit_w240"
  },
  {
    "category": "BJD Brand",
    "name": "龙魂人形社",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/9579871f8ce8d49218c496813688d230.jpg?imginfo=w180,h180!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "DollZone",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/d3c1d55b60eaffbfc4f373d3668e18e0.jpg?imginfo=w169,h169!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "Soom",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/f2d678c0f536d1bab094e5891a2d8f88.jpg?imginfo=w150,h150!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "IxDoll妹头",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/531cabadc2c7bd0fa89b4035906bf1db.png?imginfo=w168,h168!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "Volks",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/300cfae6dcd5cf40453f5dc52076d890.png?imginfo=w360,h360!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "薇娅娃娃",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/7bfe24a28b5af39e8cba5ce8412c2eb6.png?imginfo=w168,h168!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "ASDOLL天使工房",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/5555309e57b31d0904eafd1868b7af0e.jpg?imginfo=w342,h342!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "Azone",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/4d4013974fe296b56674c54599157488.png?imginfo=w360,h360!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "蘑菇王国的不二臣",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/f095b57528bdaad6ee2012c27b43653b.jpg?imginfo=w996,h996!fill_w480_h480_jpg"
  },
  {
    "category": "BJD Brand",
    "name": "Mystic Kids",
    "imageUrl": "https://treasure.qiandaocdn.com/treasure/images/7d60f9ef88c71e7f1007eb2c5a0790ae.jpg?imginfo=w148,h148!fill_w480_h480_jpg"
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
             downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        } else {
             reject(new Error(`Status Code: ${res.statusCode}`));
        }
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const resultMapping = {};
  
  for (const item of data) {
    const isIP = item.category === 'Japanese IP';
    const folder = isIP ? 'public/images/ips' : 'public/images/brands';
    // Clean name
    const safeName = item.name.replace(/[\/\\:*?"<>|]/g, '');
    let ext = path.extname(item.imageUrl.split('!')[0].split('?')[0]); 
    if (!ext || ext.length > 5) ext = '.png'; // Fallback
    
    // Fix extension if missing dot or url params
    
    const filename = `${safeName}${ext}`;
    const filepath = path.join(__dirname, '..', folder, filename);
    
    console.log(`Downloading ${item.name} to ${filepath}...`);
    
    try {
        await downloadImage(item.imageUrl, filepath);
        
        // Store relative path for frontend - REMOVE 'public' prefix for serving
        const publicPath = `/${folder.replace('public/', '')}/${filename}`;
        
        if (!resultMapping[item.category]) {
            resultMapping[item.category] = [];
        }
        resultMapping[item.category].push({
            name: item.name,
            path: publicPath
        });
        
    } catch (e) {
        console.error(`Failed to download ${item.name}:`, e.message);
    }
  }
  
  // Write the mapping to a file
  fs.writeFileSync(path.join(__dirname, '../src/data/scraped_data.json'), JSON.stringify(resultMapping, null, 2));
  console.log('Done!');
};

main();
