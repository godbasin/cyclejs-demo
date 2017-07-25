import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { html } from 'snabbdom-jsx';

export function LoginComponent(sources) {
    const domSource = sources.DOM;
    const loginClick$ = domSource.select(".submit").events("click");
    const unameInput$ = domSource.select("#username").events("input")
        .map(ev => {return {username: ev.target.value}})
        .startWith({username: ''});
    const pwdInput$ = domSource.select("#password").events("input")
        .map(ev => {return {password: ev.target.value}}).startWith({password:''});
    let state = {};
    const loginView$ = xs.merge(unameInput$, pwdInput$).map(res => {
        state.username = res.username ? res.username : state.username;
        state.password = res.password ? res.password : state.password;
        return (
            
        <div>
            <div class="login_wrapper">
                <div class="animate form login_form">
                    <section class="login_content">
                        <form>
                            <h1>管理系统</h1>
                            <div>
                                <input type="text" class="form-control" id="username" placeholder="用户名" value={state.username || ''} required />
                            </div>
                            <div>
                                <input type="password" class="form-control" id="password" placeholder="密码" value={state.password || ''} required />
                            </div>
                            <div>
                                <button class="btn btn-default submit">登录</button>
                            </div>

                            <div class="clearfix"></div>

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
        router: xs.merge(
            // Go to page "/app"
            loginClick$.mapTo("/125361253")
        ),
    };
}
