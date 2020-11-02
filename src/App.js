import React, { Component } from 'react'
import styled from 'styled-components';
import GitStats from 'gh-polyglot';
import UserInfos from './components/UserInfos';
import LanguagesStats from './components/LanguagesStats';
import ReposData from './components/ReposData'
import { theme, GlobalStyle } from './styles';
import { AppProvider } from './context';
import axios from 'axios'
import { Grid, Row, Col } from 'react-flexbox-grid';
const { colors, fonts } = theme;

const FormSearch = styled.div`
form {
  background-color: transparent;
  border-radius: 5px;
  margin : auto;
  margin-bottom: 10vh;
  max-width: 400px;
  text-align: center;

  label {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem;
  }
  input {
    background-color: ${colors.darkGrey};
    outline: 0;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0.5rem;
    color: ${colors.white};
    font-family: ${fonts.primary};
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
  }
  .submit {
    
    margin-top: 3rem;
    filter: none;
  }
}
`
const me = new GitStats("IonicaBizau");
me.userStats((err, stats) => {
  if (err) {
    console.error('Error:', err);

  }
  console.log(stats);
});



class App extends Component {
  state = {
    show: false,
    inputvalue: "",
    data: {},
    userdata: {},
    isLoading: true,
    reposdata: {}
  };

  componentDidMount() {


  }

  getReposData = (username) => {
    axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(res => {
        const d = res.data.sort((a, b) => b['stargazers_count'] - a['stargazers_count']).slice(0, 8);
        this.setState({
          isLoading: false,
          reposdata: d
        });
      })
  }
  getLanguagesData = (username) => {
    const me = new GitStats(username);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
      } else {
        this.setState({
          show: true,
          data: {
            labels: stats.map(lang => lang.label),
            datasets: [{
              data: stats.map(lang => lang.value),
              backgroundColor: stats.map(lang => lang.color),
              hoverBackgroundColor: stats.map(lang => lang.color)
            }]
          }

        });
      }

    });
  };
  getUserData = (username) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(res => {
        this.setState({
          show: true,
          userdata: {
            username: res.data.login,
            url: res.data.html_url,
            followers: res.data.followers,
            following: res.data.following,
            public_repos: res.data.public_repos,
            avatar_url: res.data.avatar_url,
            name: res.data.name,
          }
        });

      }).catch((error) => { console.log(error) })
  }

  handleChange = (event) => {
    this.setState({ inputvalue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getUserData(this.state.inputvalue);
    this.getLanguagesData(this.state.inputvalue);
    this.getReposData(this.state.inputvalue);
  }

  render() {
    console.log(this.state)
    return (
      <div className="App" >
        <AppProvider value={this.state}>
          <GlobalStyle />
          <FormSearch >
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Find Your GitHub Profil</label>
              <input name="username" type="text" value={this.state.inputvalue} onChange={this.handleChange} />
            </form>
          </FormSearch>
          <Grid>
            {this.state.show && (
              <React.Fragment>
                <Row>
                  <Col xs={12} sm={6}> <UserInfos /></Col>
                  <Col xs={12} sm={6}><LanguagesStats /></Col>
                </Row>
                <ReposData />
              </React.Fragment>

            )}

          </Grid>

        </AppProvider>
      </div>
    );
  }
}

export default App;
