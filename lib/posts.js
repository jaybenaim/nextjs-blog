import fs from 'fs'
import path from 'path'

const postsDataPath = path.join(process.cwd(), 'posts/allPosts.json')
const fileContents = fs.readFileSync(postsDataPath, 'utf8')
const parsedData = JSON.parse(fileContents)

export function getSortedPostsData() {
  const sortedData = parsedData.sort(({ date: a }, { date: b }) => {
    a < b && -1
    a > b && 1
    return 1
  })

  return sortedData
}

export function getAllPostIds() {
  return parsedData.map(post => {
    return {
      params: {
        id: String(post.id)
      }
    }
  })
}

export function getPostById(id) {
  return parsedData.filter((post) => String(post.id) === String(id))[0]
}