import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';

export function LoginComponent(sources) {
    const domSource = sources.DOM;

    // login click for router
    const loginClick$ = domSource.select('#submit').events('click')

    // input stream for view
    const unameInput$ = domSource.select("#username").events("input")
        .map(ev => { return { username: ev.target.value } })
        .startWith({ username: '' })
    const pwdInput$ = domSource.select("#password").events("input")
        .map(ev => { return { password: ev.target.value } })
        .startWith({ password: '' })

    // set body class
    document.body.className = 'login'

    // state for cache of last input value
    let state: any = {}

    const loginView$ = xs.merge(unameInput$, pwdInput$).map((res: any) => {
        state.username = res.username ? res.username : state.username;
        state.password = res.password ? res.password : state.password;
        return (

            <div>
                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <form>
                                <h1>System</h1>
                                <div>
                                    <input type="text" className="form-control" id="username" placeholder="username" value={state.username || ''} />
                                </div>
                                <div>
                                    <input type="password" className="form-control" id="password" placeholder="password" value={state.password || ''} />
                                </div>
                                <div>
                                    <a className="btn btn-default" id="submit">Login</a>
                                </div>

                                <div className="clearfix"></div>

                            </form>
                        </section>
                    </div>

                </div>
            </div>
        )
    }
    );
    return {
        DOM: loginView$,
        router: loginClick$.mapTo("/app")
    };
}
