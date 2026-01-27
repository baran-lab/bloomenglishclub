import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, BarChart2, Settings, Trash2, RefreshCw, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings'>('users');

  // Mock data for demo
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', progress: 45, lastActive: '2 hours ago' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', progress: 78, lastActive: '1 day ago' },
    { id: '3', name: 'Ahmed Hassan', email: 'ahmed@example.com', progress: 92, lastActive: '5 min ago' },
    { id: '4', name: 'Maria Garcia', email: 'maria@example.com', progress: 23, lastActive: '3 days ago' },
  ];

  const handleResetProgress = (userId: string) => {
    toast({
      title: 'Progress Reset',
      description: `User progress has been reset.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Export Started',
      description: 'Data export has been initiated.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-fredoka text-lg font-bold text-primary">Admin Facility</h1>
              <p className="text-xs text-muted-foreground">Manage users and content</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'users' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Users</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'content' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm font-medium">Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-fredoka text-xl font-bold">User Management</h2>
              <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Progress</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-t border-border">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${user.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                        <td className="p-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResetProgress(user.id)}
                            className="gap-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Reset
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="font-fredoka text-xl font-bold">Analytics Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-2xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-2xl font-bold text-green-600">42</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-2xl font-bold text-amber-600">67%</p>
                <p className="text-sm text-muted-foreground">Avg. Completion</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-2xl font-bold text-blue-600">4.2</p>
                <p className="text-sm text-muted-foreground">Avg. Sessions/User</p>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Module Completion Rates</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Module 1: Introduce Yourself</span>
                    <span className="text-muted-foreground">78%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Module 2: Names and Dates</span>
                    <span className="text-muted-foreground">45%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="font-fredoka text-xl font-bold">Settings</h2>
            
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Clear All User Data</p>
                  <p className="text-sm text-muted-foreground">Reset all user progress and accounts</p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" /> Clear
                </Button>
              </div>
              
              <div className="border-t border-border pt-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">Import Content</p>
                  <p className="text-sm text-muted-foreground">Upload new lessons or vocabulary</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" /> Import
                </Button>
              </div>
              
              <div className="border-t border-border pt-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">Export All Data</p>
                  <p className="text-sm text-muted-foreground">Download complete backup</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                  <Download className="w-4 h-4" /> Export
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Admin;
