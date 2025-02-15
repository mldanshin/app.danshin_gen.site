"use client";

import '@/styles/dates-notice.css';
import '@/styles/globals.css';
import ChannelManager from '@/components/dates/ChannelManager';
import locale from '@/locales/ru/dates/notice';
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { getChannelsClient } from '@/services/channels';

export default function NoticeForm({ initialChannels, initialDates, initialNotice }) {
  const [dates] = useState(initialDates);
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [timezone, setTimezone] = useState('');
  const [sendTime, setSendTime] = useState(initialNotice.sendTime);
  const [dayAfter, setDayAfter] = useState(initialNotice.dayAfter);
  const [dayBefore, setDayBefore] = useState(initialNotice.dayBefore);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', text: '' });
  const [showChannelManager, setShowChannelManager] = useState(false);
  const [hasChannel, setHasChannel] = useState(initialChannels !== null);
  const [channelsData, setChannelsData] = useState(initialChannels);
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('email_verify_token');

  useEffect(() => {
    if (tokenFromUrl) {
        setShowChannelManager(true);
    }
  }, [tokenFromUrl]);

  useEffect(() => {
    const selectedSet = new Set();
    initialNotice?.dates.forEach((item) => {
      const key = `${item.personId}-${item.dateType}`;
      selectedSet.add(key);
    });
    setSelectedDates(selectedSet);
  }, [initialNotice, dates]); 

  const formatDate = (day, month, year) => {
    const d = day.padStart(2, '0');
    const m = month.padStart(2, '0');
    const y = year;
    return `${d}.${m}.${y}`;
  };

  const getDateTypeLabel = (type) => {
    return type === 1 ? locale.birth : locale.death;
  };

  const getDateTypeValue = (type) => {
    return type === 1 ? "BIRTH" : "DEATH";
  };

  const toggleDateSelection = (personId, type) => {
    const dateType = getDateTypeValue(type);
    const key = `${personId}-${dateType}`;
    
    const newSelected = new Set(selectedDates);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedDates(newSelected);
  };

  const isDateSelected = (personId, type) => {
    const dateType = getDateTypeValue(type);
    const key = `${personId}-${dateType}`;
    return selectedDates.has(key);
  };

  useEffect(() => {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
    } catch (error) {
      setTimezone('Europe/Moscow');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      sendTime,
      timezone,
      dayAfter,
      dayBefore,
      dates: Array.from(selectedDates).map((key) => {
        const [personId, dateType] = key.split('-');
        return {
          personId: parseInt(personId),
          dateType: dateType
        };
      })
    };

    try {
      const response = await fetch('/api/dates/notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(locale.save.error);
      }

      const result = await response.json();
      showModalMessage(result.type, result.message);
    } catch (error) {
      showModalMessage('error', locale.save.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showModalMessage = (type, text) => {
    setModalMessage({ type, text });
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleChannelsConfigured = (updatedChannels) => {
    if (updatedChannels !== undefined) {
        setChannelsData(updatedChannels);
        const hasChannels = updatedChannels !== null && 
                          (updatedChannels.email !== null || updatedChannels.telegram !== null);
        setHasChannel(hasChannels);
    } else {
        fetchChannels();
    }
  };

  const fetchChannels = async () => {
    try {
        const res = await getChannelsClient();
        if (res.ok) {
            const data = await res.json();
            setChannelsData(data);
            setHasChannel(data !== null && (data.email !== null || data.telegram !== null));
        }
    } catch (error) {
        console.error('Error fetching channels:', error);
    }
  };

  if (!hasChannel) {
    return (
      <div className="page-container">
        <h2>{locale.channel.title}</h2>
        <div className="no-channel-message">
          <p>{locale.channel.info}</p>
          <button 
            className="channel-open-btn"
            onClick={() => setShowChannelManager(true)}
          >
            {locale.channel.button_2}
          </button>
        </div>
        {showChannelManager && (
          <div className="channel-modal-overlay" onClick={() => setShowChannelManager(false)}>
            <div className="channel-modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="channel-modal-close"
                onClick={() => setShowChannelManager(false)}
              >
                ✕
              </button>
              <ChannelManager 
                onChannelsConfigured={handleChannelsConfigured} 
                channelsData={channelsData}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="notice-header">
        <h2>{locale.title}</h2>
        <button 
          className="channel-manage-btn"
          onClick={() => {
            fetchChannels();
            setShowChannelManager(true);
          }}
        >
          {locale.channel.button}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="sendTime">{locale.send_time}:</label>
            <input
              type="time"
              id="sendTime"
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dayBefore">{locale.day_before}:</label>
            <input
              type="number"
              id="dayBefore"
              min="1"
              max="30"
              value={dayBefore}
              onChange={(e) => setDayBefore(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dayAfter">{locale.day_after}:</label>
            <input
              type="number"
              id="dayAfter"
              min="1"
              max="30"
              value={dayAfter}
              onChange={(e) => setDayAfter(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
              className="form-input"
              required
            />
          </div>

          <div className="dates-list">
            <h3>{locale.dates_list}:</h3>
            {dates.map((item, index) => (
              <div key={index} className="date-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isDateSelected(item.person.id, item.type)}
                    onChange={() => toggleDateSelection(item.person.id, item.type)}
                    className="checkbox-input"
                  />
                  <span className="date-info">
                    {item.person.surname}
                    {item.person.oldSurname && item.person.oldSurname.length > 0 && (
                      ` (${item.person.oldSurname.join(', ')})`
                    )}
                    {' '}
                    {item.person.name}
                    {' '}
                    {item.person.patronymic}
                    {' '}
                    {formatDate(item.date.day, item.date.month, item.date.year)}
                    {' '}
                    <strong>{getDateTypeLabel(item.type)}</strong>
                  </span>
                </label>
              </div>
            ))}
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

        <div className="fixed-button-container">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? locale.save.process : locale.save.button}
          </button>
        </div>
      </form>
      {showChannelManager && (
        <div className="channel-modal-overlay" onClick={() => setShowChannelManager(false)}>
          <div className="channel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="channel-modal-close"
              onClick={() => setShowChannelManager(false)}
            >
              ✕
            </button>
            <ChannelManager 
              onChannelsConfigured={handleChannelsConfigured}
              channelsData={channelsData}
            />
          </div>
        </div>
      )}
    </div>
  );
}