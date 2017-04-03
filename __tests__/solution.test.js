import AlarmClock from '../src/AlarmClock';

describe('AlarmClock', () => {
  it('should have default values', () => {
    const clock = new AlarmClock();
    expect(clock.minutes()).toBe(0);
    expect(clock.hours()).toBe(12);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);
  });

  it('should change state when click to mode', () => {
    const clock = new AlarmClock();
    expect(clock.isAlarmOn()).toBeFalsy();
    expect(clock.currentMode()).toBe('clock');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBeFalsy();
    expect(clock.currentMode()).toBe('alarm');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBeFalsy();
    expect(clock.currentMode()).toBe('clock');

    clock.longClickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBeTruthy();
    expect(clock.currentMode()).toBe('clock');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBeTruthy();
    expect(clock.currentMode()).toBe('alarm');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBeTruthy();
    expect(clock.currentMode()).toBe('clock');

    clock.longClickMode();
    expect(clock.isAlarmOn()).toBeFalsy();
  });

  it('should change hours and minutes', () => {
    const clock = new AlarmClock();
    clock.clickH();
    expect(clock.minutes()).toBe(0);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);
   
    clock.clickM();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);

    clock.clickMode();

    clock.clickH();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(7);
    expect(clock.alarmMinutes()).toBe(0);

    clock.clickM();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(7);
    expect(clock.alarmMinutes()).toBe(1);

    for (let i = 0; i < 60; i++) {
      clock.clickM();
    }
    expect(clock.alarmMinutes()).toBe(1);
    expect(clock.alarmHours()).toBe(7);

    for (let i = 0; i < 17; i++) {
      clock.clickH();
    }
    expect(clock.alarmHours()).toBe(0);
  });

  it('should not start bell if alarm off', () => {
    const clock = new AlarmClock();

    for (let i = 0; i < 18 * 60; i++) {
      clock.tick();
    }
    expect(clock.isAlarmTime()).toBeTruthy();
    expect(clock.currentMode()).toBe('clock');
    expect(clock.clickM()).toBeFalsy();
    expect(clock.clickH()).toBeFalsy();

    clock.tick();
    expect(clock.currentMode()).toBe('clock');
  });

  it('should start bell if alarm on 1', () => {
    const clock = new AlarmClock();
    clock.longClickMode();

    for (let i = 0; i < 18 * 60; i++) {
      clock.tick();
    }

    expect(clock.isAlarmTime()).toBeTruthy();
    expect(clock.currentMode()).toBe('bell');
    expect(clock.clickM()).toBeFalsy();
    expect(clock.clickH()).toBeFalsy();

    clock.tick();
    expect(clock.currentMode()).toBe('clock');
  });

  it('should start bell if alarm on 2', () => {
    const clock = new AlarmClock();
    clock.longClickMode();

    for (let i = 0; i < 18 * 60; i++) {
      clock.tick();
    }
    expect(clock.isAlarmTime()).toBeTruthy();
    expect(clock.currentMode()).toBe('bell');

    clock.clickMode();
    expect(clock.currentMode()).toBe('clock');
  });
});