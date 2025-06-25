import { graphql, Link } from 'gatsby';
import { Card, Button } from 'semantic-ui-react';

import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Head from '../components/Head';
import Tag from '../components/Tag';

const BlogTemplate = ({ data, pageContext, location }) => {
	const posts = data.allMarkdownRemark.edges;
	const { pageNumber, totalPages } = pageContext;

	return (
		<Layout>
			<Head title='Blog' location={location} />
			{posts.length > 0 ?
				posts.map(({ node }) => {
					const { title, tags } = node.frontmatter;
					const url = `/post/${node.fields.slug}`;

					return (
						<Card raised fluid key={node.fields.slug}>
							<Card.Content>
								<Card.Header as={Link} to={url}>
									<h1>{title}</h1>
								</Card.Header>
								<Card.Description>
									<div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								{tags.length > 0 &&
								<Tag.Group style={{ float: 'left' }}>
									{tags.map((t, i) => (
										<Tag key={i} name={t}/>
									))}
								</Tag.Group>
								}
								<Button as={Link} color='blue' to={url} floated='right' size='tiny'>Read</Button>
							</Card.Content>
						</Card>
					);
				}
				) : (
					<p>There are no posts to show.</p>
				)
			}

			{totalPages > 1 &&
			<Pagination
				activePage={pageNumber}
				totalPages={totalPages}
				urlForPage={p => p === 1 ? '/' : `/blog/${p}`}
			/>
			}
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
