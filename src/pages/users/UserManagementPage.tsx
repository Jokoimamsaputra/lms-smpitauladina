import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Upload,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { User, UserRole } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common/Breadcrumb';

export const UserManagementPage: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('siswa');
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [className, setClassName] = useState('IX JavaScript');
  const [subjectSpecialization, setSubjectSpecialization] = useState('');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.identifierNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenAddModal = () => {
    setName('');
    setEmail('');
    setRole('siswa');
    setIdentifierNumber('NISN 008' + Math.floor(1000000 + Math.random() * 9000000));
    setClassName('IX JavaScript');
    setSubjectSpecialization('');
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addUser({
      name,
      email,
      role,
      identifierNumber,
      className: role === 'siswa' ? className : undefined,
      subjectSpecialization: role === 'guru' ? subjectSpecialization : undefined,
      status: 'active',
      phoneNumber: '0812-' + Math.floor(1000 + Math.random() * 9000) + '-0000',
    });

    setIsAddModalOpen(false);
    triggerToast(`Pengguna baru ${name} berhasil ditambahkan ke sistem.`);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setIdentifierNumber(user.identifierNumber);
    setClassName(user.className || 'IX JavaScript');
    setSubjectSpecialization(user.subjectSpecialization || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    updateUser(selectedUser.id, {
      name,
      email,
      role,
      identifierNumber,
      className: role === 'siswa' ? className : undefined,
      subjectSpecialization: role === 'guru' ? subjectSpecialization : undefined,
    });

    setIsEditModalOpen(false);
    triggerToast(`Data pengguna ${name} berhasil diperbarui.`);
  };

  const handleDelete = (id: string, userName: string) => {
    if (window.confirm(`Hapus pengguna ${userName} dari data demo?`)) {
      deleteUser(id);
      triggerToast(`Pengguna ${userName} telah dihapus.`);
    }
  };

  const handleSimulatedImport = () => {
    // Add two simulated users
    addUser({
      name: 'Rian Hidayat (Import)',
      email: 'rian.hidayat@auladina.sch.id',
      role: 'siswa',
      identifierNumber: 'NISN 0089991122',
      className: 'IX JavaScript',
      status: 'active',
    });
    addUser({
      name: 'Dr. Maria Ulfah, M.Sc. (Import)',
      email: 'maria.ulfah@auladina.sch.id',
      role: 'guru',
      identifierNumber: 'NIP 198503112009022008',
      subjectSpecialization: 'Biologi',
      status: 'active',
    });
    setIsImportModalOpen(false);
    triggerToast('Simulasi impor berkas CSV berhasil: 2 akun baru ditambahkan.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B50] text-white px-4 py-3 rounded-xl shadow-modal flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Manajemen Pengguna' },
        ]}
      />

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Manajemen Pengguna Sekolah
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola akun tenaga pendidik, peserta didik, orang tua, dan administrator.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Import Data File
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Tambah Pengguna Baru
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, NIP/NISN, atau email..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142B50] bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Semua Role' },
            { id: 'guru', label: 'Guru' },
            { id: 'siswa', label: 'Siswa' },
            { id: 'admin', label: 'Admin' },
            { id: 'kepala', label: 'Kepala Sekolah' },
            { id: 'orangtua', label: 'Orang Tua' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                roleFilter === tab.id
                  ? 'bg-[#142B50] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Nama Lengkap</th>
                <th className="py-3.5 px-4">Identitas (NIP / NISN)</th>
                <th className="py-3.5 px-4">Role Akun</th>
                <th className="py-3.5 px-4">Unit / Kelas</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Tidak ditemukan data pengguna yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EAF0F8] text-[#142B50] font-bold flex items-center justify-center shrink-0 uppercase text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-[11px] text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {user.identifierNumber}
                    </td>
                    <td className="py-3.5 px-4 capitalize">
                      <Badge
                        variant={
                          user.role === 'admin'
                            ? 'danger'
                            : user.role === 'guru'
                            ? 'primary'
                            : user.role === 'siswa'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {user.role === 'siswa'
                        ? user.className || 'IX JavaScript'
                        : user.role === 'guru'
                        ? user.subjectSpecialization || 'Pendidik'
                        : 'Administrasi'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Aktif
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 text-slate-500 hover:text-[#142B50] hover:bg-slate-100 rounded cursor-pointer"
                          title="Edit Pengguna"
                          aria-label={`Edit ${user.name}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id, user.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="Hapus Pengguna"
                          aria-label={`Hapus ${user.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredUsers.length} pengguna</span>
          <span>Halaman 1 dari 1 (Data Demo Lokal)</span>
        </div>
      </div>

      {/* Modal Tambah Pengguna */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Pengguna Baru"
        description="Lengkapi identitas guru, siswa, atau staf sekolah."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Beserta Gelar
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhammad Farhan, S.Kom."
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@auladina.sch.id"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role Pengguna
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none bg-white"
              >
                <option value="siswa">Siswa</option>
                <option value="guru">Guru</option>
                <option value="admin">Admin Sekolah</option>
                <option value="kepala">Kepala Sekolah</option>
                <option value="orangtua">Orang Tua</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Induk (NIP / NISN)
              </label>
              <input
                type="text"
                value={identifierNumber}
                onChange={(e) => setIdentifierNumber(e.target.value)}
                placeholder="NIP / NISN..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none font-mono"
              />
            </div>

            {role === 'siswa' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rombongan Belajar (Kelas)
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="IX JavaScript"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
                />
              </div>
            )}

            {role === 'guru' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mata Pelajaran yang Diampu
                </label>
                <input
                  type="text"
                  value={subjectSpecialization}
                  onChange={(e) => setSubjectSpecialization(e.target.value)}
                  placeholder="Contoh: Kimia, Fisika"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Simpan Pengguna
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Pengguna */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profil Pengguna"
        description="Perbarui informasi pengguna yang dipilih."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Induk
              </label>
              <input
                type="text"
                value={identifierNumber}
                onChange={(e) => setIdentifierNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#142B50] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Perbarui Data
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Import Data Simulasi */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Impor Pengguna dari File (Simulasi)"
        description="Unggah berkas spreadsheet CSV atau Excel untuk menambahkan data massal."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center flex flex-col items-center justify-center">
            <FileSpreadsheet className="w-10 h-10 text-emerald-600 mb-2" />
            <p className="text-xs font-semibold text-slate-800">
              Template_Import_Siswa_Guru.xlsx
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Format kolom: Nama, Email, NIP_NISN, Role, Kelas
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Dalam mode prototype demo, Anda dapat mengklik tombol di bawah untuk menyimulasikan parsing berkas spreadsheet dan menambahkan 2 akun sampel secara instan.
          </p>

          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsImportModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSimulatedImport}
            >
              Jalankan Simulasi Impor
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
