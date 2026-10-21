/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { cn } from '../lib/utils';

type ImageStatus = 'pending' | 'done' | 'error';

interface PolaroidCardProps {
    imageUrl?: string;
    caption: string;
    status: ImageStatus;
    error?: string;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-neutral-400" xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay = ({ error }: { error?: string }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-2">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-400 text-xs mt-2 font-semibold">Generación Fallida</p>
    </div>
);

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-permanent-marker text-xl">Subir Foto</span>
    </div>
);


const PolaroidCard: React.FC<PolaroidCardProps> = ({ imageUrl, caption, status, error }) => {
    
    const cardInnerContent = (
        <>
            <div className="w-full bg-neutral-900 shadow-inner flex-grow relative overflow-hidden group">
                {status === 'pending' && <LoadingSpinner />}
                {status === 'error' && <ErrorDisplay error={error} />}
                {status === 'done' && imageUrl && (
                     <img
                        src={imageUrl}
                        alt={caption}
                        className="w-full h-full object-cover"
                    />
                )}
                {status === 'done' && !imageUrl && <Placeholder />}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center px-2">
                <p className={cn(
                    "font-permanent-marker text-lg truncate",
                    status === 'done' && imageUrl ? 'text-black' : 'text-neutral-800'
                )}>
                    {caption}
                </p>
            </div>
        </>
    );

    return (
        <div className="bg-neutral-100 dark:bg-neutral-100 !p-4 !pb-16 flex flex-col items-center justify-start aspect-[3/4] w-80 max-w-full rounded-md shadow-lg relative">
            {cardInnerContent}
        </div>
    );
};

export default PolaroidCard;