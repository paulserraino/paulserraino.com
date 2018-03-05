import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

// TODO: get sharp plugin working
import defaultThumb from '../images/default-logo.png';
import lambdaThumb from '../images/lambda-logo.png';
import railsThumb from '../images/rails-logo.png';
import reduxThumb from '../images/redux-logo.png';
import fluxThumb from '../images/flux-logo.png';

const thumbnailMap = {
  'lambda-logo': lambdaThumb,
  'rails-logo': railsThumb,
  'redux-logo': reduxThumb,
  'flux-logo': fluxThumb
}

const getThumbnail = (path) => (thumbnailMap[path] || defaultThumb);
const renderThumbail = (path) => (
  window.innerWidth <= 510 ?
  null :
  (<img className="blog__img--thumbnail" src={getThumbnail(path)} />)
);

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog blog__div--container">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog__div--preview" key={post.id}>
              <Link to={post.frontmatter.path}>
                <div className="blog__div--row">
                  <div className="blog__div--col-1">
                    {renderThumbail(post.frontmatter.thumbnailRef)}
                  </div>
                  <div className="blog__div--col-2">
                    <h1 className="blog__h1--title">{post.frontmatter.title}</h1>
                    <p className="blog__p--summary">{post.frontmatter.summary}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            summary
            thumbnailRef
          }
        }
      }
    }
  }
`;
