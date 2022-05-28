import React from 'react';
import TopBar from './TopBar.js'
import { getCategories, getArticles } from './fake-api';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'hot',
      categories: [],
      articles: [],
      categoryId: 0,
      tabv1Select: null,
      tabv2Select: null,
      navbarSelect: null 
    };
    this.handleTabv1SelectChange = this.handleTabv1SelectChange.bind(this);
    this.handleTabv2SelectChange = this.handleTabv2SelectChange.bind(this);
    this.handleNavbarSelectChange = this.handleNavbarSelectChange.bind(this);
  }

  getApiData() {
    getCategories().then(res => {
      this.setState({ 
        categories: res.data.categories
      });
    });

    getArticles(this.state.categoryId, this.state.sortBy).then(res => {
      this.setState({ 
        articles: res.data.articles
      });
    })
  }

  componentDidMount() {
    this.getApiData();
  }

  handleTabv1SelectChange(tabv1Select) {
    this.setState({ 
      categoryId: tabv1Select,
      tabv1Select: tabv1Select,
      tabv2Select: null
    });
    getArticles(tabv1Select, this.state.sortBy).then(res => {
      this.setState({ 
        articles: res.data.articles
      });
    })
  }

  handleTabv2SelectChange(tabv2Select) { 
    this.setState({ 
      categoryId: tabv2Select,
      tabv2Select: tabv2Select 
    }); 
    getArticles(tabv2Select, this.state.sortBy).then(res => {
      this.setState({ 
        articles: res.data.articles
      });
    })
  }

  handleNavbarSelectChange(navbarSelect) { 
    this.setState({ 
      sortBy: navbarSelect 
    }); 
    getArticles(this.state.categoryId, navbarSelect).then(res => {
      this.setState({ 
        articles: res.data.articles
      });
    });
  }

  render() {
    return <div className="Home">
      <TopBar 
        categories={this.state.categories}
        tabv1Select={this.state.tabv1Select}
        onTabv1SelectChange={this.handleTabv1SelectChange}
        tabv2Select={this.state.tabv2Select}
        onTabv2SelectChange={this.handleTabv2SelectChange}
      />
      <ArticleList 
        articles={this.state.articles} 
        onOpenArticle={this.props.onOpenArticle}
      />
      <NavBar 
        navbarSelect={this.state.sortBy}
        onNavbarSelectChange={this.handleNavbarSelectChange}
      />
    </div>;
  }
}

class ArticleList extends React.Component {
  render() {
    const list = [];

    this.props.articles.forEach((item) => {
      var action = {
        view: item.article_info.view_count,
        vote: item.article_info.digg_count,
        comment: item.article_info.comment_count
      };

      list.push(
        <ArticleItem key={item.article_id} 
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

    return <div className="ArticleList">
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

    return <li className="ArticleItem" onClick={(e) => this.handleOpenArticle(this.props.uuid)} data-uuid={this.props.uuid}>
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
    const type = ["推荐", "最新", "历史"];
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
