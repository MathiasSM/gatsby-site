import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Footer = styled.footer`
  margin-top: 3rem;
`;

const MainFooter = ({ owner, since }) => (
  <Footer>{`${owner} © ${since}-Present`}</Footer>
);

MainFooter.propTypes = {
  owner: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired
};

export default MainFooter;
