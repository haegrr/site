const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Martin',
    version: pkg.version,
    description: 'Programming, video games, music, electronics engineering, and all things DIY.',
    siteUrl: 'https://ma.rtin.foo',
    author: 'Martin Häger',
    email: 'm@rtin.foo',
    social: {
      bluesky: 'ma.rtin.foo',
      github: 'haegrr',
      replit: 'haegrr',
    },
  },
  jsxRuntime: 'automatic',
  plugins: [{
    resolve: 'eslint-plugin-gatsby',
      options: {
        extensions: ['js'],
        failOnError: false,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [{
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}/post/${edge.node.fields.slug}/`,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              });
            });
          },
          query: `
            {
              allMarkdownRemark(
                filter: { fields: { collection: { eq: "posts" } } }
                sort: { frontmatter: { date: DESC } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          title: 'Martin',
        }],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Martin',
        display: 'standalone',
        start_url: '/',
        background_color: 'floralwhite',
        theme_color: 'aliceblue',
        icon: `${__dirname}/assets/images/icon.png`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/assets/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- jump -->',
        plugins: [
          'gatsby-remark-embed-video',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-draw',
            options: {
              mermaid: {
                theme: 'forest',
              },
            },
          },
          {
            resolve: 'gatsby-remark-embed-snippet',
            options: {
              directory: `${__dirname}/examples/`,
            },
          },
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_self',
            },
          },
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              background: 'rgba(255, 255, 255, 0.9)',
            },
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/changelog',
          '/tag/**',
        ],
      },
    },
    'gatsby-transformer-sharp',
  ],
};
