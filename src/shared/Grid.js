import React, { Component } from "react";

class Grid extends Component {
  // writing the component in this way makes it aware of both
  // server and client
  constructor(props) {
    super(props);

    let repos;
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = props.staticContext.data;
    }

    this.state = {
      repos,
    };
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id);
    }
  }

  fetchRepos(lang) {
    this.setState(() => ({
      loading: true,
    }));
    // comes from react router
    this.props.fetchInitialData(lang).then(repos =>
      this.setState(() => ({
        repos,
        loading: false,
      })),
    );
  }

  render() {
    const { repos, loading } = this.state;

    if (loading === true) {
      return <p>LOADING</p>;
    }

    return (
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {repos &&
          repos.map(({ name, owner, stargazers_count, html_url }) => (
            <li key={name} style={{ margin: 30 }}>
              <ul>
                <li>
                  <a href={html_url}>{name}</a>
                </li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
      </ul>
    );
  }
}

export default Grid;
