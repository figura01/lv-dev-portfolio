"use client";

const AdminHeader = () => {
  return (
    <header className="shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold ">Tableau de bord</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
