import React from 'react';
function Emotion({ onEmotionClick }) {
    const emotions = [
        { emoji: "👍", label: "0" },
        { emoji: "❤️", label: "1" },
        { emoji: "😢", label: "2" },
        { emoji: "😂", label: "3" },
        { emoji: "😮", label: "4" },
        { emoji: "😡", label: "5" },
    ];
    const handleEmojiClick = (label) => {
        onEmotionClick(label);
    };
    return (
        <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 border border-[#b3b3b3] flex bg-white rounded-3xl shadow-lg"
        // onMouseLeave={onHoverEnd}
        >
            {emotions.map((emotion, index) => (
                <button
                    key={index}
                    className="flex flex-col items-center mx-1 hover:scale-110 transition-transform"
                    title={emotion.label}
                    onClick={() => handleEmojiClick(emotion.label)}
                >
                    <span className="text-2xl">{emotion.emoji}</span>
                </button>
            ))}
        </div>
    );
}

export default React.memo(Emotion);