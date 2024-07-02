import { Route, Switch } from 'wouter'

// /* Component */
import { Navbar } from './components/Navbar'
import { Home } from './pages'

function App() {

  return (
    <>
      <Navbar>
        <Switch>
          <Route path='/' component={Home}/>
          {/* <Route path='/heroes' component={Heroes}/>
          <Route path='/marvel' component={Marvel}/>
          <Route path='/heroes/:heroesName' component={HeroesDetail}/>
          <Route path='/addform' component={AddForm}/>
          <Route path='/editform/:id' component={AddForm}/>
          <Route path='/UserDetail' component={UserDetail}/> */}
        </Switch>
      </Navbar>
    </>
  )
}

export default App