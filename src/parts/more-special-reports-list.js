import React from 'react';
import classnames from 'classnames';

function MoreSpecialReportsList({ articlesList }) {
  const specialReportArticle = articlesList[0];
  return (
    <div className="blog-post__special-report-aside">
      <span className="blog-post-side-flytitle">{specialReportArticle.flyTitle}</span>
      <span className="blog-post-side-text">More in this special report:</span>
      <ul className="blog-post__special-report-list">
        {articlesList.map((article, index) => {
          const bulletPointClassName = index === 0 ? 'blog-post__special-report-bullet' : '';
          const firstLinkClassName = index === 0 ? 'blog-post__special-report-first-link' : '';
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

MoreSpecialReportsList.propTypes = {
  articlesList: React.PropTypes.arrayOf([
    React.PropTypes.string,
  ]),
};

export default MoreSpecialReportsList;
