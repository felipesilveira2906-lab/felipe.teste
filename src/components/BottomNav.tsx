import React from "react";
import { TabId } from "./Header";

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; icon: string }[] = [
  { id: "inicio", label: "Início", icon: "dashboard" },
  { id: "rotas", label: "Rotas", icon: "navigation" },
  { id: "garagem", label: "Garagem", icon: "garage_home" },
  { id: "financas", label: "Finanças", icon: "account_balance_wallet" },
  { id: "servicos", label: "Serviços", icon: "local_gas_station" },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-around h-20 px-space-xs">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 transition-all cursor-pointer ${
                isActive
                  ? "text-primary font-title-md"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
