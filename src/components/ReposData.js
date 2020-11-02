import React, { Component } from 'react'
import { theme, GlobalStyle } from '../styles';
import styled from 'styled-components';
import AppContext from '../context';
import axios from 'axios'

const ReposWrapper = styled.div`
.repo-list {
    padding :3rem 5rem;
    .toprepostitle {
      font-size : 1.5rem;
      font-weight: 500;
      margin : 1rem 0;
      text-align: center;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 1rem;
      li {
        .repo {
          ${theme.flexBetween};
          flex-direction: column;
          padding: 1rem;
          height: 100%;
          color: ${theme.colors.white};
          background-color: ${theme.colors.darkGrey};
          border-radius: 0.25rem;
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
          transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s;

          &:hover,
          &:focus {
            box-shadow: 0 8px 20px -15px rgba(0, 0, 0, 0.2);
          }
          h3 {
            ${theme.ellipsis};
            color: ${theme.colors.rose};
            margin-bottom: 0.75rem;
            font-size: 20px;
            font-family: ${theme.fonts.secondary};
            font-weight: 500;
            letter-spacing: -0.5px;
          }
          p {
            font-size: 14px;
            margin: 0.5rem 0 1rem 0;
            font-weight: 400;
          }
          &__header {
            margin-bottom: 2rem;
          }
          &__name {
            display: flex;
            align-items: center;
            svg {
              margin-right: 0.5rem;
              min-width: 16px;
            }
            h3 {
              margin: 0;
            }
          }
          &__stats {
            ${theme.flexBetween};
            font-size: 13px;
            color: ${theme.colors.lightGrey};
            &--left {
              flex-grow: 1;
              display: flex;
              span {
                display: flex;
                align-items: center;
                margin-right: 0.75rem;
                svg {
                  margin-right: 0.25rem;
                }
                .language {
                  border-radius: 100%;
                  width: 10px;
                  height: 10px;
                  background-color: blue;
                  margin-right: 0.25rem;
                }
              }
            }
          }
        }
      }
    }
  }
`

export default class ReposData extends Component {
  static contextType = AppContext;

  render() {

    return (
      <React.Fragment>
        {console.log(this.state)}
        <ReposWrapper>
          <div className="repo-list">
            <div className="toprepostitle">Top Repositories</div>
            <ul>
              {!this.context.isLoading ? (
                this.context.reposdata.map(repo => {
                  const { id, name, html_url, description, size, stargazers_count, language, forks } = repo;
                  return (
                    <li key={id}>

                      <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo">
                        <div className="repo__top">
                          <div className="repo__name">

                            <h3>{name}</h3>
                          </div>
                          <p>{description}</p>
                        </div>
                        <div className="repo__stats">
                          <div className="repo__stats--left">
                            <span>
                              <div
                                className="language"

                              />
                              {language}
                            </span>
                            <span>
                              {stargazers_count.toLocaleString()}
                            </span>
                            <span>
                              {forks.toLocaleString()}
                            </span>
                          </div>
                          <div className="repo__stats--right">
                            <span>{size.toLocaleString()} KB</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  );

                }
                )) : (
                  <p>Loading...</p>
                )}





            </ul>
          </div>
        </ReposWrapper>
      </React.Fragment >
    )
  }
}
