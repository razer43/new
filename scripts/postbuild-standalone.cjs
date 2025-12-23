const fs = require('node:fs')
const path = require('node:path')

function copyDirOrFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[postbuild] Skipping missing path: ${src}`)
    return
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.cpSync(src, dest, { recursive: true, force: true })
  console.log(`[postbuild] Copied ${src} -> ${dest}`)
}

// Next.js standalone output does NOT include these by default.
copyDirOrFile(path.join('.next', 'static'), path.join('.next', 'standalone', '.next', 'static'))
copyDirOrFile('public', path.join('.next', 'standalone', 'public'))



