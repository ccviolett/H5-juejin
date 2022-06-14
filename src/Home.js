import React from 'react';
import TopBar from './TopBar.js'
import { getCategories } from './fake-api';
import debounce from 'lodash.debounce';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    window.onscroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop + 100 > 
        document.documentElement.offsetHeight) {
        this.props.handleAppendArticles();
      }
    }, 100);
  }

  getApiData() {
    getCategories().then(res => {
      this.setState({ 
        categories: res.data.categories
      });
    });
  }

  componentDidMount() {
    this.getApiData();
  }

  render() {
    const content = [];
    if (this.props.sortBy != "history") {
      content.push(<TopBar 
        key="TopBar"
        categories={this.state.categories}
        tabv1Select={this.props.tabv1Select}
        onTabv1SelectChange={this.props.handleTabv1SelectChange}
        tabv2Select={this.props.tabv2Select}
        onTabv2SelectChange={this.props.handleTabv2SelectChange}
      />);
      content.push(<ArticleList
        key="ArticleList"
        articles={this.props.articles}
        onOpenArticle={this.props.onOpenArticle}
      />);
    } else {
      if (this.props.articles.length > 0) {
        content.push(<ArticleList
          key="ArticleList"
          articles={this.props.articles}
          onOpenArticle={this.props.onOpenArticle}
        />);
      } else {
        content.push(<div>暂无历史记录</div>)
      }
    }
    content.push(<NavBar
      key="Navbar"
      navbarSelect={this.props.sortBy}
      onNavbarSelectChange={this.props.handleNavbarSelectChange}
    />);
    return <div className="Home">
      {content}
    </div>;
  }
}

class ArticleList extends React.Component {
  render() {
    const list = [];

    var keyShowMark = {};

    this.props.articles.forEach((item) => {
      if (keyShowMark[item.article_id])  return ;

      keyShowMark[item.article_id] = true;

      var action = {
        view: item.article_info.view_count,
        vote: item.article_info.digg_count,
        comment: item.article_info.comment_count
      };

      list.push(
        <ArticleItem key={item.article_id} 
          item={item}
          uuid={item.article_id}
          author={item.author_user_info}
          date={item.article_info.ctime}
          // tag={item.article_info.tag_ids}
          title={item.article_info.title}
          imgurl={item.article_info.cover_image}
          abstract={item.article_info.brief_content}
          action={action}
          onOpenArticle={this.props.onOpenArticle}
        />
      );
    });

    return <div className="ArticleList" ref={e => (this.scroll = e)}>
      {list}
    </div>;
  }
}

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenArticle = this.handleOpenArticle.bind(this);
  }

  handleOpenArticle(data) {
    this.props.onOpenArticle(data);
  }

  render() {
    const taglist = [];
    if (this.props.tag) {
      this.props.tag.forEach((tag) => {
        taglist.push(<span key={tag} className="ArticleTagItem">{tag}</span>);
      });
    }

    var imgdiv = "";
    if (this.props.imgurl) {
      imgdiv = <img src={this.props.imgurl} alt=""/>
    }

    return <li className="ArticleItem" onClick={(e) => this.handleOpenArticle(this.props.item)} data-uuid={this.props.uuid}>
      <div className="ArticleTopLine"> 
        <div className="ArticleAuthor">{this.props.author.user_name}</div>
        <div className="dividing"></div>
        <div className="ArticleDate">{this.props.date}</div>
        <div className="dividing"></div>
      </div>
      <div className="ArticleTag">{taglist} </div>

      <div className="ArticleTitle"> 
        {this.props.title} 
      </div>
      <div className="ArticleDesc">
        <div className="ArticleAbstract"> 
          {this.props.abstract} 
        </div>
        <div className="ArticleImg"> {imgdiv} </div>
      </div>

      <div className="ArticleAction"> 
        <ArticleActionItem icon="fa fa-eye" val={this.props.action.view}/>
        <ArticleActionItem icon="fa fa-thumbs-o-up" val={this.props.action.vote} />
        <ArticleActionItem icon="fa fa-commenting-o" val={this.props.action.comment} />
      </div>
    </li>
  }
}

class ArticleActionItem extends React.Component {
  render() {
    return <div className="ArticleActionItem">
      <i className={this.props.icon} aria-hidden="true"></i>
      <span>{this.props.val}</span>
    </div>
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavbarSelectChange = this.handleNavbarSelectChange.bind(this);
  }

  handleNavbarSelectChange(data) { 
    this.props.onNavbarSelectChange(data);
  }

  render() {
    const itemlist = [];
    const type = ["热门", "最新", "历史"];
    const sortBy = ["hot", "new", "history"];
    for (let i = 0; i < sortBy.length; i++) { 
      var itemclass = "NavBarItem";
      if (sortBy[i] === this.props.navbarSelect) itemclass += " active";
      itemlist.push(
        <li key={sortBy[i]} className={itemclass}
          onClick={(e) => this.handleNavbarSelectChange(sortBy[i])}
        >{type[i]}</li>
      );
    };

    return <div className="NavBar">
      {itemlist}
    </div>
  }
}

export default Home;
