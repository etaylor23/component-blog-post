import Author from './parts/author';
import BlogPostImage from './parts/blog-post-image';
import BlogPostSection from './parts/blog-post-section';
import Comments from './parts/comments';
import ImageCaption from './parts/image-caption';
import React from 'react';
import Rubric from './parts/rubric';
import ShareBar from './parts/blog-post-sharebar';
import Text from './parts/text';
import MoreSpecialReportsList from './parts/more-special-reports-list';

import classnames from 'classnames';
import urlJoin from 'url-join';

function twoDigits(int) {
  return int > 9 ? '' + int : '0' + int; // eslint-disable-line
}

export default class BlogPost extends React.Component {
  static get propTypes() {
    return {
      className: React.PropTypes.string,
      image: React.PropTypes.shape({
        src: React.PropTypes.string,
        caption: React.PropTypes.string,
        alt: React.PropTypes.string,
      }),
      author: React.PropTypes.string,
      byline: React.PropTypes.string,
      section: React.PropTypes.node,
      sectionUrl: React.PropTypes.string,
      flyTitle: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      publicationDate: React.PropTypes.string.isRequired,
      TitleComponent: React.PropTypes.func.isRequired,
      rubric: React.PropTypes.string,
      dateTime: React.PropTypes.instanceOf(Date),
      dateString: React.PropTypes.string,
      timestampISO: React.PropTypes.string,
      dateFormat: React.PropTypes.func,
      text: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.node,
      ]).isRequired,
      afterText: React.PropTypes.node,
      itemType: React.PropTypes.string,
      itemProp: React.PropTypes.string,
      commentCount: React.PropTypes.number.isRequired,
      commentStatus: React.PropTypes.oneOf([
        'disabled',
        'readonly',
        'readwrite',
        'fbcommentplugin',
      ]).isRequired,
      firstToCommentLabel: React.PropTypes.string.isRequired,
      viewCommentsLabel: React.PropTypes.string.isRequired,
      commentsUri: React.PropTypes.string.isRequired,
      blogImage: React.PropTypes.object,
      printSectionName: React.PropTypes.string,
      specialReportList: React.PropTypes.shape(React.PropTypes.arrayof({
        flyTitle: React.PropTypes.string,
        title: React.PropTypes.string.isRequired,
        webURL: React.PropTypes.string,
      })),
    };
  }
  static get defaultProps() {
    return {
      itemType: 'http://schema.org/BlogPosting',
      itemProp: 'blogPost',
      firstToCommentLabel: 'Be the first to comment',
      viewCommentsLabel: 'View comments',
      dateFormat: (date) => {
        const tenMinutes = 10;
        // Sep 19th 2015, 9:49
        function addPostFix(day) {
          const daystr = day.toString();
          const lastChar = daystr.charAt(daystr.length - 1);
          let postFix = '';
          switch (lastChar) {
            case '1':
              postFix = 'st';
              break;
            case '2':
              postFix = 'nd';
              break;
            case '3':
              postFix = 'rd';
              break;
            default:
              postFix = 'th';
              break;
          }
          return `${ day }${ postFix }`;
        }
        const shortMonthList = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        let minutes = date.getMinutes() < tenMinutes ? '0' : '';
        minutes += date.getMinutes();
        return [ `${ shortMonthList[date.getMonth()] }`,
          `${ addPostFix(date.getDate()) }`,
          `${ date.getFullYear() },`,
          `${ date.getHours() }:${ minutes }` ].join(' ');
      },
    };
  }

  addDateTime(sectionDateAuthor, props) {
    const { dateTime, dateFormat, dateString, timestampISO } = props;
    let result = sectionDateAuthor.slice();
    if (dateTime) {
      result = result.concat((
        <time
          className="blog-post__datetime"
          itemProp="dateCreated"
          dateTime={this.props.dateTime}
          key="blog-post__datetime"
        >{dateFormat(dateTime)}</time>));
    }
    if (dateString && timestampISO) {
      result = result.concat((
        <time
          className="blog-post__datetime"
          itemProp="dateCreated"
          dateTime={timestampISO}
          key="blog-post__datetimeISO"
        >{dateString}</time>));
    }
    return result;
  }

  addImage(content, image = {}) {
    if (this.props.blogImage) {
      return [
        ...content,
        ...this.props.blogImage,
      ];
    } else if (image) {
      const { src, caption, alt } = image;
      if (src) {
        const imageCaption = caption ? <ImageCaption caption={caption} key="blog-post__image-caption" /> : null;
        return content.concat(
          <BlogPostImage
            key="blogimg"
            caption={imageCaption}
            src={src}
            alt={alt}
          />
        );
      }
    }
    return content;
  }

  addRubric(content, rubric) {
    if (rubric) {
      return content.concat(<Rubric rubric={rubric} key="blog-post__rubric" />);
    }
    return content;
  }

  addBlogPostSection(sectionDateAuthor, section, sectionUrl) {
    if (section) {
      if (sectionUrl && !/^(\w+:)?\/\//.test(sectionUrl)) {
        sectionUrl = urlJoin('/', sectionUrl);
      }
      const blogPostSection = sectionUrl ? (
        <a href={sectionUrl} className="blog-post__section-link">
          {section}
        </a>
      ) : section;
      return sectionDateAuthor.concat(
        <BlogPostSection key="blog-post__section" section={blogPostSection} />
      );
    }
    return sectionDateAuthor;
  }

  addByLine(sectionDateAuthor, byline) {
    if (byline) {
      return sectionDateAuthor.concat(
        <p className="blog-post__byline-container" key="blog-post__byline-container">
          {"by "}
          <span
            className="blog-post__byline"
            itemProp="author"
          >{byline}</span>
        </p>
      );
    }
    return sectionDateAuthor;
  }

  render() {
    const flyTitle = this.props.flyTitle;
    const specialReportList = this.props.specialReportList.entries;
    // specialReportList.map((article, index) => {
    //   if (article.flyTitle === flyTitle) {
    //     specialReportList.unshift(specialReportList.splice(index, 1)[0]);
    //   }
    // });
    let content = [];
    // aside and text content are wrapped together into a component.
    // that makes it easier to move the aside around relatively to its containter
    let wrappedInnerContent = [];
    const asideableContent = [];
    let sectionDateAuthor = [];
    content = this.addRubric(content, this.props.rubric);
    sectionDateAuthor = this.addBlogPostSection(sectionDateAuthor, this.props.section, this.props.sectionUrl);
    sectionDateAuthor = this.addDateTime(sectionDateAuthor, this.props);
    sectionDateAuthor = this.addByLine(sectionDateAuthor, this.props.byline);
    if (sectionDateAuthor.length) {
      asideableContent.push(
        <div
          className="blog-post__section-date-author"
          key="blog-post__section-date-author"
        >
          {sectionDateAuthor}
        </div>
      );
    }

    // Share bar publicationDate formatted
    let shareBarPublicateDate = new Date(this.props.publicationDate * 1000) // eslint-disable-line
    shareBarPublicateDate = `${ String(shareBarPublicateDate.getFullYear()) }
    ${ String(twoDigits(shareBarPublicateDate.getMonth() + 1)) }
    ${ String(twoDigits(shareBarPublicateDate.getDate())) }`.replace(/\s/g, '');
    const shareBarDefault =
      (<ShareBar
        key="sharebar"
        type={this.props.type === 'post' ? 'BL' : 'A'}
        title={this.props.title}
        flyTitle={this.props.flyTitle}
        publicationDate={shareBarPublicateDate}
        contentID={this.props.id}
       />);
    asideableContent.push(
      shareBarDefault
    );
    wrappedInnerContent = this.addImage(wrappedInnerContent, this.props.image);
    if (asideableContent.length) {
      wrappedInnerContent.push((
        <div className="blog-post__asideable-wrapper" key="asideable-content"
          ref="asideable"
        >
          <div className="blog-post__asideable-content blog-post__asideable-content--meta">
            {asideableContent}
          </div>
        </div>
      ));
    }
    if (this.props.author) {
      wrappedInnerContent.push(<Author key="blog-post__author" author={this.props.author} />);
    }
    wrappedInnerContent.push(<Text text={this.props.text} key="blog-post__text" />);
    wrappedInnerContent.push(<div key="blog-post__after-text">{this.props.afterText}</div>);
    content.push(<div className="blog-post__inner" key="inner-content">{wrappedInnerContent}</div>);
    const { commentCount, commentStatus } = this.props;
    let commentSection = null;
    if (commentStatus !== 'disabled' && !(commentStatus === 'readonly' && commentCount === 0)) {
      commentSection = (
        <Comments
          key="blog-post__comments"
          firstToCommentLabel={this.props.firstToCommentLabel}
          commentCount={commentCount}
          viewCommentsLabel={this.props.viewCommentsLabel}
          commentsUri={this.props.commentsUri}
        />
      );
    }
    content.push(
      <div className="blog-post__bottom-panel" key="blog-post__bottom-panel">
        {shareBarDefault}
        {commentSection}
      </div>
    );
    const TitleComponent = this.props.TitleComponent;
    const isSpecialReport = this.props.printSectionName === 'Special report';
    const specialReportHeader = isSpecialReport ? (
      <span className="blog-post__special-report-header">
        Special Report
      </span>
    ) : null;
    // const specialReportSideList = isSpecialReport ? (
    //   <MoreSpecialReportsList
    //     articlesList={specialReportList}
    //   />
    // ) : null;
    const specialReportSideList = isSpecialReport ? (
      <div className="blog-post__special-report-aside">
        <span className="blog-post-side-flytitle">{flyTitle}</span>
        <span className="blog-post-side-text">More in this special report:</span>
        <ul className="blog-post__special-report-list">
          {specialReportList.map((article, index) => {
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
    ) : null;
    let nextArticleinList = null;
    specialReportList.map((article, index) => {
      if (flyTitle === article.flyTitle) {
        nextArticleinList = specialReportList[index + 1];
      }
    });
    const nextArticleLink = isSpecialReport && nextArticleinList ? (
      <div className="blog-post__special-report-next-article">
        <a className="blog-post__special-report-next-article-link" href={nextArticleinList.webURL}>
          → {nextArticleinList.flyTitle}: {nextArticleinList.title}
        </a>
      </div>
    ) : null;
    const blogText = content[1].props.children[2] ? (
      content[1].props.children[2].props.text
    ) : content[0].props.children[2].props.text;
    blogText.splice(1, 0, specialReportSideList);
    content.splice(content.length - 1, 0, nextArticleLink);
    return (
      <article
        itemScope
        className={classnames('blog-post', this.props.className)}
        itemProp={this.props.itemProp}
        itemType={this.props.itemType}
        role="article"
        ref="article"
      >
        {specialReportHeader}
        <TitleComponent
          title={this.props.title}
          flyTitle={this.props.flyTitle}
          Heading={"h1"}
          titleClassName={isSpecialReport ? 'flytitle-and-title__special-title' : ''}
          flyTitleClassName={isSpecialReport ? 'flytitle-and-title__special-flytitle' : ''}
        />
        {content}
      </article>
    );
  }
}
