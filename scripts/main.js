const footer = document.querySelector("footer");
/*In order to ensure the footer will always be at the bottom without overlapping content
apply padding-bottom to body based off the footers height. This ensures even if more content is added. the footer
will not overlap */

// Calculate the footer height
const footerHeight = footer.offsetHeight;

// Apply padding to the body equal to the footer height
document.body.style.paddingBottom = footerHeight + "px";