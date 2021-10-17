import * as React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'

const Home: React.FC = () => {
    //const [cpiArray, setCpiArray] = useState([])
    const [cpiSubArray, setCpiSubArray] = useState([])
    const [cpiPercentArray, setCpiPercentArray] = useState([])

    const fetchCPI = () => {
        fetch('././api-data/cpi.json')
            .then(res => res.json())
        .then(result => {
            //first copy the entire array into a stored variable
            //setCpiArray(result[0].CPI)
            
            //then making a sub array of every 12 months
            let tempArray = []

            //i chose these numbers for j because there are 129 entries and 12 months per year
            for (let j = 128; j > 7; j -= 12){
                let cpiNum = parseFloat(result[0].CPI[j].toFixed(2));
                tempArray.push(cpiNum)
            }
            tempArray.reverse()
            setCpiSubArray(tempArray)

            //calculating percentage changes
            let percentageArray = []
            for (let i = 0; i < (tempArray.length - 1); i++){
                let percentChange = (100*
                    ((tempArray[1+i]-tempArray[i])/tempArray[i])
                    ).toFixed(2)
                percentageArray.push(percentChange)
            }

            //adding a blank space to the array so the chart looks proper
            percentageArray.unshift(NaN)
            setCpiPercentArray(percentageArray)
        }) 
    }


    //fetches the api only once on page load
    useEffect(() => {
        fetchCPI();
    }
    , [])


    //CHART DATA AND SETTINGS
    const data = {
        //labels: ['1', '2', '3', '4', '5', '6'],
        type: 'line',
        labels: ['Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16', 'Sep 17', 'Sep 18', 'Sep 19', 'Sep 20', 'Sep 21'],
        animations: {
            y: {
              duration: 2000,
              delay: 500
            }
        },
        datasets: [
            {
                label: 'CPI In September',
                yAxisID: 'A',
                data: cpiSubArray,
                fill: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'red',
                tension: 0.4
            },
            {
                label: 'CPI Percent Change From Prev Sep',
                yAxisID: 'B',
                data: cpiPercentArray,
                fill: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: "blue",
                tension: 0.4
              }
        ],
    };

    const options = {
        options: {
            legend: {
                labels: {
                  fontSize: 24
                }
              },

            /*
            animations: {
                tension: {
                  duration: 500,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: false
                }
            },
            */

            maintainAspectRatio: false,

            responsive: true,

            interaction: {
              mode: 'index',
              intersect: false,
            },

            plugins: {
                title: {
                  display: true,
                  font: {
                    size: 24,
                    weight: 600
                  },
                  color:'rgba(0, 0, 0, 0.8)',
                  text: 'Yearly September Consumer Price Index',
                },
            },

            scales: {
                x: {
                    ticks: {
                      font: {
                        size: 14
                      }
                    }
                  },
                A: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        font: {
                          size: 14,
                        },
                        callback: function(value, index, values) {
                            return '$' + value.toFixed(cpiSubArray) + '.00';
                        }
                    },
                    text: 'CPI',
                    max: 290,
                    stepSize: 10,
                },
                B: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                      },
                    text: 'CPI Percentage Change',
                    ticks: {
                        font: {
                            size: 14,
                        },
                        callback: function(value, index, values) {
                            return value.toFixed(cpiPercentArray)+'.00%';
                        }
                    }
                }
            }
        }}


    return(
        <>

        <div id='line-chart'>
            <Line
            data={data} 
            options={options.options}
            />
        </div>

        <div className='description'>
            <p>
                <span className='ital'>The Consumer Price Index (CPI) is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services.</span>
                <span title='https://www.bls.gov/cpi/'>
                    <a href='https://www.bls.gov/cpi/' target="_blank">
                        💡
                    </a>
                </span>
            </p>
        </div>
        </>
    )
}

export default Home;