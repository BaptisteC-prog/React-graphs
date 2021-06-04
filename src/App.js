import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { UserBarChart, UserLineChart, UserRadarChart, UserRadialBar, InfoRight } from './charts.jsx'


export function useFetch(userId, action = "") {

  const [state, setState] = useState({
    items: [],
    loading: true
  })
  console.log(userId, action);
  React.useEffect(function () {
    (async function () {
      const response = await fetch(`http://localhost:3300/user/${userId}/${action}`)
      const responseData = await response.json()
      //console.log(responseData.data.userInfos.firstName)
      if (response.ok) {
        setState({
          source: responseData,
          loading: false
        })
      } else {
        alert(JSON.stringify(responseData))
        setState(s => ({ ...s, loading: false }))
      }

    })()
  }, [])

  return [
    state.loading,
    state.source
  ]
}

function TopMenu() {
  return (<div id="TopMenu">
    <table>
      <tbody>
        <tr>
          <td><img src="/logo.png"></img></td>
          <td>Accueil</td>
          <td>Profil</td>
          <td>Réglages</td>
          <td>Communauté</td>
        </tr>
      </tbody>
    </table>
  </div>)
}

function LeftMenu() {
  return (
    <div id="LeftMenu">
      <p className="vertical bottom">Copiryght, SportSee 2020</p>
      <table>
        <tbody>
          <tr><td><img src="/icon1.png"></img></td></tr>
          <tr><td><img src="/icon2.png"></img></td></tr>
          <tr><td><img src="/icon3.png"></img></td></tr>
          <tr><td><img src="/icon4.png"></img></td></tr>
        </tbody>
      </table>
    </div>
  )
}

function UserMain() {
  const devMode = false
  const { id } = useParams()
  //LE MIEUX c'est fetch ici une fois et de l'envoyer au composant apres
  const [loading, source] = useFetch(id);
  const [loading2, BarChartData] = useFetch(id, "activity");
  const [loading3, RadarChartData] = useFetch(id, "performance");
  const [loading4, RadialBarData] = useFetch(id);
  const [loading5, InfoRightData] = useFetch(id);
  const [loading6, LineChartData] = useFetch(id,"average-sessions");
  //console.log("score", source.data.todayScore)

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }
  console.log(RadarChartData)
  //let userScore={TodayScore : source.data.todayScore};

  /* */
  return (
    <div className="App">

      <div id="Main">
        <h1>Bonjour <span className="red">{source.data.userInfos.firstName}</span></h1>

        {!loading2 && < UserBarChart source={BarChartData} />}
        <table className="chartable">
          <tbody>
            <tr>
              {!loading6 && <td> <UserLineChart source={LineChartData} /></td>}
              {!loading3 && <td> <UserRadarChart source={RadarChartData} /></td>}
              {!loading4 && <td> <UserRadialBar source={RadialBarData} /> </td>}
            </tr>
          </tbody>
        </table>
        {!loading5 && <InfoRight source={InfoRightData} />}

        {devMode && <h3 className="dev">{source.data.userInfos.firstName} {source.data.userInfos.lastName}, {source.data.userInfos.age} ans</h3>}
      </div>
    </div>)
}

function UserScore() {
  const devMode = true
  const { id } = useParams()

  const [loading, source] = useFetch(id);

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <div id="Main">
        {devMode && <h3 className="dev">SCORE : {source.data.score} </h3>}
      </div>
    </div>)
}

function UserKeyData() {
  const devMode = true
  const { id } = useParams()

  const [loading, source] = useFetch(id);

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }
  console.log(source.data.keyData);

  let keynumbers = []
  let translation = ["Calories", "Proteines", "Glucides", "Lipides"]
  let i = 0;
  for (const [key, value] of Object.entries(source.data.keyData)) {
    keynumbers.push([translation[i], value]);
    i++;
  }
  console.log(keynumbers);

  return (
    <div className="App">

      <div id="Main">
        {devMode && <h3 className="dev">Chiffres clés</h3>}
        {devMode && keynumbers.map(item => <div key={item} className="dev">
          <p> <b>{item[0]} : </b> {item[1]} </p>
        </div>)}
      </div>
    </div>)
}


function UserActivity() {
  const devMode = true
  const { id } = useParams()

  const [loading, source] = useFetch(id, "activity");

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }

  return (
    <div className="App">

      <div id="Main">
        {devMode && <h3 className="dev">Activité</h3>}
        {devMode && source.data.sessions.map(item => <div key={item.day} className="dev">
          <p><b>Date :</b> {item.day}</p>
          <p><b>Kilogrammes :</b> {item.kilogram}</p>
          <p><b>Calories :</b> {item.calories}</p>
        </div>)}
      </div>
    </div>)
}

function UserSessions() {
  const devMode = true
  const { id } = useParams()

  const [loading, source] = useFetch(id, "average-sessions");

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }

  return (
    <div className="App">

      <div id="Main">
        {devMode && <h3 className="dev">Durée des sessions</h3>}
        {devMode && source.data.sessions.map(item => <div key={item.day} className="dev">
          <p><b>Jour :</b> {item.day}</p>
          <p><b>Durée :</b> {item.sessionLength}</p>
        </div>)}
      </div>
    </div>)
}

function UserPerformance() {
  const devMode = true
  const { id } = useParams()

  const [loading, source] = useFetch(id, "performance");

  if (loading) {
    return (
      <div id="Main">
        <h1>chargement...</h1>
      </div>
    )
  }

  return (
    <div className="App">

      <div id="Main">
        {devMode && <h3 className="dev">Activités</h3>}

        {devMode && source.data.data.map(item => <div key={item.kind} className="dev">
          <p><b>Type :</b> {source.data.kind[item.kind]}</p>
          <p><b>Valeur :</b> {item.value}</p>

        </div>)}
      </div>
    </div>)
}

function DefaultLanding() {
  return (<div id="Main">
    <h1>Bonjour, bienvenue sur notre site</h1>
  </div>)
}

function Home() {
  return (
    <div id="Home">
      <DefaultLanding />
    </div>
  )
}

function Page404() {
  return (
    <div id="Home">
      <div id="Main">
        <h1>Désolé, cette page n'existe pas</h1>
      </div>
    </div>
  )
}


function App() {
  return (
    <Router>
      <div className="App">
        <TopMenu />
        <LeftMenu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/:id" component={UserMain} />
          <Route exact path="/user/:id/activity" component={UserActivity} />
          <Route exact path="/user/:id/average-sessions" component={UserSessions} />
          <Route exact path="/user/:id/activities" component={UserPerformance} />
          <Route exact path="/user/:id/today-score" component={UserScore} />
          <Route exact path="/user/:id/key-data" component={UserKeyData} />




          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
