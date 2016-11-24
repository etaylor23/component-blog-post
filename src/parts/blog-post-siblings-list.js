import React from 'react';
import classnames from 'classnames';

export function siblingList(
  articlesList,
  flyTitle,
  elementClassName,
  sectionName
) {
  /* eslint-disable quotes*/
  return (
    <div className={`blog-post__${ elementClassName }-aside`}>
      <span className={`blog-post-side-flytitle`}>{flyTitle}</span>
      <span className={`blog-post-side-text`}>More in this {sectionName.toLowerCase()}:</span>
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

export function nextSiblingArticle(siblingArticles, flyTitle, elementClassName) {
  let nextArticleinList = null;
  /* eslint-disable array-callback-return */
  siblingArticles.map((article, index) => {
    if (flyTitle === article.flyTitle) {
      nextArticleinList = siblingArticles[index + 1];
    }
  });
  /* eslint-enable array-callback-return */
  return nextArticleinList ? (
    <div className={classnames(`blog-post__${ elementClassName }-next-article`)}>
      <a className={classnames(`blog-post__${ elementClassName }-next-article-link`)} href={nextArticleinList.webURL}>
        → {nextArticleinList.flyTitle}: {nextArticleinList.title}
      </a>
    </div>
  ) : null;
}
