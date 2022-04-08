const path = require('path');

async function turnPostsIntoPages({graphql, actions}) {
  // 1. Get a template for this page
  const articuloTemplate = path.resolve('./src/templates/Articulo.js')
  // 2. Query all artists
  const {data} = await graphql(`
      query {
          articulos:   allSanityArticulosPage {
            nodes {
              title
              slug {
                current
              }
            }
          }
      }
  `);
  // 3. Loop over each artist and create a page for each artist
  data.articulos.nodes.forEach((articulo) => {
      actions.createPage({
          // url forths new page
          path: `/articulos/${articulo.slug.current}`,
          component: articuloTemplate,
          context: {
              language: 'es',
              slug: articulo.slug.current,
          }
      })
  });
}


exports.createPages = async (params) => {
// Create Pages dynamically
    await Promise.all([
        // 1. Posts
        turnPostsIntoPages(params),

    ])
}