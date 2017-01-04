import React from 'react';
import classnames from 'classnames';

export function siblingList(
  articlesList,
  flyTitle,
  elementClassName,
  siblingsListTitle,
  sideText
) {
  if (!articlesList) {
    return null;
  }
  const blogSideText = sideText ? sideText : `More in this ${ siblingsListTitle.toLowerCase() }:`;
  return (
    <div className={`blog-post__siblings-list-aside ${ elementClassName }`} key="blog-post__siblings-list">
      <span className="blog-post__side-flytitle">{flyTitle}</span>
      <span className="blog-post__side-text">{blogSideText}</span>
      <ul className={`blog-post__siblings-list ${ elementClassName }`}>
        {articlesList.map((article, index) => {
          const isCurrentArticleSelected = article.flyTitle === flyTitle;
          const bulletPointClassName = isCurrentArticleSelected ?
            `blog-post__siblings-list-bullet ${ elementClassName }` : '';
          const firstLinkClassName = isCurrentArticleSelected ?
            `blog-post__siblings-list-selected-link ${ elementClassName }` : '';
          return (
            <li key={index} className={classnames(
                `blog-post__siblings-list-article ${ elementClassName }`, bulletPointClassName
            )}>
              <a
                href={article.webURL}
                className={classnames(
                  `blog-post__siblings-list-article-link ${ elementClassName }`, firstLinkClassName
                )}
              >
                <span className={`blog-post__siblings-list-flytitle ${ elementClassName }`}>{article.flyTitle}:</span>
                <span className={`blog-post__siblings-list-title ${ elementClassName }`}>{article.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  siblingList.propTypes = {
    articlesList: React.PropTypes.arrayOf(React.PropTypes.node),
    flyTitle: React.PropTypes.string,
    elementClassName: React.PropTypes.string,
    siblingsListTitle: React.PropTypes.string,
    sideText: React.PropTypes.string,
  };
}
