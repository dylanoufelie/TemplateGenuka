import React from 'react'

export default function LoadingPage() {
    return (
        <div className="containerLoad">

            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#ffc107" />
                <circle cx="170" cy="170" r="135" stroke="gray" />
                <circle cx="170" cy="170" r="110" stroke="#ffc107" />
                <circle cx="170" cy="170" r="85" stroke="gray" />
            </svg>

        </div>
    )
}
