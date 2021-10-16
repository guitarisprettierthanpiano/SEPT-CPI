import * as React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'

const Home: React.FC = () => {
    const [cpiArray, setCpiArray] = useState([])

    //cpi data from https://www.bls.gov/regions/mid-atlantic/data/consumerpriceindexhistorical_us_table.htm
    const fetchAPI = () => {
        fetch('././api-data/cpi.json')
            .then(res => res.json())
        .then(result => {
            setCpiArray(result[0].CPI)  
        })
    }

    //fetches the api once on page load
    useEffect( () => {
        fetchAPI();
    }
    , [])


    const data = {
        //labels: ['1', '2', '3', '4', '5', '6'],
        labels: cpiArray,
        datasets: [
            {
                label: 'seepeeeye',
                data: cpiArray.slice(-14,-1),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }; 




    return(
        <>
        <h1>{cpiArray[0]}</h1>
        <h2>{cpiArray[128]}</h2>

        <div>
            <Line data={data} options={options} />
        </div>
        <h4>et45</h4>
        </>
    )
}

export default Home;