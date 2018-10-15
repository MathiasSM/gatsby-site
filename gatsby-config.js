require("dotenv").config();
const color = require("./data/config/colorHSL.json");

/*
 * Globally accesible metadata
 */
const siteMetadata = {
  title: "MathiasSM",
  subtitle: "Computer Science Student",
  description: "Personal site, portfolio and blog",
  owner: "Mathias San Miguel",
  since: 2013,
  sections: [
    { title: "Blog", path: "/blog" },
    { title: "Showcase", path: "/showcase" },
    { title: "Contact", path: "/contact" }
  ],
  siteUrl: process.env.SITE_URL
};

/**
 * Type mappings so that we can 'Join' info from multiple sources
 */
const mapping = {
  "ProjectsYaml.project.team": "PeopleYaml",
  "ProjectsYaml.project.status": "StatusesYaml"
};

/**
 * List of gatsby plugins we use
 */
const gatsbyPlugins = [
  // Generate sitemap in production. Defaults are ok
  "gatsby-plugin-sitemap",
  // Handle images
  "gatsby-plugin-sharp",
  // Catch local <a> links to Link
  "gatsby-plugin-catch-links",
  // Dynamic head meta tags
  "gatsby-plugin-react-helmet",
  // Inject font styles
  {
    resolve: "gatsby-plugin-styled-components",
    options: { pure: true }
  },
  {
    resolve: "gatsby-plugin-typography",
    options: { pathToConfigModule: "src/utils/typography.js" }
  },
  // Adds custom robots.txt to production site
  {
    resolve: "gatsby-plugin-robots-txt",
    options: { policy: [{ userAgent: "*", allow: "/" }] }
  },
  // Adds a web app manifest
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `${siteMetadata.title} ${siteMetadata.subtitle}`,
      short_name: siteMetadata.title,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: color.primary,
      display: `minimal-ui`,
      icon: `src/images/logo.svg`
    }
  }
];

/**
 * Remark code blocks
 */
const gatsbyRemarkCodeBlocks = [
  // Generates svg graphs from mermaid, dot code blocks
  "gatsby-remark-draw",
  // Generates titles for code blocks
  {
    resolve: "gatsby-remark-code-titles",
    options: { className: "your-custom-class-name" }
  },
  // Syntax highlighting. Defaults are ok
  "gatsby-remark-prismjs",
  {
    resolve: "gatsby-remark-embed-snippet",
    options: {
      directory: `${__dirname}/data/code/`
    }
  }
];

/**
 * Remark links
 */
const gatsbyRemarkLinks = [
  // Generates anchor links to headers in markdown
  "gatsby-remark-autolink-headers",
  // Link anything on <a> <audio> <video> or <image>
  "gatsby-remark-copy-linked-files",
  // Add rel=stuff to external links (SEO?)
  {
    resolve: "gatsby-remark-external-links",
    options: { target: null, rel: "nofollow noopener" }
  }
];

/**
 * Remark Images
 */
const gatsbyRemarkImages = [
  // Unwrap markdown images from the generated <p>
  "gatsby-remark-unwrap-images",
  // Responsive by: Elastic, Multiple versions, Blurs
  {
    resolve: "gatsby-remark-images",
    options: { maxWidth: 900 }
  },
  // Copies images (svg and gif) without processing
  "gatsby-remark-static-images"
];

/**
 * Remark new syntax
 */
const gatsbyRemarkSyntax = [
  // Generates html math nodes
  "gatsby-remark-katex",
  // Embed youtube/others videos easily and consistently
  "gatsby-remark-embed-video",
  // HTML sup and sub
  "gatsby-remark-sub-sup",
  // Custom div classes in markdown
  {
    resolve: "gatsby-remark-custom-blocks",
    options: {
      blocks: {
        danger: "custom-block-danger",
        warning: "custom-block-warning",
        info: "custom-block-info"
      }
    }
  }
];

/**
 * List of remark plugins we use
 */
const gatsbyRemarkPlugins = [
  // Adds sourceName to markdown nodes
  "gatsby-remark-source-name",
  // Elegant quotes, ellipsis and dashes
  "gatsby-remark-smartypants",
  // Removes widow words via nbs
  "gatsby-remark-widows",
  ...gatsbyRemarkSyntax,
  ...gatsbyRemarkCodeBlocks,
  ...gatsbyRemarkImages,
  ...gatsbyRemarkLinks,
  // Adds aria attributes for accessibility. Needs to be at the end
  "gatsby-remark-a11y-emoji"
];

/**
 * List of gatsby transform plugins we use
 */
const gatsbyTransforms = [
  "gatsby-transformer-yaml",
  "gatsby-transformer-json",
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: gatsbyRemarkPlugins
    }
  },
  "git"
];

/**
 * List of gatsby source plugins we use
 */
const gatsbySources = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "blog",
      path: `${__dirname}/data/blog/`
    }
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "pages",
      path: `${__dirname}/data/pages/`
    }
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "config",
      path: `${__dirname}/data/config/`
    }
  }
];

/**
 * Config exports
 */
module.exports = {
  siteMetadata,
  plugins: [...gatsbyPlugins, ...gatsbyTransforms, ...gatsbySources],
  mapping
};
