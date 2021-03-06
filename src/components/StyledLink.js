import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #395983;
  }

  &:hover {
    color: darkblue;
  }
`;

export default (props) => <StyledLink {...props} />;
