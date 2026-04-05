import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, BarChart2, Settings, Trash2, RefreshCw, Download, Upload, KeyRound, Copy, CheckCircle, XCircle, Clock, Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AccessCode {
  id: string;
  code: string;
  is_used: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
  expires_at: string | null;
}

interface BetaRequest {
  id: string;
  name: string;
  email: string;
  access_code_id: string | null;
  status: string;
  created_at: string;
}

interface LoginSession {
  id: string;
  user_id: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const generateCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'BLOOM-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'codes' | 'requests' | 'security' | 'settings'>('codes');
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [requests, setRequests] = useState<BetaRequest[]>([]);
  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [codeCount, setCodeCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchCodes();
      fetchRequests();
      fetchSessions();
    }
  }, [isAdmin]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/login'); return; }
    const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!data) { navigate('/'); toast({ title: 'Access denied', variant: 'destructive' }); return; }
    setIsAdmin(true);
  };

  const fetchCodes = async () => {
    const { data } = await supabase.from('access_codes').select('*').order('created_at', { ascending: false });
    if (data) setCodes(data);
  };

  const fetchRequests = async () => {
    const { data } = await supabase.from('beta_requests').select('*').order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  const fetchSessions = async () => {
    const { data } = await supabase.from('login_sessions').select('*').order('created_at', { ascending: false }).limit(100);
    if (data) setSessions(data);
  };

  const handleGenerateCodes = async () => {
    setIsGenerating(true);
    const newCodes = Array.from({ length: codeCount }, () => ({ code: generateCode() }));
    const { error } = await supabase.from('access_codes').insert(newCodes);
    if (error) {
      toast({ title: 'Error generating codes', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `${codeCount} codes generated! ✅` });
      fetchCodes();
    }
    setIsGenerating(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: 'Code copied! 📋' });
  };

  const handleDeleteCode = async (id: string) => {
    await supabase.from('access_codes').delete().eq('id', id);
    fetchCodes();
    toast({ title: 'Code deleted' });
  };

  const handleExportCodes = () => {
    const unused = codes.filter(c => !c.is_used);
    const csv = 'Code,Created At\n' + unused.map(c => `${c.code},${c.created_at}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'access-codes.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  const usedCount = codes.filter(c => c.is_used).length;
  const unusedCount = codes.filter(c => !c.is_used).length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-fredoka text-lg font-bold text-primary">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Beta Management System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-primary">{codes.length}</p>
            <p className="text-sm text-muted-foreground">Total Codes</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-green-600">{usedCount}</p>
            <p className="text-sm text-muted-foreground">Used</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-amber-600">{unusedCount}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-blue-600">{pendingRequests}</p>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl overflow-x-auto">
          {[
            { key: 'codes', icon: KeyRound, label: 'Access Codes' },
            { key: 'requests', icon: Users, label: 'Requests' },
            { key: 'security', icon: Shield, label: 'Security' },
            { key: 'users', icon: BarChart2, label: 'Analytics' },
            { key: 'settings', icon: Settings, label: 'Settings' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.key ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}>
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Access Codes Tab */}
        {activeTab === 'codes' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <h2 className="font-fredoka text-xl font-bold">Access Codes</h2>
              <div className="flex gap-2 items-center">
                <Input type="number" min={1} max={100} value={codeCount}
                  onChange={(e) => setCodeCount(Number(e.target.value))}
                  className="w-20 h-9" />
                <Button size="sm" onClick={handleGenerateCodes} disabled={isGenerating} className="gap-2">
                  <Plus className="w-4 h-4" /> Generate
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCodes} className="gap-2">
                  <Download className="w-4 h-4" /> Export
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Code</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Used By</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Created</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.map((code) => (
                      <tr key={code.id} className="border-t border-border">
                        <td className="p-3">
                          <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{code.code}</code>
                        </td>
                        <td className="p-3">
                          {code.is_used ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Used
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Available
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">
                          {code.used_by ? code.used_by.slice(0, 8) + '...' : '—'}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">
                          {new Date(code.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => handleCopyCode(code.code)}>
                              <Copy className="w-3 h-3" />
                            </Button>
                            {!code.is_used && (
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteCode(code.id)} className="text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {codes.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <KeyRound className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No access codes yet. Generate some above!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="font-fredoka text-xl font-bold">Beta Requests</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-t border-border">
                        <td className="p-3 font-medium">{req.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{req.email}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                            req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            req.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {req.status === 'pending' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">
                          {new Date(req.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {requests.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No beta requests yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="font-fredoka text-xl font-bold">Login Activity</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">IP Address</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Device</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => (
                      <tr key={session.id} className="border-t border-border">
                        <td className="p-3 font-mono text-sm">{session.user_id.slice(0, 8)}...</td>
                        <td className="p-3 text-sm">{session.ip_address || 'N/A'}</td>
                        <td className="p-3 text-sm text-muted-foreground hidden md:table-cell truncate max-w-[200px]">
                          {session.user_agent?.slice(0, 50) || 'N/A'}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(session.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {sessions.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No login sessions recorded yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="font-fredoka text-xl font-bold">Analytics Overview</h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Module Completion Rates</h3>
              <div className="space-y-4">
                {['Module 1: Introduce Yourself', 'Module 2: Names and Dates'].map((mod, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{mod}</span>
                      <span className="text-muted-foreground">{i === 0 ? '78%' : '45%'}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: i === 0 ? '78%' : '45%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="font-fredoka text-xl font-bold">Settings</h2>
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Clear All User Data</p>
                  <p className="text-sm text-muted-foreground">Reset all user progress and accounts</p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2"><Trash2 className="w-4 h-4" /> Clear</Button>
              </div>
              <div className="border-t border-border pt-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">Export All Data</p>
                  <p className="text-sm text-muted-foreground">Download complete backup</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Admin;
