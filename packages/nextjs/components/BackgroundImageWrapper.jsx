import React from 'react'

function BackgroundImageWrapper({ children }) {
    return (
        <div className="bg-[url('/assets/landing-background-3.png')] bg-fixed p-5 h-full bg-cover bg-center flex flex-col flex-grow">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="z-10">
                {children}
            </div>
    </div>
    )
}

export default BackgroundImageWrapper