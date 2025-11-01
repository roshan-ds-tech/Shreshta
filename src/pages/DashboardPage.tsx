import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Lock,
  LogOut,
  Camera,
  Trash2,
  Edit,
  Save,
  Plus,
  MoreVertical,
  Home,
  Building,
  ShoppingCart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';

// Types
interface UserType {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface Order {
  id: string;
  name: string;
  image: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  price: string;
  quantity: number;
}

interface Address {
  id: string;
  type: 'Home' | 'Office';
  name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Dummy Data
const dummyUser: UserType = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  profileImage: '/default-avatar.png',
};

const dummyOrders: Order[] = [
  {
    id: 'ORD_001',
    name: 'Premium Jaggery Powder',
    image: '/jaggery-powder.jpg',
    date: '28 Oct 2025',
    status: 'Delivered',
    price: '₹499',
    quantity: 2,
  },
  {
    id: 'ORD_002',
    name: 'Premium Liquid Jaggery',
    image: '/liquid-jaggery.jpg',
    date: '30 Oct 2025',
    status: 'Processing',
    price: '₹799',
    quantity: 1,
  },
];

const dummyAddresses: Address[] = [
  {
    id: 'ADDR_001',
    type: 'Home',
    name: 'John Doe',
    phone: '+91 98765 43210',
    line1: '123, Palm Grove Apartments, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    isDefault: true,
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [user, setUser] = useState<UserType>(dummyUser);
  const [profileImage, setProfileImage] = useState<string>(dummyUser.profileImage);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orders] = useState<Order[]>(dummyOrders);
  const [addresses, setAddresses] = useState<Address[]>(dummyAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [currentAddress, setCurrentAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    type: 'Home',
    name: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Handlers
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveProfilePic = () => {
    setProfileImage('/default-avatar.png');
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // TODO: Add API call to update profile
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId 
          ? { ...currentAddress, id: editingAddressId, isDefault: addr.isDefault }
          : addr
      ));
    } else {
      const newAddress: Address = {
        ...currentAddress,
        id: `ADDR_${Date.now()}`,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleAddressEdit = (address: Address) => {
    setCurrentAddress(address);
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleAddressDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleLogout = () => {
    // TODO: Add logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Card className="md:w-64 bg-[#FFF8E7]/60 border-2 border-[#C5A572]/20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-[#D4AF37]">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback className="bg-[#F5E6D3] text-[#2C1810]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Change Picture
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={handleRemoveProfilePic}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Picture
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-[#2C1810]">{user.name}</h3>
                    <p className="text-sm text-[#5C4033]">{user.email}</p>
                  </div>
                </div>

                <Separator className="my-6 bg-[#C5A572]/30" />

                <TabsList className="flex flex-col w-full space-y-2">
                  <TabsTrigger
                    value="profile"
                    className="w-full justify-start gap-2 p-2.5 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#D4AF37]/10 data-[state=active]:bg-[#D4AF37]/20 data-[state=active]:text-[#2C1810]"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="w-full justify-start gap-2 p-2.5 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#D4AF37]/10 data-[state=active]:bg-[#D4AF37]/20 data-[state=active]:text-[#2C1810]"
                  >
                    <Package className="h-4 w-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="addresses"
                    className="w-full justify-start gap-2 p-2.5 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#D4AF37]/10 data-[state=active]:bg-[#D4AF37]/20 data-[state=active]:text-[#2C1810]"
                  >
                    <MapPin className="h-4 w-4" />
                    Addresses
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="w-full justify-start gap-2 p-2.5 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#D4AF37]/10 data-[state=active]:bg-[#D4AF37]/20 data-[state=active]:text-[#2C1810]"
                  >
                    <CreditCard className="h-4 w-4" />
                    Payment
                  </TabsTrigger>
                </TabsList>

                <Separator className="my-6 bg-[#C5A572]/30" />

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-[#5C4033] hover:text-[#2C1810] hover:bg-[#D4AF37]/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              <TabsContent value="profile">
                <Card className="border-2 border-[#C5A572]/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#2C1810]">
                          Profile Information
                        </CardTitle>
                        <CardDescription className="text-[#5C4033]">
                          Manage your personal details
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10"
                      >
                        {isEditingProfile ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label className="text-[#5C4033]">Full Name</Label>
                        <Input
                          value={user.name}
                          disabled={!isEditingProfile}
                          className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#5C4033]">Email</Label>
                        <Input
                          value={user.email}
                          disabled={!isEditingProfile}
                          className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#5C4033]">Phone</Label>
                        <Input
                          value={user.phone}
                          disabled={!isEditingProfile}
                          className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="border-2 border-[#C5A572]/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-[#2C1810]">
                      My Orders
                    </CardTitle>
                    <CardDescription className="text-[#5C4033]">
                      View and track your orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-start space-x-4 p-4 border-2 border-[#C5A572]/20 rounded-lg"
                        >
                          <img
                            src={order.image}
                            alt={order.name}
                            className="h-24 w-24 rounded-md object-cover"
                          />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-medium text-[#2C1810]">
                              {order.name}
                            </h4>
                            <p className="text-sm text-[#5C4033]">
                              Order ID: {order.id}
                            </p>
                            <p className="text-sm text-[#5C4033]">
                              Quantity: {order.quantity}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-[#2C1810]">
                                {order.price}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'Processing'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card className="border-2 border-[#C5A572]/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-serif text-[#2C1810]">
                          My Addresses
                        </CardTitle>
                        <CardDescription className="text-[#5C4033]">
                          Manage your delivery addresses
                        </CardDescription>
                      </div>
                      <Button
                        onClick={() => setShowAddressForm(true)}
                        className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showAddressForm ? (
                      <form onSubmit={handleAddressSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <Label className="text-[#5C4033]">Full Name</Label>
                            <Input
                              required
                              value={currentAddress.name}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  name: e.target.value,
                                })
                              }
                              className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#5C4033]">Phone</Label>
                            <Input
                              required
                              value={currentAddress.phone}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  phone: e.target.value,
                                })
                              }
                              className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#5C4033]">Address</Label>
                          <Textarea
                            required
                            value={currentAddress.line1}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                line1: e.target.value,
                              })
                            }
                            className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                          />
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                          <div>
                            <Label className="text-[#5C4033]">City</Label>
                            <Input
                              required
                              value={currentAddress.city}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  city: e.target.value,
                                })
                              }
                              className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#5C4033]">State</Label>
                            <Input
                              required
                              value={currentAddress.state}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  state: e.target.value,
                                })
                              }
                              className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <Label className="text-[#5C4033]">PIN Code</Label>
                            <Input
                              required
                              value={currentAddress.pincode}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  pincode: e.target.value,
                                })
                              }
                              className="mt-2 border-[#C5A572] focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowAddressForm(false);
                              setEditingAddressId(null);
                            }}
                            className="border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                          >
                            {editingAddressId ? 'Update' : 'Save'} Address
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className="p-4 border-2 border-[#C5A572]/20 rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-[#2C1810]">
                                    {address.name}
                                  </h4>
                                  {address.isDefault && (
                                    <span className="px-2 py-0.5 text-xs bg-[#D4AF37]/20 text-[#2C1810] rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1 text-sm text-[#5C4033]">
                                  {address.line1}
                                </p>
                                <p className="text-sm text-[#5C4033]">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="mt-2 text-sm text-[#5C4033]">
                                  Phone: {address.phone}
                                </p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[#5C4033] hover:text-[#2C1810]"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleAddressEdit(address)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  {!address.isDefault && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleSetDefaultAddress(address.id)
                                      }
                                    >
                                      <Home className="mr-2 h-4 w-4" />
                                      Set as Default
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onSelect={(e: { preventDefault: () => any; }) => e.preventDefault()}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Delete Address?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete this address?
                                          This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleAddressDelete(address.id)
                                          }
                                          className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="border-2 border-[#C5A572]/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-[#2C1810]">
                      Payment Methods
                    </CardTitle>
                    <CardDescription className="text-[#5C4033]">
                      Manage your payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-[#5C4033]">
                        No saved payment methods yet.
                      </p>
                      <Button
                        className="mt-4 bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
