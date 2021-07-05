import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "../MainSidebar/SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getPatientSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getDietitianSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            {items && items.map((item, idx) => (
              <SidebarNavItem key={idx} item={item} />
            ))}
          </Nav>
        </div>
      )
  }
}

export default SidebarNavItems;
