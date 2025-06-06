
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Monitor, FileText, Settings, Shield } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import TeacherDashboard from '@/components/TeacherDashboard';
import LectureTimeManager from '@/components/LectureTimeManager';
import PostCreator from '@/components/PostCreator';
import { toast } from '@/hooks/use-toast';

const TeacherView = () => {
  const [teacher, setTeacher] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('monitoring');
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = localStorage.getItem('currentTeacher');
    if (!teacherData) {
      navigate('/');
      return;
    }
    setTeacher(JSON.parse(teacherData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentTeacher');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate('/');
  };

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: "Student Monitoring",
      value: "monitoring",
      icon: Monitor,
    },
    {
      title: "Announcements",
      value: "posts",
      icon: FileText,
    },
    {
      title: "Session Settings",
      value: "settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Instructor Dashboard
                </h1>
                <p className="text-sm text-gray-500">Welcome, {teacher.username}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activeTab === item.value}
                    onClick={() => setActiveTab(item.value)}
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full justify-start gap-3 hover:bg-gray-100 text-gray-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </Sidebar>

        <SidebarInset className="flex-1">
          <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {menuItems.find(item => item.value === activeTab)?.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-8">
            {activeTab === 'monitoring' && <TeacherDashboard />}
            {activeTab === 'posts' && <PostCreator />}
            {activeTab === 'settings' && <LectureTimeManager />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TeacherView;
