"use client";

import getQuery from "@/helpers/search-params.js";
import Help from "./Help";
import Image from "next/image";
import locale from "@/locales/ru/tree/tree.json";
import localeLoading from "@/locales/ru/load.json";
import Link from "next/link";
import ThemeContext from '@/contexts/ThemeContext';
import Toggle from "@/components/tree/Toggle.js";
import { useContext } from "react";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

export default function Tree({ personId, toggle, image }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const htmlImage = { __html: image };

    const [parentId, setParentId] = useState(toggle.parentTarget);
    const [showHelp, setShowHelp] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isInitialized, setIsInitialized] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [isPinching, setIsPinching] = useState(false);
    const [pinchStart, setPinchStart] = useState({ distance: 0, scale: 1, x: 0, y: 0 });
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const svgContainerRef = useRef(null);
    const fullscreenContainerRef = useRef(null);

    const { theme } = useContext(ThemeContext);

    const fitToContainer = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const svgElement = container.querySelector('svg');
        if (!svgElement) return;

        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;

        if (containerWidth === 0 || containerHeight === 0) return;

        let svgWidth = 0, svgHeight = 0;
        
        const viewBox = svgElement.getAttribute('viewBox');
        if (viewBox) {
            const parts = viewBox.split(' ').map(Number);
            if (parts.length === 4) {
                svgWidth = parts[2];
                svgHeight = parts[3];
            }
        }

        if (!svgWidth || !svgHeight) {
            svgWidth = parseFloat(svgElement.getAttribute('width')) || 800;
            svgHeight = parseFloat(svgElement.getAttribute('height')) || 600;
        }

        if (svgWidth === 0 || svgHeight === 0) {
            svgWidth = 800;
            svgHeight = 600;
        }

        const scaleX = (containerWidth - 40) / svgWidth;
        const scaleY = (containerHeight - 40) / svgHeight;
        const fitScale = Math.min(scaleX, scaleY, 1);

        setScale(fitScale);
        setPosition({ x: 0, y: 0 });
        setIsInitialized(true);
    }, []);

    const getTouchDistance = (touches) => {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches) => {
        if (touches.length < 2) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
            y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top
        };
    };

    const zoomAtPoint = (newScale, pointX, pointY) => {
        const oldScale = scale;
        const scaleRatio = newScale / oldScale;
        
        const newPositionX = pointX - (pointX - position.x) * scaleRatio;
        const newPositionY = pointY - (pointY - position.y) * scaleRatio;
        
        setScale(newScale);
        setPosition({ x: newPositionX, y: newPositionY });
    };

    const handleTouchStart = (event) => {
        const rect = containerRef.current.getBoundingClientRect();
        
        if (event.touches.length === 1) {
            setIsDragging(true);
            setTouchStart({
                x: event.touches[0].clientX - position.x,
                y: event.touches[0].clientY - position.y
            });
        } else if (event.touches.length === 2) {
            event.preventDefault();
            setIsPinching(true);
            const distance = getTouchDistance(event.touches);
            const center = getTouchCenter(event.touches);
            setPinchStart({
                distance: distance,
                scale: scale,
                x: center.x,
                y: center.y
            });
            setIsDragging(false);
        }
    };

    const handleTouchMove = (event) => {
        event.preventDefault();

        if (isDragging && event.touches.length === 1) {
            const newX = event.touches[0].clientX - touchStart.x;
            const newY = event.touches[0].clientY - touchStart.y;
            setPosition({ x: newX, y: newY });
        } else if (isPinching && event.touches.length === 2) {
            const currentDistance = getTouchDistance(event.touches);
            const scaleRatio = currentDistance / pinchStart.distance;
            const newScale = Math.min(Math.max(pinchStart.scale * scaleRatio, 0.05), 5);
            
            zoomAtPoint(newScale, pinchStart.x, pinchStart.y);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setIsPinching(false);
    };

    const handleWheel = (event) => {
        if (event.shiftKey) {
            event.preventDefault();
            
            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            const delta = event.deltaY > 0 ? -0.1 : 0.1;
            const newScale = Math.min(Math.max(scale + delta, 0.05), 5);
            
            zoomAtPoint(newScale, mouseX, mouseY);
        }
    };

    const handleMouseDown = (event) => {
        if (event.shiftKey) {
            setIsDragging(true);
            setDragStart({
                x: event.clientX - position.x,
                y: event.clientY - position.y
            });
            containerRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging && !event.touches) {
            const newX = event.clientX - dragStart.x;
            const newY = event.clientY - dragStart.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (containerRef.current) {
            containerRef.current.style.cursor = 'default';
        }
    };

    const handleDoubleClick = () => {
        fitToContainer();
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    useEffect(() => {
        if (containerRef.current) {
            const observer = new MutationObserver(() => {
                const svg = containerRef.current?.querySelector('svg');
                if (svg) {
                    setTimeout(fitToContainer, 100);
                    observer.disconnect();
                }
            });

            observer.observe(containerRef.current, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                const svg = containerRef.current?.querySelector('svg');
                if (svg) {
                    fitToContainer();
                    observer.disconnect();
                }
            }, 300);

            const handleResize = () => {
                setTimeout(fitToContainer, 200);
            };

            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', handleResize);

            return () => {
                observer.disconnect();
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('orientationchange', handleResize);
            };
        }
    }, [image, fitToContainer]);

    function handleClick(event) {
        const path = event.target.dataset.path;
        if (path) {
            router.push(path + getQuery(searchParams));
        }
    }

    function handleChange(parentId) {
        setParentId(parentId);
    }

    async function handleClickHelp() {
        setShowHelp(!showHelp);
    }

    const query = "?person_id=" + personId + (parentId ? "&parent_id=" + parentId : "");

    const handleZoomIn = () => {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const newScale = Math.min(scale + 0.2, 5);
        zoomAtPoint(newScale, centerX, centerY);
    };

    const handleZoomOut = () => {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const newScale = Math.max(scale - 0.2, 0.05);
        zoomAtPoint(newScale, centerX, centerY);
    };

    const handleReset = () => {
        fitToContainer();
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                const element = containerRef.current;
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                    setIsFullscreen(true);
                } else if (element.webkitRequestFullscreen) {
                    await element.webkitRequestFullscreen();
                    setIsFullscreen(true);
                } else if (element.msRequestFullscreen) {
                    await element.msRequestFullscreen();
                    setIsFullscreen(true);
                }
            } catch (error) {
            }
        } else {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                    setIsFullscreen(false);
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                    setIsFullscreen(false);
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                    setIsFullscreen(false);
                }
            } catch (error) {
                console.log('Error exiting fullscreen:', error);
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (isInitialized) {
            setTimeout(fitToContainer, 200);
        }
    }, [isFullscreen, fitToContainer]);

    return (
        <div>
            <div>
                <h2>
                    <span>{locale.title}</span>
                    <span> </span>
                    <span>{toggle.personTarget.surname ? toggle.personTarget.surname : locale.person.surname.unknown}</span>
                    <span> </span>
                    <span>{toggle.personTarget.name ? toggle.personTarget.name : locale.person.name.unknown}</span>
                    <span> </span>
                    <span>{toggle.personTarget.patronymic ? toggle.personTarget.patronymic : locale.person.patronymic.unknown}</span>
                </h2>
                <Toggle personId={personId} toggle={toggle} locale={locale} onChange={handleChange} />
                <div className="nav-list">
                    <button title={locale.button.help.tooltip} onClick={handleClickHelp}>
                        <Image src="/img/tree/help.svg" alt={locale.button.help.alt} width="56" height="56" />
                    </button>
                    <Link href={"/tree/window" + query} target="_blank" title={locale.link.window.tooltip}>
                        <Image src={theme.iconShowTree} alt="open window" width="56" height="56" />
                    </Link>
                    <a href={"/download/tree" + query} title={locale.link.download.tooltip}>
                        <Image src={theme.iconDownloadTree} alt="download tree" width="56" height="56" />
                    </a>
                    <Link href={"/person/" + personId + query} title={locale.link.person.tooltip}>
                        <Image src="/img/person/card.svg" alt="open person card" width="56" height="56" />
                    </Link>
                </div>
                {showHelp && <Help></Help>}
            </div>
            
            <div 
                id="tree-object-container" 
                className="tree-object-container" 
                ref={containerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    ref={svgContainerRef}
                    className="svg-wrapper"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging || isPinching ? 'none' : 'transform 0.15s ease',
                        opacity: isInitialized ? 1 : 0,
                    }}
                >
                    <div 
                        dangerouslySetInnerHTML={htmlImage} 
                        onClick={handleClick}
                        className="svg-inner"
                    />
                </div>

                {!isInitialized && (
                    <div className="loading-indicator">
                        { localeLoading.loading }
                    </div>
                )}

                <div className="controls">
                    <button onClick={handleZoomIn} className="control-btn control-btn-zoom-in">
                        +
                    </button>
                    <button onClick={handleZoomOut} className="control-btn control-btn-zoom-out">
                        −
                    </button>
                    <button onClick={handleReset} className="control-btn control-btn-reset">
                        ⟲
                    </button>
                    <button 
                        onClick={toggleFullscreen} 
                        className={`control-btn control-btn-fullscreen ${isFullscreen ? 'fullscreen-active' : ''}`}
                        title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Развернуть на весь экран'}
                    >
                        ⤢
                    </button>
                </div>

                <div className="scale-indicator">
                    {Math.round(scale * 100)}%
                </div>
            </div>
        </div>
    );
}