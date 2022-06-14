import React from 'react';
import './stylesheets/article.scss'
import { getArticleById, getCommentsByArticleId } from './fake-api';
import parse from 'html-react-parser';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      comment: []
    };
  }

  getApiData() {
    getArticleById(this.props.openArticleId).then((res) => {
      this.setState({article: res.data.article});
    })
    getCommentsByArticleId(this.props.openArticleId).then((res) => {
      this.setState({comment: res.data.comments});
    })
  }

  componentDidMount() {
    this.getApiData();
  }

  render() {
    let info = this.state.article.article_info;

    return <div className="Article">
      <BackIcon onBackIconClick={this.props.onBackIconClick}/>
      <Content 
        imgurl={info && info.cover_image}
        title={info && info.title}
        author={this.state.article && this.state.article.author_user_info}
        // date={this.state.article.date}
        content={this.state.article.article_content}
      />
      <Comment comment={this.state.comment}/>
    </div>
  }
};

class BackIcon extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackIconClick = this.handleBackIconClick.bind(this);
  }

  handleBackIconClick(e) {
    this.props.onBackIconClick(null);
  }

  render() {
    return <div className='BackIcon' onClick={this.handleBackIconClick}>
      <i className='fa fa-chevron-left' aria-hidden="true"></i>
    </div>
  }
}

class Content extends React.Component {
  render() {

    var content = null;
    var author = this.props.author;
  
    if (this.props.content) {
      content = parse(this.props.content);
    }
    return <div className="Content">
      <div className="headimg">
        <img src={this.props.imgurl} alt=""/>
      </div>
      <h2 className="title">{this.props.title}</h2>

      <UserInfo 
        imgurl={author && author.avatar_large}
        name={author && author.user_name}
        level={author && author.level}
      />

      <div className="contentinfo">
        文章发布于<span className="date">
          {this.props.date}
        </span>
      </div>

      <div className="content">
        {content}
      </div>
    </div>
  }
}

class UserInfo extends React.Component {
  render() {
    return <div className="UserInfo">
      <div className="avatar">
        <img src={this.props.imgurl}/>
      </div>
      <div className="info">
        <div className="name">{this.props.name}</div>
        <div className="level">LV.{this.props.level}</div>
      </div>
    </div>
  }
}

class  Comment extends React.Component {
  render() {
    const commentlist = [];
    if (this.props.comment) {
      this.props.comment.forEach((v1item) => {
        const v2commentlist = [];

        if (v1item.reply_infos) {
          v1item.reply_infos.forEach((v2item) => {
            v2commentlist.push(
              <div key={v2item.reply_id} className="v2commentItem">
                <div className="user">
                  <UserInfo 
                    imgurl={v2item.user_info.avatar_large}
                    name={v2item.user_info.user_name}
                    level={v2item.user_info.level}
                  />
                </div>
                <div className="context">{v2item.reply_content}</div>
              </div>
            );
          });
        }

        commentlist.push(
          <div key={v1item.comment_id} className="CommentItem">
            <div className="v1comment">
              <div className="user">
                  <UserInfo 
                    imgurl={v1item.user_info.avatar_large}
                    name={v1item.user_info.user_name}
                    level={v1item.user_info.level}
                  />
              </div>
              <div className="context">{v1item.comment_info.comment_content}</div>  
            </div>
            <div className="v2comment">
              {v2commentlist}
            </div>
          </div>
        );
      });
    }

    return <div className="Comment">
      <div className="CommentHeader"> 全部评论 </div>
      {commentlist}
    </div>
  }
}

export default Article;
