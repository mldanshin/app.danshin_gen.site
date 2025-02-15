"use client";

import '@/styles/globals.css';
import '@/styles/channels.css';
import { getChannelsClient, requestEmailVerificationClient, verifyEmailByLinkClient, getTelegramLinkClient, deleteEmailClient, deleteTelegramClient } from '@/services/channels';
import Loading from '@/components/Loading';
import locale from '@/locales/ru/dates/channel.json';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ChannelManager({ channelsData, onChannelsConfigured }) {
    const [channels, setChannels] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailInput, setEmailInput] = useState('');
    const [isEmailVerifying, setIsEmailVerifying] = useState(false);
    const [showVerificationSent, setShowVerificationSent] = useState(false);
    const [telegramLink, setTelegramLink] = useState(null);
    const [isTelegramConnecting, setIsTelegramConnecting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ type: '', text: '' });
    const [isPolling, setIsPolling] = useState(false);

    const emailPollingIntervalRef = useRef(null);
    const telegramPollingIntervalRef = useRef(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const tokenFromUrl = searchParams.get('email_verify_token');
    const hasChannel = channels && (channels.email !== null || channels.telegram !== null);
    const hasEmail = channels?.email !== null && channels?.email !== undefined;
    const hasTelegram = channels?.telegram !== null && channels?.telegram !== undefined;

    useEffect(() => {
        if (tokenFromUrl) {
            handleVerifyEmailFromLink(tokenFromUrl);
        }
    }, [tokenFromUrl]);

    useEffect(() => {
        loadChannels();
    }, []);

    useEffect(() => {
        setChannels(channelsData);
    }, [channelsData]);

    useEffect(() => {
        setChannels(channelsData);
        if (channelsData?.email) {
            if (emailPollingIntervalRef.current) {
                clearInterval(emailPollingIntervalRef.current);
                emailPollingIntervalRef.current = null;
            }
            setShowVerificationSent(false);
            setIsPolling(false);
        }
        if (channelsData?.telegram) {
            if (telegramPollingIntervalRef.current) {
                clearInterval(telegramPollingIntervalRef.current);
                telegramPollingIntervalRef.current = null;
            }
            setTelegramLink(null);
            setIsPolling(false);
        }
    }, [channelsData]);

    const showModalMessage = (type, text) => {
        setModalMessage({ type, text });
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 10000);
    };

    const loadChannels = async () => {
        setLoading(true);
        try {
            setChannels(channelsData);
        } catch (err) {
            showModalMessage('error', locale.email?.load_error);
        } finally {
            setLoading(false);
        }
    };

    const refreshChannels = async () => {
        try {
            const data = await getChannelsClient();
            if (data) {
                setChannels(data);
                if (data.email !== null || data.telegram !== null) {
                    if (onChannelsConfigured) {
                        onChannelsConfigured();
                    }
                }
                return data;
            } else {
                setChannels(null);
                return null;
            }
        } catch (err) {
            return null;
        }
    };

    const handleRequestEmailVerification = async () => {
        if (!emailInput) {
            showModalMessage('error', locale.email?.enter_email);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            showModalMessage('error', locale.email?.invalid_email);
            return;
        }

        setIsEmailVerifying(true);

        try {
            const response = await requestEmailVerificationClient(emailInput);
            if (response && response.type == 'success') {
                const msg = locale.email?.verification_sent?.replace('{email}', emailInput);
                showModalMessage('success', msg);
                setShowVerificationSent(true);
                startEmailPolling();
            } else {
                showModalMessage('error', response?.message || locale.email?.send_error);
            }
        } catch (err) {
            showModalMessage('error', locale.email?.send_error);
        } finally {
            setIsEmailVerifying(false);
        }
    };

    const handleVerifyEmailFromLink = async (email_verify_token) => {
        setIsEmailVerifying(true);

        try {
            const response = await verifyEmailByLinkClient(email_verify_token);
            
            if (response && response.type == 'success') {
                showModalMessage('success', locale.email?.verified);
                const updatedData = await refreshChannels();
                setShowVerificationSent(false);
                setEmailInput('');
                if (onChannelsConfigured && updatedData) {
                    onChannelsConfigured(updatedData);
                }
                router.replace('/dates/notice', undefined, { shallow: true }); 
            } else {
                showModalMessage('error', response?.message || locale.email?.verify_error);
            }
        } catch (err) {
            showModalMessage('error', locale.email?.verify_error);
        } finally {
            setIsEmailVerifying(false);
        }
    };

    const handleGetTelegramLink = async () => {
        setIsTelegramConnecting(true);

        try {
            const link = await getTelegramLinkClient();
            if (link) {
                setTelegramLink(link);
                showModalMessage('success', locale.telegram?.link_created);
                startTelegramPolling();
            } else {
                showModalMessage('error', locale.telegram?.link_error);
            }
        } catch (err) {
            showModalMessage('error', locale.telegram?.link_error);
        } finally {
            setIsTelegramConnecting(false);
        }
    };

    const handleDeleteEmail = async () => {
        if (!channels?.email) return;

        if (!confirm(locale.email?.delete?.confirm)) return;

        try {
            const response = await deleteEmailClient(channels.email.email);
            if (!response) {
                showModalMessage('error', locale.email?.delete?.error);
                return;
            }

            if (response.type == 'success') {
                const data = await refreshChannels();

                if (onChannelsConfigured) {
                    onChannelsConfigured(data);
                }
            }
            showModalMessage(response.type, response.message || locale.email?.delete?.ok);
        } catch (err) {
            showModalMessage('error', locale.email?.delete?.error);
        }
    };

    const handleDeleteTelegram = async () => {
        if (!channels?.telegram) return;

        if (!confirm(locale.telegram?.delete?.confirm)) return;

        try {
            const response = await deleteTelegramClient(channels.telegram.chatId);
            if (!response) {
                showModalMessage('error', locale.telegram?.delete?.error);
                return;
            }

            if (response.type == 'success') {
                const data = await refreshChannels();

                if (onChannelsConfigured) {
                    onChannelsConfigured(data);
                }
            }

            showModalMessage(response.type, response.message || locale.telegram?.delete?.ok);
        } catch (err) {
            showModalMessage('error', locale.telegram?.delete?.error);
        }
    };

    const checkEmailStatus = async () => {
        try {
            const data = await getChannelsClient();
            if (data && data.email !== null) {
                setChannels(data);
                setShowVerificationSent(false);
                setEmailInput('');
                setIsPolling(false);
                
                if (onChannelsConfigured) {
                    onChannelsConfigured(data);
                }

                if (emailPollingIntervalRef.current) {
                    clearInterval(emailPollingIntervalRef.current);
                    emailPollingIntervalRef.current = null;
                }
                
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const startEmailPolling = () => {
        setIsPolling(true);
        let attempts = 0;
        const maxAttempts = 60;
        const interval = 5000;

        if (emailPollingIntervalRef.current) {
            clearInterval(emailPollingIntervalRef.current);
        }

        emailPollingIntervalRef.current = setInterval(async () => {
            attempts++;
            const isVerified = await checkEmailStatus();
            
            if (isVerified) {
                clearInterval(emailPollingIntervalRef.current);
                emailPollingIntervalRef.current = null;
                setIsPolling(false);
            } else if (attempts >= maxAttempts) {
                clearInterval(emailPollingIntervalRef.current);
                emailPollingIntervalRef.current = null;
                setIsPolling(false);
            }
        }, interval);
    };

    const checkTelegramStatus = async () => {
        try {
            const data = await getChannelsClient();
            if (data && data.telegram !== null) {
                setChannels(data);
                setTelegramLink(null);
                setIsPolling(false);
                
                if (onChannelsConfigured) {
                    onChannelsConfigured(data);
                }
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const startTelegramPolling = () => {
        setIsPolling(true);
        let attempts = 0;
        const maxAttempts = 30;
        const interval = 3000;

        const pollInterval = setInterval(async () => {
            attempts++;
            const isConnected = await checkTelegramStatus();
            
            if (isConnected) {
                clearInterval(pollInterval);
                setIsPolling(false);
            } else if (attempts >= maxAttempts) {
                clearInterval(pollInterval);
                setIsPolling(false);
            }
        }, interval);

        return pollInterval;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="channel-manager">
            <div className="channel-manager-header">
                <h2>{locale.channel?.title}</h2>
            </div>

            {!hasChannel && (
                <p className="channel-description">
                    {locale.channel?.info}
                </p>
            )}
            <div className="channel-sections">
                <div className="channel-section">
                    <h3>📧 {locale.email.title}</h3>
                    {hasEmail ? (
                        <div className="channel-info">
                            <div className="channel-detail">
                                <span className="channel-label">{locale.email.label}:</span>
                                <span>{channels.email.email}</span>
                            </div>
                            <button 
                                className="channel-delete-btn"
                                onClick={handleDeleteEmail}
                            >
                                {locale.email?.delete?.button}
                            </button>
                        </div>
                    ) : (
                        <div className="channel-setup">
                            {!showVerificationSent ? (
                                <>
                                    <p className="channel-hint">{locale.email?.not_connected}</p>
                                    <div className="channel-input-group">
                                        <input
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder={locale.email?.placeholder}
                                            className="channel-input"
                                            disabled={isEmailVerifying}
                                        />
                                        <button
                                            onClick={handleRequestEmailVerification}
                                            className="channel-add-btn"
                                            disabled={isEmailVerifying || !emailInput}
                                        >
                                            {isEmailVerifying 
                                                ? (locale.email?.sending) 
                                                : (locale.email?.verify_button)}
                                        </button>
                                    </div>
                                    <small>{locale.email?.hint}</small>
                                </>
                            ) : (
                                <div className="channel-verification-sent">
                                    <p className="channel-hint-success">
                                        ✅ {locale.email?.verification_sent?.replace('{email}', emailInput)}
                                    </p>
                                    <p className="channel-hint-info">
                                        {locale.email?.verification_hint}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="channel-section">
                    <h3>📱 {locale.telegram.title}</h3>
                    {hasTelegram ? (
                        <div className="channel-info">
                            <div className="channel-detail">
                                <span className="channel-label">{locale.telegram?.connected}</span>
                                <span>
                                    {channels.telegram.username 
                                        ? `@${channels.telegram.username}` 
                                        : `ID: ${channels.telegram.chatId}`}
                                </span>
                            </div>
                            <button 
                                className="channel-delete-btn"
                                onClick={handleDeleteTelegram}
                            >
                                {locale.telegram?.delete?.button}
                            </button>
                        </div>
                    ) : (
                        <div className="channel-setup">
                            {!telegramLink ? (
                                <>
                                    <p className="channel-hint">{locale.telegram?.not_connected}</p>
                                    <button
                                        onClick={handleGetTelegramLink}
                                        className="channel-add-btn"
                                        disabled={isTelegramConnecting}
                                    >
                                        {isTelegramConnecting 
                                            ? (locale.telegram?.creating) 
                                            : (locale.telegram?.connect)}
                                    </button>
                                </>
                            ) : (
                                <div className="telegram-link-container">
                                    <p className="channel-hint">{locale.telegram?.follow_link}</p>
                                    <div className="telegram-link">
                                        <div className="telegram-link-content">
                                            <a 
                                                href={telegramLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="telegram-link-url"
                                            >
                                                {telegramLink}
                                            </a>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await navigator.clipboard.writeText(telegramLink);
                                                        showModalMessage('success', locale.telegram?.copy_success);
                                                    } catch (err) {
                                                        showModalMessage('error', locale.telegram?.copy_error || 'Не удалось скопировать ссылку');
                                                    }
                                                }}
                                                className="channel-copy-btn"
                                                title={locale.telegram?.copy_title}
                                            >
                                                📋
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className={`modal-content ${modalMessage.type}`}>
                        <div className="modal-icon">
                            {modalMessage.type === 'success' ? '✅' : '❌'}
                        </div>
                        <p>{modalMessage.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}