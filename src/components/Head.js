import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Head = ({ description, lang, meta, keywords, title, location }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `}
    render={({ site }) => {
      const metaDescription = description || site.siteMetadata.description;
      const canonicalUrl = `${site.siteMetadata.siteUrl}${location.pathname}`;
      return (
        <Helmet
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          link={[
            {
              rel: 'canonical',
              key: canonicalUrl,
              href: canonicalUrl,
            }
          ]}
        >
          <html lang={lang} />
          <title>{title}</title>
          <meta name="description" content={metaDescription} />
          <meta name="og:title" content={title} />
          <meta name="og:description" content={metaDescription} />
          <meta name="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content={site.siteMetadata.author} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={metaDescription} />
          {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
          {meta.map(({ name, content }, i) => (
            <meta key={i} name={name} content={content} />
          ))}
        </Helmet>
      );
    }}
  />
);

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

Head.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
};

export default Head;
