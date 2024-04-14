import React from 'react'
import Header from '../components/Header/Header'
import Card from '../components/Card/Card'
import Search from '../components/Search/Search'

function Cuidadores() {
  return (
    <>
        <Header />
        <Search />
        <div style={{ display: 'flex', margin: '0 auto', width: '95%', flexDirection: 'row', gap: '1em', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
    </>
  )
}

export default Cuidadores