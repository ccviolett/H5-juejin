import React from 'react';
import Home from './Home.js'
import Article from './Article.js'
import './stylesheets/app.scss'
import './stylesheets/home.scss'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openArticleId: null
    };

    this.handleOpenArticleIdChange = this.handleOpenArticleIdChange.bind(this);
  }

  handleOpenArticleIdChange(uuid) {
    this.setState({openArticleId: uuid});
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
        onOpenArticle={this.handleOpenArticleIdChange}
      />
    }
    return <div className="App">
      {container}
    </div>
  }
}

export default App;
