import AlarmState from './AlarmState';

export default class extends AlarmState {
  constructor(clock) {
    super(clock);
    this.state = 'clock';
  }

  currentMode() {
    return this.state;
  }

  clickMode() {
    if(this.state === 'bell') {
      this.state = 'clock';
    } else {
        if(this.state === 'clock') this.state = 'alarm';
        else this.state = 'clock';
    }
  }
}