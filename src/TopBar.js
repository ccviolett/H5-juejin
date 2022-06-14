import React from 'react';

class TopBar extends React.Component {
  render() {
    var children = null;
    var finalTabv1Select = this.props.tabv1Select;
    var finalTabv2Select = this.props.tabv2Select;

    if (this.props.categories.length) {
      if (!finalTabv1Select) {
        finalTabv1Select = this.props.categories[0].category_id;
        children = this.props.categories[0].children;
      } else {
        children = this.props.categories.find((item) => item.category_id == finalTabv1Select).children;
      }
    }

    const content = [];
    if (this.props.categories) {
      content.push(
        <TabBar key="v1" tab={this.props.categories} type="v1"
          tabSelect={finalTabv1Select}
          onTabSelectChange={this.props.onTabv1SelectChange}
        />
      );
    }

    if (children) {
      content.push(
        <TabBar key="v2" tab={children} type="v2"
          tabSelect={finalTabv2Select}
          onTabSelectChange={this.props.onTabv2SelectChange}
        />
      );
    }

    return <div className="TopBar">
      {content}
    </div>;
  }
}

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabSelectChange = this.handleTabSelectChange.bind(this);
  }

  handleTabSelectChange(e) { 
    this.props.onTabSelectChange(Number(e.target.dataset.id));
  }

  render() {
    const tablist = [];

    this.props.tab.forEach((item) => {
      var itemclass = "TabBarItem";
      if (item.category_id == this.props.tabSelect) 
        itemclass += " active";
      tablist.push( 
        <div key={item.category_id} 
          data-id={item.category_id}
          className={itemclass}
          onClick={this.handleTabSelectChange}
        >{item.category_name}</div> 
      );
    });

    // console.log(tablist);

    return <div className={"TabBar TabBar" + this.props.type} key={this.props.type}>
      {tablist}
    </div>
  }
}

export default TopBar;