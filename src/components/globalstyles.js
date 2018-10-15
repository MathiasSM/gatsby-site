import { createGlobalStyle } from "styled-components";

import katex from "katex/dist/katex.min.css";
import prism from "prismjs/themes/prism-solarizedlight.css";

import withColors from "./withcolors";

export const GlobalComp = createGlobalStyle`
    body, html {
      height: 100%;
      margin: 0;
      overflow: auto;
    }
    #___gatsby {
      height: 100%;
      & > * {
        height: 100%;
      }
    }
    a {
      text-decoration: none;
      color: ${props => props.color.accent.hslString}
    }
    pre {
      overflow-x: auto;
      max-width: 100%;
    }
`;

const Global = withColors(GlobalComp);

export default Global;
