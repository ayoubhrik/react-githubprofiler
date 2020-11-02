import React, { Component } from 'react'
import { theme, GlobalStyle } from '../styles';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import AppContext from '../context';




const Chart = styled.div`
  max-width: 500px;
  padding: 0 2rem 2rem 2rem;
  margin:auto;
  div{
    display: flex;
    -webkit-box-pack: justify;
    justify-content: center;
    h2 {
        font-size : 1.5rem !important;
        font-weight: 500 !important;
    }
  }
`;
const ChartContainer = styled.div`

`;


export default class LanguagesStats extends Component {
    static contextType = AppContext;

    render() {
    
        return (
            
                <React.Fragment>
                    <GlobalStyle />
                    <Chart>
                        <div>
                            <h2>Top Languages</h2>
                        </div>
                        <ChartContainer>
                            {/* <canvas id="myChart" width={300} height={300} /> */}
                            <Pie
                                data={this.context.data}
                                width={300}
                                height={300}
                                options={{ maintainAspectRatio: false, responsive: true }}
                            />
                        </ChartContainer>
                    </Chart>
                </React.Fragment>
           
        )
    }
}
