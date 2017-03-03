/* eslint-disable no-multi-spaces, key-spacing */

export const mobileMaxWidthAndAddCss = (css) => `
  @media(max-width: 768px) {
    ${css.toString()}
  }
`;


//
// Breakpoints are the px value when we transition to a new layout.
//
const TABLET  = 769;
const DESKTOP = 960;

//
// Static map of named media queries to help with DX.
//
export const mediaQuery = {
  mobileOnly: 'mobileOnly',
  tablet: 'tablet',
  desktop: 'desktop',
};

//
// The specific media queries needed for ranges of display sizes.
//
const mediaQueryExpressions = {
  mobileOnly: `(max-width: ${(TABLET - 1) / 16}em)`,
  tablet:     `(min-width: ${TABLET / 16}em)`,
  desktop:    `(min-width: ${DESKTOP / 16}em)`,
};

/**
 * Wrap the given CSS in the requested media query.
 *
 * @param {string} mediaQueryName Name of the media query to output.
 * @param {string} css The CSS to wrap.
 */
export const respondTo = (mediaQueryName, css) => `
  @media ${mediaQueryExpressions[mediaQueryName]} {
    ${css.toString()}
  }
`;
