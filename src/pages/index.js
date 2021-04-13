import React from 'react';
import { Switch, Route } from 'react-router';

import Home from './Home/Home';

export default function Pages() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
    )
};
