import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { InputComponent } from 'components/input';

export function LoginComponent(sources) {
    const domSource = sources.DOM;

    // login click for router
    const loginClick$ = domSource.select('#submit').events('click');

    // get password input dom and value
    const pwdInputSource = new InputComponent(domSource, 'password');
    const pwdInputDOM$ = pwdInputSource.getDOM();
    const pwdInputValue$ = pwdInputSource.value;

    // get username input dom and value
    const unameInputSource = new InputComponent(domSource, 'text');
    const unameInputDOM$ = unameInputSource.getDOM();
    const unameInputValue$ = unameInputSource.value;

    // set body class
    document.body.className = 'login';

    const loginView$ = xs.combine(unameInputDOM$, unameInputValue$, pwdInputDOM$, pwdInputValue$).map(([unameDOM, unameValue, pwdDOM, pwdValue]) => {
        return (

            <div>
                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <form>
                                <h1>System</h1>
                                <div>
                                    {unameDOM}
                                </div>
                                {unameValue}
                                <div>
                                    {pwdDOM}
                                </div>
                                {pwdValue}
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
