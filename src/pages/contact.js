import { graphql } from "gatsby";
import React from "react";
import PropTypes from "prop-types";

import Layout from "components/layout";
import TextBody from "components/textbody";
import Profiles from "components/profiles";

const ContactPage = ({
  data: {
    page: {
      html: __html,
      frontmatter: { title }
    },
    social: { profiles }
  }
}) => (
  <Layout>
    <main>
      <h1>{title}</h1>
      <TextBody dangerouslySetInnerHTML={{ __html }} />
      <TextBody>
        <Profiles {...{ profiles }} />
      </TextBody>
    </main>
  </Layout>
);
ContactPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({ title: PropTypes.string })
    }),
    social: PropTypes.shape({
      profiles: PropTypes.array.isRequired
    })
  })
};

export default ContactPage;

export const query = graphql`
  {
    page: markdownRemark(frontmatter: { path: { eq: "/contact" } }) {
      frontmatter {
        title
      }
      html
    }
    social: allSocialprofilesYaml {
      profiles: edges {
        node {
          profile {
            title
            href
            username
            description
          }
        }
      }
    }
  }
`;
