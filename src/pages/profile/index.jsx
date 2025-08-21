import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardHolder: 'John Doe',
      expiry: '12/25',
      type: 'Visa'
    },
    {
      id: 2,
      cardNumber: '**** **** **** 5678',
      cardHolder: 'John Doe',
      expiry: '06/26',
      type: 'Mastercard'
    }
  ]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    type: 'Visa'
  });

  useEffect(() => {
    // Get user data from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userVehicle = localStorage.getItem('userVehicle');
    
    if (userEmail) {
      setUser({
        email: userEmail,
        name: userName || 'User',
        vehicle: userVehicle || 'Not specified'
      });
    } else {
      // Redirect to login if no user data
      navigate('/user-authentication');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userVehicle');
    localStorage.removeItem('tempPassword');
    
    // Redirect to login page
    navigate('/user-authentication');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-app">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Back to Home"
              >
                <Icon name="ArrowLeft" size={20} className="text-foreground" />
              </button>
              <h1 className="text-lg font-semibold text-foreground">Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-app py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={40} className="text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground">Vehicle: {user.vehicle}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setEditForm({
                    name: user.name,
                    email: user.email,
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="hidden sm:flex"
              >
                <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="border-b border-border">
              <div className="flex">
                <button
                  onClick={() => handleTabChange('profile')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => handleTabChange('bookings')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'bookings'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Booking History
                </button>
                                 <button
                   onClick={() => handleTabChange('cards')}
                   className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                     activeTab === 'cards'
                       ? 'text-primary border-b-2 border-primary'
                       : 'text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   Saved Cards
                 </button>
                 <button
                   onClick={() => handleTabChange('settings')}
                   className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                     activeTab === 'settings'
                       ? 'text-primary border-b-2 border-primary'
                       : 'text-muted-foreground hover:text-foreground'
                   }`}
                 >
                   Settings
                 </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                             {activeTab === 'profile' && (
                 <div className="space-y-6">
                   {isEditing ? (
                     <div className="space-y-4">
                       <div className="grid md:grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                           <input
                             type="text"
                             value={editForm.name}
                             onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                             className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                           <input
                             type="email"
                             value={editForm.email}
                             onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                             className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                           <input
                             type="password"
                             value={editForm.password}
                             onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                             placeholder="Leave blank to keep current"
                             className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                           <input
                             type="password"
                             value={editForm.confirmPassword}
                             onChange={(e) => setEditForm({...editForm, confirmPassword: e.target.value})}
                             placeholder="Confirm new password"
                             className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                         </div>
                       </div>
                       <div className="flex gap-3 pt-4">
                         <Button
                           onClick={() => {
                             // Save changes logic here
                             localStorage.setItem('userName', editForm.name);
                             localStorage.setItem('userEmail', editForm.email);
                             setUser({...user, name: editForm.name, email: editForm.email});
                             setIsEditing(false);
                           }}
                           className="flex-1"
                         >
                           Save Changes
                         </Button>
                         <Button
                           variant="outline"
                           onClick={() => setIsEditing(false)}
                           className="flex-1"
                         >
                           Cancel
                         </Button>
                       </div>
                     </div>
                   ) : (
                     <div className="grid md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                         <div className="p-3 bg-muted rounded-lg border border-border">
                           {user.name}
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                         <div className="p-3 bg-muted rounded-lg border border-border">
                           {user.email}
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-foreground mb-2">Vehicle Type</label>
                         <div className="p-3 bg-muted rounded-lg border border-border">
                           {user.vehicle}
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-foreground mb-2">Member Since</label>
                         <div className="p-3 bg-muted rounded-lg border border-border">
                           {new Date().toLocaleDateString()}
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               )}

              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Bookings Yet</h3>
                    <p className="text-muted-foreground mb-4">Start your parking journey by booking your first spot!</p>
                    <Button
                      onClick={() => navigate('/location-search-map')}
                      variant="primary"
                    >
                      Find Parking
                    </Button>
                  </div>
                </div>
              )}

                             {activeTab === 'cards' && (
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-medium text-foreground">Saved Payment Cards</h3>
                     <Button
                       onClick={() => setShowAddCard(true)}
                       size="sm"
                     >
                       <Icon name="Plus" size={16} className="mr-2" />
                       Add Card
                     </Button>
                   </div>
                   
                   <div className="space-y-4">
                     {savedCards.map((card) => (
                       <div key={card.id} className="p-4 bg-muted rounded-lg border border-border">
                         <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                               <Icon name="CreditCard" size={20} className="text-primary" />
                             </div>
                             <div>
                               <h4 className="font-medium text-foreground">{card.type}</h4>
                               <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
                             </div>
                           </div>
                           <div className="flex gap-2">
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => {
                                 setEditingCard(card);
                                 setNewCard({
                                   cardNumber: card.cardNumber,
                                   cardHolder: card.cardHolder,
                                   expiry: card.expiry,
                                   cvv: '',
                                   type: card.type
                                 });
                               }}
                             >
                               <Icon name="Edit" size={14} className="mr-1" />
                               Edit
                             </Button>
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => {
                                 setSavedCards(savedCards.filter(c => c.id !== card.id));
                               }}
                               className="text-destructive hover:text-destructive"
                             >
                               <Icon name="Trash" size={14} className="mr-1" />
                               Delete
                             </Button>
                           </div>
                         </div>
                         <div className="flex items-center justify-between text-sm text-muted-foreground">
                           <span>Card Holder: {card.cardHolder}</span>
                           <span>Expires: {card.expiry}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Account Settings</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates about your bookings</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Location Services</h4>
                        <p className="text-sm text-muted-foreground">Allow location access for nearby parking</p>
                      </div>
                      <div className="w-12 h-6 bg-muted-foreground rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        fullWidth
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
                 </div>
       </main>

       {/* Add/Edit Card Modal */}
       {(showAddCard || editingCard) && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-semibold text-foreground">
                 {editingCard ? 'Edit Card' : 'Add New Card'}
               </h3>
               <button
                 onClick={() => {
                   setShowAddCard(false);
                   setEditingCard(null);
                   setNewCard({
                     cardNumber: '',
                     cardHolder: '',
                     expiry: '',
                     cvv: '',
                     type: 'Visa'
                   });
                 }}
                 className="p-2 hover:bg-muted rounded-lg transition-colors"
               >
                 <Icon name="X" size={20} className="text-muted-foreground" />
               </button>
             </div>
             
             <div className="space-y-4 mb-6">
               <div>
                 <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                 <input
                   type="text"
                   value={newCard.cardNumber}
                   onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                   placeholder="1234 5678 9012 3456"
                   className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-foreground mb-2">Card Holder Name</label>
                 <input
                   type="text"
                   value={newCard.cardHolder}
                   onChange={(e) => setNewCard({...newCard, cardHolder: e.target.value})}
                   placeholder="John Doe"
                   className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                   <input
                     type="text"
                     value={newCard.expiry}
                     onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                     placeholder="MM/YY"
                     className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                   <input
                     type="text"
                     value={newCard.cvv}
                     onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                     placeholder="123"
                     className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-foreground mb-2">Card Type</label>
                 <select
                   value={newCard.type}
                   onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                   className="w-full p-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                 >
                   <option value="Visa">Visa</option>
                   <option value="Mastercard">Mastercard</option>
                   <option value="American Express">American Express</option>
                   <option value="Discover">Discover</option>
                 </select>
               </div>
             </div>

             <div className="flex gap-3">
               <Button
                 variant="outline"
                 onClick={() => {
                   setShowAddCard(false);
                   setEditingCard(null);
                 }}
                 className="flex-1"
               >
                 Cancel
               </Button>
               <Button
                 onClick={() => {
                   if (editingCard) {
                     // Update existing card
                     setSavedCards(savedCards.map(card => 
                       card.id === editingCard.id 
                         ? { ...card, ...newCard, cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}` }
                         : card
                     ));
                     setEditingCard(null);
                   } else {
                     // Add new card
                     const newCardData = {
                       id: Date.now(),
                       ...newCard,
                       cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`
                     };
                     setSavedCards([...savedCards, newCardData]);
                     setShowAddCard(false);
                   }
                   setNewCard({
                     cardNumber: '',
                     cardHolder: '',
                     expiry: '',
                     cvv: '',
                     type: 'Visa'
                   });
                 }}
                 className="flex-1"
               >
                 {editingCard ? 'Update Card' : 'Add Card'}
               </Button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default Profile;
