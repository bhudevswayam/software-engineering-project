import { useState } from 'react';
import { TicketForm } from './components/TicketForm';
import { TicketsList } from './components/TicketsList';
import SupportHero from './components/SupportHero';
import SupportStats from './components/SupportStats';
import SectionCard from './components/SectionCard';

export default function App() {
  const [tickets, setTickets] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Login Issue',
      description: 'Unable to login to my account after password reset',
      priority: 'high',
      category: 'Tech Support',
      status: 'open',
      createdAt: new Date('2025-11-10T10:30:00'),
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      subject: 'Billing Question',
      description: 'Question about recent invoice charges',
      priority: 'medium',
      category: 'Accounting & Finance',
      status: 'in-progress',
      createdAt: new Date('2025-11-09T14:20:00'),
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      subject: 'Feature Request',
      description: 'Would love to see dark mode support',
      priority: 'low',
      category: 'Tech Support',
      status: 'open',
      createdAt: new Date('2025-11-08T09:15:00'),
    },
  ]);

  const [activeTab, setActiveTab] = useState('create');

  const handleCreateTicket = (ticket) => {
    const newTicket = {
      ...ticket,
      id: Date.now().toString(),
      status: 'open',
      createdAt: new Date(),
    };
    setTickets(prev => [newTicket, ...prev]);
    setActiveTab('view');
  };

  const handleUpdateTicketStatus = (ticketId, status) => {
    setTickets(prev => prev.map(t => (t.id === ticketId ? { ...t, status } : t)));
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* hero header */}
        <div className="mb-8">
          <SupportHero />
        </div>

        {/* kpi cards */}
        <div className="mb-10">
          <SupportStats tickets={tickets} />
        </div>

        {/* content */}
        <SectionCard
          title="Tickets"
          extra={
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3 py-1.5 rounded-lg border ${
                  activeTab === 'create'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                }`}
              >
                Submit New
              </button>
              <button
                onClick={() => setActiveTab('view')}
                className={`px-3 py-1.5 rounded-lg border ${
                  activeTab === 'view'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                }`}
              >
                My Tickets {tickets.length ? `(${tickets.length})` : ''}
              </button>
            </div>
          }
        >
          {activeTab === 'create' ? (
            <div className="max-w-3xl">
              <TicketForm onSubmit={handleCreateTicket} />
            </div>
          ) : (
            <TicketsList
              tickets={tickets}
              onUpdateStatus={handleUpdateTicketStatus}
            />
          )}
        </SectionCard>
      </main>
    </div>
  );
}
