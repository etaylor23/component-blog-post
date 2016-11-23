import React from 'react';
import classnames from 'classnames';

export function moreSpecialReportsList(articlesList, flyTitle) {
  return (
    <div className="blog-post__special-report-aside">
      <span className="blog-post-side-flytitle">{flyTitle}</span>
      <span className="blog-post-side-text">More in this special report:</span>
      <ul className="blog-post__special-report-list">
        {articlesList.map((article, index) => {
          const isCurrentArticleSelected = article.flyTitle === flyTitle;
          const bulletPointClassName = isCurrentArticleSelected ? 'blog-post__special-report-bullet' : '';
          const firstLinkClassName = isCurrentArticleSelected ? 'blog-post__special-report-first-link' : '';
          return (
            <li key={index} className={classnames('blog-post__special-report-article', bulletPointClassName)}>
              <a
                href={article.webURL}
                className={classnames('blog-post__special-report-article-link', firstLinkClassName)}
              >
                <span className="blog-post__special-report-flytitle">{article.flyTitle}:</span>
                <span className="blog-post__special-report-title">{article.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function nextSpecialReportArticle(specialReportList, flyTitle) {
  let nextArticleinList = null;
  specialReportList.map((article, index) => {
    if (flyTitle === article.flyTitle) {
      nextArticleinList = specialReportList[index + 1];
    }
  });
  return nextArticleinList ? (
    <div className="blog-post__special-report-next-article">
      <a className="blog-post__special-report-next-article-link" href={nextArticleinList.webURL}>
        → {nextArticleinList.flyTitle}: {nextArticleinList.title}
      </a>
    </div>
  ) : null;
}
