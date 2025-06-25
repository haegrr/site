import { graphql } from 'gatsby';
import { Segment, Header, Divider } from 'semantic-ui-react';

import Layout from '../components/Layout';
import Head from '../components/Head';

const PostTemplate = ({ pageContext, data, location }) => {
  const post = data.markdownRemark;
  const { social } = data.site.siteMetadata;
  const { slug, hasExample } = pageContext;

  return (
    <Layout>
      <Head title={post.frontmatter.title} location={location} />
      <Segment raised>
        <Header as='h1'>
          {post.frontmatter.title}
          <Header.Subheader>
            Published on {post.frontmatter.date}
          </Header.Subheader>
        </Header>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        <Divider />
        <p>
          <em>
            Enjoyed this post? Got feedback?
            Consider following <a href={`https://bsky.app/profile/${social.bluesky}`}>@{social.bluesky}</a> for the latest updates.
          </em>
        </p>
        <p>
          <em>
            This post{hasExample && <>, excluding sample code,</>} is licensed under a <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
            Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
            {hasExample &&
              <> See the <a href={`https://replit.com/@${social.replit}/${slug}`}>example directory</a> for code licensing.</>
            }
          </em>
        </p>
      </Segment>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        social {
          bluesky
          replit
        }
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
      }
    }
  }
`;
