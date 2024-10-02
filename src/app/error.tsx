'use client' // Error components must be Client Components

import images from '@/assets'
import Image from 'next/image'
import React from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className='flex flex-col w-screen h-screen justify-center items-center gap-5'>
            <Image alt='' src={images.error} />
            <div>{error.message}</div>
            <button onClick={reset}>Try again</button>
        </div>
    )
}