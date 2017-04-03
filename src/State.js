import AlarmState from './AlarmState';

export default class extends AlarmState {
  constructor(clock) {
    super(clock);
    this.state = 'clock';
  }

  clickMode() {
    if(!this.onBell) {
      if(this.state === 'clock') this.state = 'alarm';
      else this.state = 'clock';
    } else if(this.onBell) this.state = 'bell';
  }
}