import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import { Layout, Listing, Wrapper, Title } from 'components';

const Hero = styled.header`
  background-color: ${props => props.theme.colors.greyLight};
  display: flex;
  align-items: center;
`;

const HeroInner = styled(Wrapper)`
  padding-top: 3rem;
  padding-bottom: 3rem;
  h1 {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.5rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;

const HeroImage = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  img {
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
  }
`;

const HeroText = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  li {
    display: inline;
    &:not(:first-child) {
      margin-left: 2.5rem;
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${props => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`;

const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${props => props.theme.colors.black};
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`;

const WorkListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    &:before {
      content: "\f6d1";
      font-family: "Font Awesome 5 Free";
      display: inline-block;
      margin-left: -1.4em;
      width: 1.4em;
      font-weight: 900;
      color: #e5e5e5;
      font-size: 3em;
      position: absolute;
    }
  }
`;

class Index extends Component {
  render() {
    const {
      data: { homepage, social, works, posts, projects },
    } = this.props;
    return (
      <Layout>
        <Hero>
          <HeroInner>
            <HeroImage>
              <img src='https://avatars1.githubusercontent.com/u/4486133?s=460&v=4' />
            </HeroImage>
            <h1>{homepage.data.title.text}</h1>
            <h2>{homepage.data.subtitle.text}</h2>
            <HeroText dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />
            <Social>
              {social.edges.map(s => (
                <li key={s.node.primary.label.text}>
                  <a href={s.node.primary.link.url}>{s.node.primary.label.text}</a>
                </li>
              ))}
            </Social>
          </HeroInner>
        </Hero>
        <Wrapper style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Title style={{ marginTop: '8rem' }}>Experience</Title>
          <WorkListing>
            {works.edges.map(work => (
              <li key={work.node.data.title.text}>
                {work.node.data.fromdate} - {new Date(parseInt(work.node.data.todate.substring(6,10)),parseInt(work.node.data.todate.substring(3,5))-1,parseInt(work.node.data.todate.substring(0,2))) > new Date() ? 'Present' : work.node.data.todate}
                <h3>{work.node.data.title.text} - <em>{work.node.data.company.text}</em></h3>
                {work.node.data.location.text}
              </li>
            ))}
          </WorkListing>
          <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
          <Listing posts={posts.edges} />
          <Title style={{ marginTop: '8rem' }}>Recent projects</Title>
          <ProjectListing>
            {projects.edges.map(project => (
              <li key={project.node.primary.label.text}>
                <a href={project.node.primary.link.url}>{project.node.primary.label.text}</a>
              </li>
            ))}
          </ProjectListing>
        </Wrapper>
      </Layout>
    );
  }
}

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        subtitle {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      edges {
        node {
          primary {
            label {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    works: allPrismicWork(sort: { fields: [data___fromdate], order: DESC }) {
      edges {
        node {
          data {
            title {
              text
            }
            company {
              text
            }
            location {
              text
            }
            fromdate(formatString: "DD.MM.YYYY")
            todate(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      edges {
        node {
          primary {
            label {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
  }
`;
