import React from 'react';

const Dialog = ({ isOpen, setIsOpen, title, content }) => {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`dialog ${isOpen ? 'block' : 'hidden'} py-6 px-10 rounded-lg bg-gradient-to-t from-bg-black-bottom to-bg-black-top-2 w-10/12 text-white absolute top-1/2 -translate-y-1/2 mt-20 mb-40 overflow-scroll`}>
      <div className="dialog-overlay" onClick={handleClose}></div>
      <div className="dialog-content">
        <div className="dialog-header flex w-full justify-between text-2xl">
          <h2 className='font-semibold'>{title}</h2>
          <button className='font-bold' onClick={handleClose}>&times;</button>
        </div>
        <div className="w-8/12 h-px my-4 bg-white"></div>
        <div className="dialog-body max-h-screen">{content}</div>
      </div>
    </div>
  );
};

export default Dialog;
