import React from 'react';
import classnames from 'classnames';

export function siblingList(
  articlesList,
  flyTitle,
  elementClassName,
  sectionName,
  sideText
) {
  const blogSideText = sideText ? sideText : `More in this ${ sectionName.toLowerCase() }:`;
  /* eslint-disable quotes*/
  return (
    <div className={`blog-post__${ elementClassName }-aside`}>
      <span className="blog-post__side-flytitle">{flyTitle}</span>
      <span className="blog-post__side-text">{blogSideText}</span>
      <ul className={`blog-post__${ elementClassName }-list`}>
        {articlesList.map((article, index) => {
          const isCurrentArticleSelected = article.flyTitle === flyTitle;
          const bulletPointClassName = isCurrentArticleSelected ? `blog-post__${ elementClassName }-bullet` : '';
          const firstLinkClassName = isCurrentArticleSelected ? `blog-post__${ elementClassName }-selected-link` : '';
          return (
            <li key={index} className={classnames(`blog-post__${ elementClassName }-article`, bulletPointClassName)}>
              <a
                href={article.webURL}
                className={classnames(`blog-post__${ elementClassName }-article-link`, firstLinkClassName)}
              >
                <span className={`blog-post__${ elementClassName }-flytitle`}>{article.flyTitle}:</span>
                <span className={`blog-post__${ elementClassName }-title`}>{article.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
  /* eslint-enable quotes */
}
