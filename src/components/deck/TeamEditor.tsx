import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Edit3, Check, RotateCcw } from 'lucide-react';
import { TeamMember } from '../../types';

// The 7 team members from the official InnovEgypt list (first two names in English)
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Mahmoud Abdelhameed',
    role: 'Team Leader & Product Lead',
    track: 'Product Strategy & IoT Integration',
    contribution: 'Customer discovery, sensor architecture, and business model design.',
    initials: 'MA',
  },
  {
    id: '2',
    name: 'Abdullah Saad',
    role: 'Hardware & Embedded Engineer',
    track: 'Embedded Circuitry & Sensors',
    contribution: 'Load cell strain-gauge weight sensor calibration and power management.',
    initials: 'AS',
  },
  {
    id: '3',
    name: 'Ahmed Hamdy',
    role: 'Firmware & IoT Developer',
    track: 'Microcontrollers & BLE',
    contribution: 'Bluetooth Low Energy telemetry, auto-tare calibration, and cup sync logic.',
    initials: 'AH',
  },
  {
    id: '4',
    name: 'Ahmed Mohamed',
    role: 'Software & Mobile Developer',
    track: 'Mobile App Architecture',
    contribution: 'Companion app interface, hydration tracking algorithms, and virtual garden.',
    initials: 'AM',
  },
  {
    id: '5',
    name: 'Amira Elsayed',
    role: 'UX/UI & Ergonomic Designer',
    track: 'User Experience & Ergonomics',
    contribution: 'Product visual identity, mobile design system, and silent LED light design.',
    initials: 'AE',
  },
  {
    id: '6',
    name: 'Salma Ahmed',
    role: 'Health Research & Validation',
    track: 'Medical Data & Clinical Liaison',
    contribution: 'Field research with Dr. Hala, hydration curves, and 3-tier risk profiles.',
    initials: 'SA',
  },
  {
    id: '7',
    name: 'Abdullah Abdelaziz',
    role: 'Business & Market Operations',
    track: 'Go-To-Market & Partnerships',
    contribution: 'Customer discovery interviews in Dakahlia, university pilots, and B2B outreach.',
    initials: 'AA',
  },
];

export const TeamEditor: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const stored = localStorage.getItem('ratab_team_members_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_TEAM;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TeamMember>>({});

  useEffect(() => {
    try {
      localStorage.setItem('ratab_team_members_v2', JSON.stringify(team));
    } catch {
      // ignore
    }
  }, [team]);

  const handleStartEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    setTeam(prev =>
      prev.map(m => {
        if (m.id === editingId) {
          const names = (editForm.name || 'Member').trim().split(' ');
          const initials = names.length > 1
            ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
            : names[0].slice(0, 2).toUpperCase();
          return {
            ...m,
            ...editForm,
            initials,
          } as TeamMember;
        }
        return m;
      })
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleAddMember = () => {
    const newId = Date.now().toString();
    const newMember: TeamMember = {
      id: newId,
      name: 'New Member',
      role: 'Innovation Specialist',
      track: 'Product & Field Testing',
      contribution: 'Contributing to product testing and customer feedback cycles.',
      initials: 'NM',
    };
    setTeam(prev => [...prev, newMember]);
    setEditingId(newId);
    setEditForm(newMember);
  };

  const handleDeleteMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleResetDefaults = () => {
    setTeam(INITIAL_TEAM);
    setEditingId(null);
    try {
      localStorage.setItem('ratab_team_members_v2', JSON.stringify(INITIAL_TEAM));
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Top action helper */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-sky-100">
        <div className="text-left">
          <p className="text-xs text-slate-600">
            Official Team SyntriX Roster for <strong className="text-sky-700">InnovEgypt / TIEC</strong> (7 Members). Click <strong className="text-sky-600">Edit</strong> on any card to update details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddMember}
            className="px-3 py-1.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Member
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-700 text-xs transition cursor-pointer border border-slate-200"
            title="Reset to official 7 members"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of 7 Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {team.map((member, index) => {
          const isEditing = editingId === member.id;
          return (
            <div
              key={member.id}
              className={`bg-white rounded-2xl p-5 border text-left flex flex-col justify-between transition-all duration-200 ${
                isEditing
                  ? 'border-sky-500 ring-2 ring-sky-400/30 shadow-lg'
                  : 'border-sky-100 shadow-xs hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {isEditing ? (
                /* Edit Form */
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400">First Two Names (English)</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400">Role</label>
                    <input
                      type="text"
                      value={editForm.role || ''}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full p-1.5 border border-slate-300 rounded-lg text-xs text-sky-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400">Track</label>
                    <input
                      type="text"
                      value={editForm.track || ''}
                      onChange={(e) => setEditForm({ ...editForm, track: e.target.value })}
                      className="w-full p-1.5 border border-slate-300 rounded-lg text-xs text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400">Contribution</label>
                    <textarea
                      rows={2}
                      value={editForm.contribution || ''}
                      onChange={(e) => setEditForm({ ...editForm, contribution: e.target.value })}
                      className="w-full p-1.5 border border-slate-300 rounded-lg text-[11px] text-slate-600"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-sky-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Save
                    </button>
                    {team.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Card Display Mode */
                <>
                  <div>
                    {/* Member Avatar */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-sky-800 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                        {member.initials}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(member)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 rounded-md hover:bg-sky-50 transition cursor-pointer"
                          title="Edit member details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Member Name */}
                    <h4 className="text-sm font-bold text-sky-950 leading-snug">
                      {member.name}
                    </h4>

                    {/* Role */}
                    <div className="text-xs font-semibold text-sky-600 mt-0.5 mb-1.5">
                      {member.role}
                    </div>

                    {/* Track */}
                    <div className="inline-block px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100/80 text-[10px] font-medium mb-2.5">
                      {member.track}
                    </div>

                    {/* Contribution */}
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      "{member.contribution}"
                    </p>
                  </div>

                  <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-medium text-slate-500">Team SyntriX</span>
                    <span className="text-sky-600 font-bold">InnovEgypt</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
