import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const DateTimeSelector = ({ 
  selectedDateTime, 
  onDateTimeChange, 
  duration,
  onDurationChange,
  className = '' 
}) => {
  const [selectedDate, setSelectedDate] = useState(
    selectedDateTime?.date || new Date()?.toISOString()?.split('T')?.[0]
  );
  const [selectedTime, setSelectedTime] = useState(
    selectedDateTime?.time || '09:00'
  );
  const [selectedDuration, setSelectedDuration] = useState(duration || 2);

  // Generate time slots (15-minute intervals for more precision)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots?.push({
          value: timeString,
          label: displayTime
        });
      }
    }
    return slots;
  };

  // Duration options with minutes
  const durationOptions = [
    { value: 0.25, label: '15 Minutes' },
    { value: 0.5, label: '30 Minutes' },
    { value: 0.75, label: '45 Minutes' },
    { value: 1, label: '1 Hour' },
    { value: 1.25, label: '1 Hour 15 Minutes' },
    { value: 1.5, label: '1 Hour 30 Minutes' },
    { value: 1.75, label: '1 Hour 45 Minutes' },
    { value: 2, label: '2 Hours' },
    { value: 2.5, label: '2 Hours 30 Minutes' },
    { value: 3, label: '3 Hours' },
    { value: 4, label: '4 Hours' },
    { value: 6, label: '6 Hours' },
    { value: 8, label: '8 Hours' },
    { value: 12, label: '12 Hours' },
    { value: 24, label: '24 Hours (Full Day)' }
  ];

  const timeSlots = generateTimeSlots();

  // Calculate end time
  const calculateEndTime = (startDate, startTime, durationHours) => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(startDateTime.getTime() + (durationHours * 60 * 60 * 1000));
    return endDateTime;
  };

  const endDateTime = calculateEndTime(selectedDate, selectedTime, selectedDuration);

  // Update parent component when values change
  useEffect(() => {
    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    onDateTimeChange({
      date: selectedDate,
      time: selectedTime,
      startDateTime,
      endDateTime,
      duration: selectedDuration
    });
    onDurationChange(selectedDuration);
  }, [selectedDate, selectedTime, selectedDuration, onDateTimeChange, onDurationChange]);

  // Quick time selection
  const quickTimeOptions = [
    { label: 'Now', time: new Date()?.toTimeString()?.slice(0, 5) },
    { label: '9:00 AM', time: '09:00' },
    { label: '12:00 PM', time: '12:00' },
    { label: '3:00 PM', time: '15:00' },
    { label: '6:00 PM', time: '18:00' }
  ];

  const handleQuickTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Get minimum date (today)
  const today = new Date()?.toISOString()?.split('T')?.[0];
  const maxDate = new Date();
  maxDate?.setDate(maxDate?.getDate() + 30); // 30 days from now
  const maxDateString = maxDate?.toISOString()?.split('T')?.[0];

  // Check if selected time is in the past for today
  const isTimeInPast = () => {
    if (selectedDate === today) {
      const now = new Date();
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      return selectedDateTime < now;
    }
    return false;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon name="Calendar" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Date & Time</h3>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <Input
            type="date"
            label="Parking Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e?.target?.value)}
            min={today}
            max={maxDateString}
            required
          />

          {/* Quick Time Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quick Time Selection</label>
            <div className="flex flex-wrap gap-2">
              {quickTimeOptions?.map((option) => (
                <Button
                  key={option?.label}
                  variant={selectedTime === option?.time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleQuickTimeSelect(option?.time)}
                  disabled={selectedDate === today && option?.time < new Date()?.toTimeString()?.slice(0, 5)}
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <Select
            label="Start Time"
            options={timeSlots}
            value={selectedTime}
            onChange={setSelectedTime}
            placeholder="Select start time"
            searchable
            error={isTimeInPast() ? 'Selected time is in the past' : ''}
          />

          {/* Duration Selection */}
          <Select
            label="Parking Duration"
            options={durationOptions}
            value={selectedDuration}
            onChange={setSelectedDuration}
            placeholder="Select duration"
          />
        </div>

        {/* Booking Summary */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-foreground">Booking Summary</h4>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1">Start</div>
              <div className="font-medium text-foreground">
                {new Date(`${selectedDate}T${selectedTime}`)?.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-muted-foreground">
                {new Date(`${selectedDate}T${selectedTime}`)?.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
            
            <div>
              <div className="text-muted-foreground mb-1">End</div>
              <div className="font-medium text-foreground">
                {endDateTime?.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="text-muted-foreground">
                {endDateTime?.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Duration</span>
              <span className="font-medium text-foreground">
                {selectedDuration < 1 
                  ? `${Math.round(selectedDuration * 60)} Minutes`
                  : selectedDuration === 1 
                    ? '1 Hour'
                    : selectedDuration % 1 === 0
                      ? `${selectedDuration} Hours`
                      : `${Math.floor(selectedDuration)} Hours ${Math.round((selectedDuration % 1) * 60)} Minutes`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Time Validation Warning */}
        {isTimeInPast() && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-warning">Invalid Time Selection</div>
                <div className="text-warning/80">
                  Please select a future time for today's bookings.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimeSelector;