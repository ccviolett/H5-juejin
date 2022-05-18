import React from 'react';
import Home from './Home.js'
import Article from './Article.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openArticleUUID: "1"
    };

    this.handleOpenArticleUUIDChange = this.handleOpenArticleUUIDChange.bind(this);
  }

  handleOpenArticleUUIDChange(uuid) {
    this.setState({ openArticleUUID: uuid });
  }

  render() {
    var articleDetail = this.props.articleDetail.find((item) => item.uuid === this.state.openArticleUUID);
    if (articleDetail) {
      return <div className="App">
        <Article article={articleDetail}/>
      </div>
    } else {
      return <div className="App">
        <Home article={this.props.articleList} tab={this.props.tab} 
          onOpenArticleUUIDChange={this.handleOpenArticleUUIDChange}
        />
      </div>
    }
  }
}

export default App;
