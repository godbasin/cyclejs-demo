import {run} from '@cycle/run'
import xs from 'xstream';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cyclic-router';
import {createHashHistory} from 'history';
import switchPath from 'switch-path';  // Required in v3, not required in v2 or below 
import {AppComponent} from './app'
import {LoginComponent} from './login'

function main(sources) {
  const match$ = sources.router.define({
    '/login': LoginComponent,
    '/app': AppComponent,
    '*': LoginComponent
  });
  
  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }));
  });
  
  return {
    DOM: page$.map(c => c.DOM).flatten(),
    router: xs.of('/login'),
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
  router: makeRouterDriver(createHashHistory(), switchPath)  // v3
  // router: makeRouterDriver(createHistory()) // <= v2
});
