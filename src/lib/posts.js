// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'

// const postsDirectory = path.join(process.cwd(), 'posts')

// export function getAllPostIds() {
//     const fileNames = fs.readdirSync(postsDirectory);
  
//     // Returns an array that looks like this:
//     // [
//     //   {
//     //     params: {
//     //       id: 'ssg-ssr'
//     //     }
//     //   },
//     //   {
//     //     params: {
//     //       id: 'pre-rendering'
//     //     }
//     //   }
//     // ]
//     return fileNames.map((fileName) => {
//       return {
//         params: {
//           id: fileName.replace(/\.md$/, ''),
//         },
//       };
//     });
// }