import { AiOutlineLike } from "react-icons/ai";
export const LikeIcon = () => (
    <AiOutlineLike className="w-[20px] h-[20px]" />
);

export const EditProfileIcon = ({ width = '20px', height = '20px' }) => (
    <svg
        width="16" data-e2e=""
        height="16" viewBox="0 0 48 48"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z"></path><path d="M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z"></path></svg>
)
export const EditLocationIcon = () => {
    return (
        <div className="icon-container cursor-pointer">
            <svg viewBox="0 0 24 24" width="24px" height="24px" className="icon">
                <path d="M10.65 5.8a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m6.2 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m-6.2 6.2a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m6.2 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m-6.2 6.2a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m6.2 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"></path>
            </svg>
        </div>
    );
}; export const UploadIconPage = ({ width = '30px', height = '30px' }) => (
    <svg
        style={{ color: '#a9a9a9' }}
        fill="currentColor" viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg" width={width} height={height}
    ><path d="M25.84 37h8.66a9.5 9.5 0 0 0 1.35-18.9A12 12 0 0 0 12 20v.01A8.5 8.5 0 0 0 12.5 37h10.34V25.6l-1.72 1.74a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 0-1.41l4.4-4.4c.68-.76 1.22-.77 2 .08l4.28 4.32a1 1 0 0 1 0 1.4l-.7.72a1 1 0 0 1-1.42 0l-1.72-1.75V37Z"></path></svg>
)
