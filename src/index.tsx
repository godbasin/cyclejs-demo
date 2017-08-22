import {run} from '@cycle/run';
import xs from 'xstream';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cyclic-router';
import {createHashHistory} from 'history';
import switchPath from 'switch-path';  // Required in v3, not required in v2 or below

// import router
import router from './router';

// import css style
require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../static/css/custom.css");
require("../static/css/common.css");

run(router, {
  DOM: makeDOMDriver('#app'),
  router: makeRouterDriver(createHashHistory(), switchPath)  // v3
  // router: makeRouterDriver(createHistory()) // <= v2
});
