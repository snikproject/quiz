import React from 'react';
import PropTypes from 'prop-types';

const TimeUpModal = ({ modal: { state} }) => {
  return (
    <div className={'correct-modal' + (state === 'show' ? ' modal-enter' : '')}>
      Time Is Up!
    </div>
  );
};

TimeUpModal.propTypes = {
  modal: PropTypes.shape({
    state: PropTypes.string.isRequired,
  })
};

export default TimeUpModal;
