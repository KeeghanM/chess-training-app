const fs = require('fs')
const path = require('path')

function getAllFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath))
    } else if (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) {
      files.push(fullPath)
    }
  }

  return files
}

const SRC_DIR =
  '/home/keeghan/repos/chess-training-app/apps/chess-training-app/src'
const files = getAllFiles(SRC_DIR)

let count = 0

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8')
  let changed = false

  // Replace import { withAuth } with import { apiWrapper }
  if (content.includes('import { withAuth }')) {
    content = content.replace('import { withAuth }', 'import { apiWrapper }')
    changed = true
  }

  // Replace from '.../with-auth' with from '.../api-wrapper'
  // Handles @utils/with-auth, ~/utils/with-auth, ./with-auth, ../utils/with-auth
  if (content.match(/from ['"].*\/with-auth['"]/)) {
    content = content.replace(
      /(from ['"].*)\/with-auth(['"])/g,
      '$1/api-wrapper$2',
    )
    changed = true
  }

  // Replace withAuth( with apiWrapper(
  if (content.includes('withAuth(')) {
    content = content.replace(/withAuth\(/g, 'apiWrapper(')
    changed = true
  }

  if (changed) {
    fs.writeFileSync(file, content)
    console.log(`Updated ${file}`)
    count++
  }
})

console.log(`\nRefactored ${count} files.`)
