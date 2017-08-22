import xs from 'xstream';
import { run } from '@cycle/run';
import { mockDOMSource } from '@cycle/dom';
import { bindMethods } from 'utils/bindMethods';

let id = 0;

@bindMethods
export class InputComponent {
  id;
  listener;
  DOM;
  inputGet;
  inputSet;
  constructor(domSource, type) {
    this.id = id++;

    // init stream and get listener
    this.inputSet = xs.create({
      start: listener => {
        this.listener = listener;
      },
      stop: () => {},
    }).startWith(undefined);

    // subscribe input stream
    this.DOM = xs.merge(this.inputSet).map(val =>
      <input type={type} id={'input' + this.id} className="form-control" value={val} />
    );

    // combine streams
    this.inputGet = xs.merge(domSource.select('#input' + this.id).events('keyup')
    .map(ev => ev.target.value), this.inputSet).startWith('');
  }
  getDOM() {
    return this.DOM;
  }
  get value() {
    return this.inputGet;
  }
  set value(val) {
    // set listener
    this.listener.next(val);
  }
}