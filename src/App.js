import React from 'react';
import Home from './Home.js'
import Article from './Article.js'
import './stylesheets/app.scss'
import './stylesheets/home.scss'
import { getArticles } from './fake-api'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'hot',
      categoryId: 0,
      tabv1Select: null,
      tabv2Select: null,
      articles: [],
      articleOffset: 0,
      history: [],
      openArticleId: null
    };

    this.handleTabv1SelectChange = this.handleTabv1SelectChange.bind(this);
    this.handleTabv2SelectChange = this.handleTabv2SelectChange.bind(this);
    this.handleNavbarSelectChange = this.handleNavbarSelectChange.bind(this);
    this.handleOpenArticleIdChange = this.handleOpenArticleIdChange.bind(this);
    this.handleAppendArticles = this.handleAppendArticles.bind(this);
  }

  handleAppendArticles() {
    if (this.state.sortBy != 'history') {
      getArticles(
        this.state.categoryId,
        this.state.sortBy,
        this.state.articleOffset + 10
      ).then(res => {
        this.setState({
          articles: [...this.state.articles, ...res.data.articles],
          articleOffset: this.state.articleOffset + 10
        })
      });
    }
  }

  updateArticles(categoryId, sortBy) {
    if (sortBy == "history") {
      this.setState({
        articles: this.state.history.reverse()
      });
    } else {
      getArticles(categoryId, sortBy).then(res => {
        this.setState({
          articles: res.data.articles
        });
      })
    }
  }

  getApiData() {
    this.updateArticles(this.state.categoryId, this.state.sortBy);
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
    this.updateArticles(tabv1Select, this.state.sortBy);
  }

  handleTabv2SelectChange(tabv2Select) { 
    this.setState({ 
      categoryId: tabv2Select,
      tabv2Select: tabv2Select 
    }); 
    this.updateArticles(tabv2Select, this.state.sortBy);
  }

  handleNavbarSelectChange(navbarSelect) { 
    this.setState({ 
      sortBy: navbarSelect 
    }); 
    this.updateArticles(this.state.categoryId, navbarSelect);
  }

  handleOpenArticleIdChange(item) {
    if (!item) {
      this.setState({
        openArticleId: null
      });
    } else {
      this.setState({
        history: [...this.state.history, item],
        openArticleId: item.article_id
      });
    }
  }

  render() {
    var container = null;

    if (this.state.openArticleId) {
      container = <Article 
        openArticleId={this.state.openArticleId}
        onBackIconClick={this.handleOpenArticleIdChange}
      />
    } else {
      container = <Home 
        handleAppendArticles={this.handleAppendArticles}
        tabv1Select={this.state.tabv1Select}
        handleTabv1SelectChange={this.handleTabv1SelectChange}
        tabv2Select={this.state.tabv2Select}
        handleTabv2SelectChange={this.handleTabv2SelectChange}
        sortBy={this.state.sortBy}
        handleNavbarSelectChange={this.handleNavbarSelectChange}
        articles={this.state.articles}
        onOpenArticle={this.handleOpenArticleIdChange}
      />
    }
    return <div className="App">
      {container}
    </div>
  }
}

export default App;
