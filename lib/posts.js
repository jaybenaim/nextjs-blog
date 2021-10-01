import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/(\.md$)|(\.json$)/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    let data = {}


    if (fileName.includes('json')) {
      let jsonData = JSON.parse(fileContents)
      data['title'] = jsonData['title']
      data['date'] = jsonData['date']
    } else if (fileName.includes('md')) {
      data = matter(fileContents).data
    }

    // Combine the data with the id
    return {
      id,
      ...data
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/(\.md$)|(\.json$)/, '')
      }
    }
  })
}

export function getPostById(id) {
    const fullPath = path.join(postsDirectory, `post-${id}.json`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
}