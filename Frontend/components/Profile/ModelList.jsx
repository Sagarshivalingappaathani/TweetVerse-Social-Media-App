import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Modal = ({ isOpen, onClose, listType, listData }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-black font-bold">
                {listType === 'Followers' ? 'Followers' : 'Following'}
              </h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {listData.length > 0 ? (
              <ul className="list-none space-y-2">
                {listData.map((item) => (
                  <Link key={item.user_id} href={`/profile/${item.user_id}`}>
                    <li className="flex items-center text-black hover:bg-gray-100 hover:text-blue-600 rounded-md p-2">
                      <div className="truncate mr-2 text-lg font-medium">
                        {item.displayname}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">
                {listType === 'Followers'
                  ? 'This user has no followers yet.'
                  : 'This user is not following anyone yet.'}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
