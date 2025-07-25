import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Head from '../components/Head';
import PostList from '../components/PostList';

const BlogTemplate = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const { pageNumber, totalPages } = pageContext;

  return (
    <Layout>
      <Head title='Blog' location={location} />
      <PostList posts={posts} pageNumber={pageNumber} totalPages={totalPages} />
    </Layout>
  );
};

export default BlogTemplate;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 300, format: HTML)
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
