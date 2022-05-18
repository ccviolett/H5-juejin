import React from 'react';
import './stylesheets/article.scss'

class Article extends React.Component {
  render() {
    return <div className="Article">
      <Content 
        imgurl={this.props.article.imgurl}
        title={this.props.article.title}
        author={this.props.article.author}
        date={this.props.article.date}
        context={this.props.article.context}
      />
      <Comment comment={this.props.article.comment}/>
    </div>
  }
};

class Content extends React.Component {
  render() {
    console.log(this.props);

    return <div className="Content">
      <div className="headimg">
        <img src={this.props.imgurl} alt=""/>
      </div>
      <h2 className="title">{this.props.title}</h2>

      <UserInfo 
        imgurl={this.props.author.imgurl}
        name={this.props.author.name}
        level={this.props.author.level}
      />

      <div className="contentinfo">
        文章发布于<span className="date">
          {this.props.date}
        </span>
      </div>

      <div className="context">
        {this.props.context}
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

        if (v1item.v2list) {
          v1item.v2list.forEach((v2item) => {
            v2commentlist.push(
              <div key={v2item.uuid} className="v2commentItem">
                <div className="user">
                  <UserInfo 
                    imgurl={v2item.user.imgurl}
                    name={v2item.user.name}
                    level={v2item.user.level}
                  />
                </div>
                <div className="context">{v2item.context}</div>
              </div>
            );
          });
        }

        commentlist.push(
          <div key={v1item.uuid} className="CommentItem">
            <div className="v1comment">
              <div className="user">
                  <UserInfo 
                    imgurl={v1item.user.imgurl}
                    name={v1item.user.name}
                    level={v1item.user.level}
                  />
              </div>
              <div className="context">{v1item.context}</div>
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
