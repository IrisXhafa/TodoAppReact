import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Create from '../pages/Todo/Create';
import Edit from '../pages/Todo/Edit';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/todo/create" exact>
                <Create />
            </Route>
            <Route path="/todo/:id" exact>
                <Edit />
            </Route>
        </Switch>
    )
}

export default Routes
