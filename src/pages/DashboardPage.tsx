// src/pages/DashboardPage.tsx
import React, { useState, createContext, useContext } from "react";
import { Camera, Edit, Lock, MapPin, Package, Trash2, User } from "lucide-react";

// Minimal local UI primitives to avoid depending on "@/components"
type PropsWithChildren<P = {}> = P & { children?: React.ReactNode; className?: string };

// Button
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; variant?: string }) {
  const { children, className = "", ...rest } = props;
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

// Input
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input {...rest} className={className} />;
}

// Card primitives
export function Card({ children, className = "" }: PropsWithChildren) {
  return <div className={className}>{children}</div>;
}
export function CardHeader({ children, className = "" }: PropsWithChildren) {
  return <div className={className}>{children}</div>;
}
export function CardContent({ children, className = "" }: PropsWithChildren) {
  return <div className={className}>{children}</div>;
}
export function CardTitle({ children, className = "" }: PropsWithChildren) {
  return <div className={className}>{children}</div>;
}

// Simple Tabs implementation using context
const TabsContext = createContext<{ value: string; setValue: (v: string) => void } | undefined>(undefined);

export function Tabs({ children, defaultValue = "", className = "" }: PropsWithChildren<{ defaultValue?: string; className?: string }>) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: PropsWithChildren) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, value }: PropsWithChildren<{ value: string }>) {
  const ctx = useContext(TabsContext);
  if (!ctx) return <button>{children}</button>;
  const active = ctx.value === value;
  return (
    <button onClick={() => ctx.setValue(value)} aria-pressed={active}>
      {children}
    </button>
  );
}

export function TabsContent({ children, value }: PropsWithChildren<{ value: string }>) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  return ctx.value === value ? <div>{children}</div> : null;
}

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+91 98765 43210",
    address: "123 Green Street, Bangalore, India",
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#F5E6D3] to-[#FFF8E7] py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-[#D4AF37]/30">
        <Tabs defaultValue="profile" className="p-6">
          <TabsList className="flex justify-center bg-[#FFF8E7] rounded-xl mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Card */}
              <Card className="w-full md:w-1/3 border-[#D4AF37]/30">
                <CardHeader>
                  <CardTitle className="text-[#2C1810]">Profile Info</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-[#D4AF37]"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-2 right-2 bg-[#D4AF37] hover:bg-[#C5A572]"
                    >
                      <Camera className="w-4 h-4 text-[#2C1810]" />
                    </Button>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#2C1810]">
                    {user.name}
                  </h3>
                  <p className="text-sm text-[#5C4033]">{user.email}</p>
                </CardContent>
              </Card>

              {/* Editable Info */}
              <Card className="w-full md:w-2/3 border-[#D4AF37]/30">
                <CardHeader>
                  <CardTitle className="text-[#2C1810]">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <LabelWithIcon icon={<User />} label="Full Name" />
                    <Input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="border-[#C5A572]"
                    />
                  </div>
                  <div>
                    <LabelWithIcon icon={<Lock />} label="Email" />
                    <Input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="border-[#C5A572]"
                    />
                  </div>
                  <div>
                    <LabelWithIcon icon={<MapPin />} label="Address" />
                    <Input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="border-[#C5A572]"
                    />
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <Card className="border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#2C1810] flex items-center gap-2">
                  <Package className="w-5 h-5" /> My Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrderItem
                  name="Cube Jaggery - Premium"
                  price="₹598"
                  date="Oct 12, 2025"
                  status="Delivered"
                />
                <OrderItem
                  name="Liquid Jaggery - Pure"
                  price="₹349"
                  date="Oct 18, 2025"
                  status="In Transit"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings">
            <Card className="border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#2C1810]">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-[#D4AF37] text-[#2C1810]">
                  Change Password
                </Button>
                <Button
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LabelWithIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <label className="flex items-center gap-2 mb-1 text-[#5C4033] text-sm">
      {icon}
      <span>{label}</span>
    </label>
  );
}

function OrderItem({
  name,
  price,
  date,
  status,
}: {
  name: string;
  price: string;
  date: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EBD8B3] py-3">
      <div>
        <h4 className="font-medium text-[#2C1810]">{name}</h4>
        <p className="text-sm text-[#5C4033]">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-[#D4AF37]">{price}</p>
        <p
          className={`text-sm ${
            status === "Delivered" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
