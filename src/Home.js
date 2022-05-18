import React from 'react';
import './stylesheets/home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabv1Select: null,
      tabv2Select: null,
      navbarSelect: null 
    };
    this.handleTabv1SelectChange = this.handleTabv1SelectChange.bind(this);
    this.handleTabv2SelectChange = this.handleTabv2SelectChange.bind(this);
    this.handleNavbarSelectChange = this.handleNavbarSelectChange.bind(this);
  }
  handleTabv1SelectChange(tabv1Select) {
    this.setState({ 
      tabv1Select: tabv1Select,
      tabv2Select: null
    });
  }
  handleTabv2SelectChange(tabv2Select) { this.setState({ tabv2Select: tabv2Select }); }
  handleNavbarSelectChange(navbarSelect) { this.setState({ navbarSelect: navbarSelect }); }

  render() {
    const filterArticle = [];
    this.props.article.forEach((item) => {
      var able = true;
      if (this.state.tabv1Select && this.state.tabv1Select !== "推荐" && 
        !item.tag.includes(this.state.tabv1Select)) 
        able = false;
      if (this.state.tabv2Select && this.state.tabv2Select !== "全部" &&
        !item.tag.includes(this.state.tabv2Select)) 
        able = false;
      if (able) filterArticle.push(item);
    })

    return <div className="Home">
      <AppBar 
        tab={this.props.tab}
        tabv1Select={this.state.tabv1Select}
        onTabv1SelectChange={this.handleTabv1SelectChange}
        tabv2Select={this.state.tabv2Select}
        onTabv2SelectChange={this.handleTabv2SelectChange}
      />
      <ArticleList 
        article={filterArticle} 
        onOpenArticleUUIDChange={this.props.onOpenArticleUUIDChange}
      />
      <NavBar 
        navbarSelect={this.state.navbarSelect}
        onNavbarSelectChange={this.handleNavbarSelectChange}
      />
    </div>;
  }
}

class AppBar extends React.Component {
  render() {
    const tabv1 = [];
    var tabv2 = [];
    var finalTabv1Select = this.props.tabv1Select;
    var finalTabv2Select = this.props.tabv2Select;

    this.props.tab.forEach((item) => {
      if (!finalTabv1Select) finalTabv1Select = item.v1;
      tabv1.push(item.v1);
      if (item.v1 === finalTabv1Select) tabv2 = item.v2;
    });
    if (!this.props.tabv2Select) finalTabv2Select = tabv2[0];

    return <div className="AppBar">
      <TopBar />
      <TabBar tab={tabv1} type="v1" 
        tabSelect={finalTabv1Select}
        onTabSelectChange={this.props.onTabv1SelectChange}
      />
      <TabBar tab={tabv2} type="v2" 
        tabSelect={finalTabv2Select}
        onTabSelectChange={this.props.onTabv2SelectChange}
      />
    </div>;
  }
}

class TopBar extends React.Component {
  render() {
    return <div className="TopBar">
      <div className="SiteTitle">寻绎</div>
      <form className="search-form">
        <input className="search-input"/>
        <div className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </form>
    </div>
  }
}

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabSelectChange = this.handleTabSelectChange.bind(this);
  }

  handleTabSelectChange(e) { this.props.onTabSelectChange(e.target.innerText); }

  render() {
    const tablist = [];
    this.props.tab.forEach((item) => {
      var itemclass = "TabBarItem";
      if (item === this.props.tabSelect) itemclass += " active";
      tablist.push( 
        <div key={item} className={itemclass}
          onClick={this.handleTabSelectChange}
        >{item}</div> 
      );
    });

    return <div className={"TabBar TabBar" + this.props.type}>
      {tablist}
    </div>
  }
}

class ArticleList extends React.Component {
  render() {
    const list = [];

    this.props.article.forEach((item) => {
      list.push(
        <ArticleItem key={item.uuid} 
          uuid={item.uuid}
          author={item.author}
          date={item.date}
          tag={item.tag}
          title={item.title}
          imgurl={item.imgurl}
          abstract={item.abstract}
          action={item.action}
          onOpenArticleUUIDChange={this.props.onOpenArticleUUIDChange}
        />
      );
    });

    return <div className="ArticleList">
      {list}
    </div>;
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavbarSelectChange = this.handleNavbarSelectChange.bind(this);
  }

  handleNavbarSelectChange(e) { this.props.onNavbarSelectChange(e.target.innerText); }

  render() {
    var finalNavSelect = this.props.navbarSelect;

    if (!finalNavSelect) finalNavSelect = "推荐";

    const itemlist = [];
    const type = ["推荐", "最新", "历史"];
    type.forEach((item) => {
      var itemclass = "NavBarItem";
      if (item === finalNavSelect) itemclass += " active";
      itemlist.push(
        <li key={item} className={itemclass}
          onClick={this.handleNavbarSelectChange}
        >{item}</li>
      );
    });

    return <div className="NavBar">
      {itemlist}
    </div>
  }
}

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenArticleUUIDChange = this.handleOpenArticleUUIDChange.bind(this);
  }

  handleOpenArticleUUIDChange(e) {
    var uuid = e.target.dataset.uuid;
    while (!uuid) {
      e.target = e.target.parentElement;
      uuid = e.target.dataset.uuid;
    }
    this.props.onOpenArticleUUIDChange(uuid);
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

    return <li className="ArticleItem" onClick={this.handleOpenArticleUUIDChange} data-uuid={this.props.uuid}>
      <div className="ArticleTopLine"> 
        <div className="ArticleAuthor">{this.props.author}</div>
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

export default Home;
