import React, { useState, useEffect } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-to-top-button"
                >
                    <MdOutlineArrowUpward className="font-bold" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
