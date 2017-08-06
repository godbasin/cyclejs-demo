import xs from 'xstream'
import {AppComponent} from './component/app'
import {LoginComponent} from './component/login'

function main(sources) {
  const match$ = sources.router.define({
    '/': LoginComponent,
    '/app': AppComponent,
  });
  
  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }));
  });
  
  return {
    DOM: page$.map(c => c.DOM).flatten(),
    // get page router or init
    router: xs.merge(page$.map(c => c.router).filter(x => x || '').flatten()),
  };
}

export default main;