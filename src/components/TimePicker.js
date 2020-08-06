import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const TimePicker = createReactClass({
  propTypes: {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    beginLimit: PropTypes.string,
    endLimit: PropTypes.string,
    step: PropTypes.number,
    timeStamp: PropTypes.string,
  },

  isEarlierThanEndLimit: function (timeValue, endLimit, lastValue) {
    const timeValueIsEarlier = moment(timeValue, 'HH:mm').diff(moment(endLimit, 'HH:mm')) < 0;
    const timeValueIsLaterThanLastValue =
      lastValue === undefined
        ? true
        : moment(lastValue, 'HH:mm').diff(moment(timeValue, 'HH:mm')) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  },

  render() {
    let timeValue = this.props.beginLimit || '00:00';
    let lastValue;
    const endLimit = this.props.endLimit || '23:30';
    const step = this.props.step || 15;

    const options = [];
    options.push(
      <option key={timeValue} value={timeValue}>
        {timeValue}
      </option>,
    );

    while (this.isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
      lastValue = timeValue;
      timeValue = moment(timeValue, 'HH:mm').add(step, 'minutes').format('HH:mm');
      options.push(
        <option key={timeValue} value={timeValue}>
          {timeValue}
        </option>,
      );
    }
    return (
      <select
        className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}
        name={this.props.name}
      >
        {options}
      </select>
    );
  },
});

export default TimePicker;
