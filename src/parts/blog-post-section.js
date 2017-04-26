import React from 'react';

function BlogPostSection({ section, i13nConfig }) {
  // debugger;
  const BlogPostSectionHeadingElement =
        typeof i13nConfig !== 'undefined' && typeof i13nConfig.modules.BlogPostSectionModule !== 'undefined' ?
        i13nConfig.i13nOperations.generateI13nNode('h3', true) :
        'h3';

  if (typeof i13nConfig !== 'undefined' && typeof i13nConfig.modules.BlogPostSectionModule !== 'undefined') {
    let BlogPostSectionHeadingElement = i13nConfig.i13nOperations.generateI13nNode('h3', true);
    const i13nModel = i13nConfig.i13nOperations.createI13nModel(
        i13nConfig.i13nOperations.createModuleItem({
          id: 'TestBlogPostSection',
          module_id: i13nConfig.modules.BlogPostSectionModule.module.id,
          position: 1,
          type: 'content',
          name: 'Test title section',
          destination: 'http://www.test.com',
        }),
      'tedl');
  } else {
    let BlogPostSectionHeadingElement = 'h3';
  }

  return (
    <BlogPostSectionHeadingElement
      className="blog-post__section"
      itemProp="articleSection"
      i13nModel={typeof i13nModel === 'undefined' ? null : i13nModel}
    >{section}</BlogPostSectionHeadingElement>
  );
}

BlogPostSection.propTypes = {
  section: React.PropTypes.node.isRequired,
};

export default BlogPostSection;
