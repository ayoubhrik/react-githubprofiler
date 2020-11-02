import React, { Component } from 'react'
import { theme, GlobalStyle } from '../styles';
import styled from 'styled-components';
import AppContext from '../context';
const { spacing, colors } = theme;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;
const NoAvatar = styled.div`
  border: 2px solid ${colors.white};
  border-radius: 100%;
  padding: ${spacing.md};
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
 
  img {
    border-radius: 100%;
    border: 2px solid ${colors.white};
  }
`;
const UserInfoWrapper = styled.header`
margin-bottom : 50px;
    display: flex;
    justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  h1{
      margin : 20px 0;
  }
   
`;
const Number = styled.div`
  color: ${colors.rose};
  font-weight: 700;
  font-size: ${theme.fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
export default class UserInfos extends Component {
  static contextType = AppContext;

  componentDidMount() {

  }
  render() {
    const { avatar_url, name, username, url, followers, following, public_repos } = this.context.userdata;
    return (
      <UserInfoWrapper>
        <GlobalStyle />
        <Avatar>
          {avatar_url.length > 1 ? (
            <img src={avatar_url} alt="avatar" />
          ) : (
              <NoAvatar>

              </NoAvatar>
            )}
        </Avatar>
        <h1>
          {name}
        </h1>
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">@{username}</a>
        </h2>
        <Stats>
          <Stat>
            <Number>{public_repos}</Number>
            <NumLabel>REPOSITORIES</NumLabel>
          </Stat>

          <Stat>
            <Number>{followers}</Number>
            <NumLabel>FOLLOWERS</NumLabel>
          </Stat>


          <Stat>

            <Number>{following}</Number>
            <NumLabel>FOLLOWING</NumLabel>

          </Stat>

        </Stats>



      </UserInfoWrapper>
    )
  }
}
