import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalSearchHeader from '../../components/ui/GlobalSearchHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BookingFloatingActions from '../../components/ui/BookingFloatingActions';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import FacilityHero from './components/FacilityHero';
import FacilityTabs from './components/FacilityTabs';
import OverviewTab from './components/OverviewTab';
import FloorsTab from './components/FloorsTab';
import AmenitiesTab from './components/AmenitiesTab';
import ReviewsTab from './components/ReviewsTab';

const FacilityDetailsFloorSelection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock facility data
  const facility = {
    id: 1,
    name: "Downtown Premium Parking",
    address: "123 Business District, Downtown, NY 10001",
    rating: 4.6,
    reviewCount: 248,
    distance: "0.3 miles away",
    isOpen: true,
    totalSlots: 450,
    availableSlots: 127,
    hourlyRate: 8,
    dailyRate: 45,
    monthlyRate: 280,
    weekdayHours: "6:00 AM - 11:00 PM",
    weekendHours: "7:00 AM - 10:00 PM",
    phone: "+1 (555) 123-4567",
    email: "info@downtownparking.com",
    website: "www.downtownparking.com",
    hasEVCharging: true,
    hasWifi: true,
    hasValet: true,
    isCovered: true,
    hasMotionSensors: true,
    hasAlarmSystem: true,
    isWheelchairAccessible: true,
    hasDisabledSpots: true,
    hasElevator: true,
    hasWideSpaces: true,
    hasAudioAssistance: false,
    hasVisualIndicators: true,
    hasCarWash: true,
    hasWaitingArea: true,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800"
    ],
    floors: [
      {
        id: 1,
        name: "Ground Floor",
        totalSlots: 120,
        availableSlots: 45,
        slots: generateMockSlots(120, 'ground'),
        rows: [
          { id: 'A', name: 'A', total: 20, available: 8 },
          { id: 'B', name: 'B', total: 20, available: 12 },
          { id: 'C', name: 'C', total: 20, available: 6 },
          { id: 'D', name: 'D', total: 20, available: 9 },
          { id: 'E', name: 'E', total: 20, available: 5 },
          { id: 'F', name: 'F', total: 20, available: 5 }
        ],
        hourlyProjection: [
          { time: '9AM', availability: 85 },
          { time: '11AM', availability: 65 },
          { time: '1PM', availability: 45 },
          { time: '3PM', availability: 55 },
          { time: '5PM', availability: 25 },
          { time: '7PM', availability: 70 }
        ]
      },
      {
        id: 2,
        name: "1st Floor",
        totalSlots: 110,
        availableSlots: 32,
        slots: generateMockSlots(110, '1st'),
        rows: [
          { id: 'A', name: 'A', total: 18, available: 5 },
          { id: 'B', name: 'B', total: 18, available: 8 },
          { id: 'C', name: 'C', total: 18, available: 4 },
          { id: 'D', name: 'D', total: 18, available: 6 },
          { id: 'E', name: 'E', total: 19, available: 5 },
          { id: 'F', name: 'F', total: 19, available: 4 }
        ],
        hourlyProjection: [
          { time: '9AM', availability: 75 },
          { time: '11AM', availability: 55 },
          { time: '1PM', availability: 35 },
          { time: '3PM', availability: 45 },
          { time: '5PM', availability: 15 },
          { time: '7PM', availability: 60 }
        ]
      },
      {
        id: 3,
        name: "2nd Floor",
        totalSlots: 110,
        availableSlots: 28,
        slots: generateMockSlots(110, '2nd'),
        rows: [
          { id: 'A', name: 'A', total: 18, available: 4 },
          { id: 'B', name: 'B', total: 18, available: 6 },
          { id: 'C', name: 'C', total: 18, available: 3 },
          { id: 'D', name: 'D', total: 18, available: 5 },
          { id: 'E', name: 'E', total: 19, available: 5 },
          { id: 'F', name: 'F', total: 19, available: 5 }
        ],
        hourlyProjection: [
          { time: '9AM', availability: 70 },
          { time: '11AM', availability: 50 },
          { time: '1PM', availability: 30 },
          { time: '3PM', availability: 40 },
          { time: '5PM', availability: 10 },
          { time: '7PM', availability: 55 }
        ]
      },
      {
        id: 4,
        name: "3rd Floor",
        totalSlots: 110,
        availableSlots: 22,
        slots: generateMockSlots(110, '3rd'),
        rows: [
          { id: 'A', name: 'A', total: 18, available: 3 },
          { id: 'B', name: 'B', total: 18, available: 4 },
          { id: 'C', name: 'C', total: 18, available: 2 },
          { id: 'D', name: 'D', total: 18, available: 4 },
          { id: 'E', name: 'E', total: 19, available: 4 },
          { id: 'F', name: 'F', total: 19, available: 5 }
        ],
        hourlyProjection: [
          { time: '9AM', availability: 65 },
          { time: '11AM', availability: 45 },
          { time: '1PM', availability: 25 },
          { time: '3PM', availability: 35 },
          { time: '5PM', availability: 5 },
          { time: '7PM', availability: 50 }
        ]
      }
    ]
  };

  // Generate mock slots for each floor
  function generateMockSlots(count, floorPrefix) {
    const slots = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const slotsPerRow = Math.ceil(count / rows?.length);
    const statuses = ['available', 'reserved', 'maintenance'];
    const vehicleTypes = ['car', 'bike', 'both'];

    let slotId = 1;
    rows?.forEach((row, rowIndex) => {
      const rowSlotCount = rowIndex === rows?.length - 1 ? count - (slotsPerRow * rowIndex) : slotsPerRow;
      
      for (let i = 1; i <= rowSlotCount; i++) {
        const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
        const randomVehicleType = vehicleTypes?.[Math.floor(Math.random() * vehicleTypes?.length)];
        
        // Adjust probabilities for more realistic distribution
        let status;
        const rand = Math.random();
        if (rand < 0.4) status = 'available';
        else if (rand < 0.85) status = 'reserved';
        else status = 'maintenance';

        slots?.push({
          id: `${floorPrefix}-${row}${i}`,
          row: row,
          number: i,
          status: status,
          vehicleType: randomVehicleType,
          floor: floorPrefix
        });
        slotId++;
      }
    });

    return slots;
  }

  const handleBookNow = () => {
    navigate('/slot-selection-booking');
  };

  const handleFloorSelect = (floor) => {
    console.log('Selected floor:', floor);
  };

  const handleBookSlot = (slot) => {
    navigate('/slot-selection-booking', { 
      state: { 
        selectedSlot: slot,
        facility: facility 
      } 
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab facility={facility} />;
      case 'floors':
        return (
          <FloorsTab 
            facility={facility} 
            onFloorSelect={handleFloorSelect}
            onBookSlot={handleBookSlot}
          />
        );
      case 'amenities':
        return <AmenitiesTab facility={facility} />;
      case 'reviews':
        return <ReviewsTab facility={facility} />;
      default:
        return <OverviewTab facility={facility} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalSearchHeader />
      <BreadcrumbNavigation facility={facility} />
      
      <main className="pb-20 lg:pb-6 lg:ml-64">
        <FacilityHero facility={facility} onBookNow={handleBookNow} />
        
        <FacilityTabs 
          facility={facility}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {renderTabContent()}
        </FacilityTabs>
      </main>

      <BottomTabNavigation />
      <BookingFloatingActions />
    </div>
  );
};

export default FacilityDetailsFloorSelection;