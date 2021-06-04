import React, { useState, useEffect } from 'react';
import { useFetch } from './App.js';
import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { RadialBarChart, RadialBar } from 'recharts';

export function UserBarChart({ source }) {
    //const [loading, source] = useFetch(user, action);

    return (
        <div className="chart">
            <h2 className="chartitle">Activité quotidienne</h2>
            <BarChart
                data={source.data.sessions}
                width={1100}
                height={350}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kilogram" fill="#282d30" barSize={15} />
                <Bar dataKey="calories" fill="#e60000" barSize={15} />
            </BarChart>
        </div>
    );
}

export function UserLineChart({ source}) {
    //const [loading, source] = useFetch(user, action);

   /* if (loading) {
        return (
            <div>
                <h2>chargement du graphique...</h2>
            </div>
        )
    }*/
    //   console.log(source.data.sessions)
    return (
        <div className="chart2">
            <h2 className="chartitle pink">Durée moyenne des sessions</h2>
            <LineChart
                data={source.data.sessions}
                width={335}
                height={280}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >

                <XAxis dataKey="day" stroke="#ffabab" />

                <Tooltip />
                <Legend />
                <Line type="monotone" dot={false} dataKey="sessionLength" stroke="#ffabab" strokeWidth={3} />

            </LineChart>
        </div>
    );
}

export function UserRadarChart({ source }) {
 
    console.log(source.data)
    //repatch
    let prep = []
    for (let i = 1; i < 7; i++) {
        let item = source.data.data[i - 1].value;
        prep.push({ type: source.data.kind[i], value: item });
    }
    // console.log("PREP", prep)

    return (
        <div>
            <RadarChart
                cx={170}
                cy={195}
                outerRadius={100}
                width={350}
                height={380}
                data={prep}
                style={{ backgroundColor: '#282d30', borderRadius: '15px', marginTop: '15px' }}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="type" stroke="#e5e5e5" />

                <Radar name="Perfs" dataKey="value" stroke="#be0e0f" fill="#be0e0f" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
}

export function UserRadialBar({ source }) {

    console.log("today", source.data.todayScore)

    const data = [{ todayScore: source.data.todayScore * 100 }];
    const pourcent = source.data.todayScore * 100;

    const end = Math.floor(270 - data[0].todayScore * 1.8)
    //const end=90;
    //console.log(end)
    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    return (
        <div className="chart-score">
            <h2>Score</h2>
            <div className="objectif">
                <p className="objectifbig">{pourcent} %</p>
                <p className="objectif2">de votre objectif</p></div>
            <div className="radialbar">
                <RadialBarChart
                    width={500}
                    height={300}
                    innerRadius="80%"
                    outerRadius="90%"
                    data={data}
                    startAngle={270}
                    endAngle={end}
                >
                    <RadialBar minAngle={-50} barSize={15} fill="red" clockWise={true} dataKey='todayScore' />

                    <Tooltip />
                </RadialBarChart>
            </div>
        </div>
    );
}

export function InfoRight({ source }) {

    return (
        <div className="tabright">

            <div className="elemright">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src="/calories-icon.png"></img>
                            </td>
                            <td>
                                <p className="info1">{source.data.keyData.calorieCount}kCal</p>
                                <p className="info2">Calories</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="elemright">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src="/protein-icon.png"></img>
                            </td>
                            <td>
                                <p className="info1">{source.data.keyData.proteinCount}g</p>
                                <p className="info2">Calories</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="elemright">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src="/carbs-icon.png"></img>
                            </td>
                            <td>
                                <p className="info1">{source.data.keyData.carbohydrateCount}g</p>
                                <p className="info2">Calories</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="elemright">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src="/fat-icon.png"></img>
                            </td>
                            <td>
                                <p className="info1">{source.data.keyData.lipidCount}g</p>
                                <p className="info2">Calories</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    )

}