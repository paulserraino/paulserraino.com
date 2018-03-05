const path = require('path');

/**
 * Create Pages
 *
 * Provides blog post data to component pages
 *
 * @param {Object} dependency object - { boundActionCreators, graphql }
 * @return {Promise} GraphQL response
 */
exports.createPages = ({ boundActionCreators, graphql }) => {

  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  const blogPostQuery = `{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
            path
            title
            summary
            thumbnailRef
          }
        }
      }
    }
  }
  `;

  return graphql(blogPostQuery)
    .then(result => {
      if (result.errors) return Promise.reject(result.errors);

      let edges = result.data.allMarkdownRemark.edges;

      edges.forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: blogPostTemplate,
            context: {} // additional data can be passed via context
          });
        });
    })
    .catch(console.error);
}
